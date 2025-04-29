import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { inngest } from "./client";
import { storage } from "@/configs/firebase";
import { OpenAI } from "openai";
import { createClient } from "@deepgram/sdk";
import Replicate from "replicate";
import axios from "axios";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import { getServices, renderMediaOnCloudrun } from "@remotion/cloudrun/client";
import { RetryAfterError } from "inngest";

const ImagePromptScript = `Generate a detailed image prompt for each scene from this 20-second video script, using a {style} style. Output JSON only.

Rules:
1. Do NOT include camera angles.
2. Do NOT include scene numbers or commentary.
3. Return only valid JSON, no markdown or explanations.
4. Follow this schema:
[
  {
    "imagePrompt": "string - prompt describing the visual scene in {style}",
    "sceneContent": "string - dialogue or scene action from the script"
  }
]

Script:
{script}
`;

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
});

export const GenerateVideoData = inngest.createFunction(
    { id: "generate-video-data" },
    { event: "generate-video-data" },
    async ({ event, step }) => {
        const { recordId, script, topic, title, caption, artStyle, voice } = event.data;
        const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

        if (!recordId) {
            throw new Error("No recordId found in event data.");
        }

        const videoData = await step.run("fetchVideoData", async () => {
            return await convex.query(api.videoData.GetVideoById, { videoId: recordId });
        });

        if (!videoData) {
            throw new Error("Video data not found. Possibly still being created. Retry later.");
        }

        const GenerateAudioFile = await step.run("generateAudioFile", async () => {
            if (!script) throw new Error("Script is required to generate audio.");

            const storagePath = `Reelsy-data/audio/tts-${Date.now()}.mp3`;
            const storageRef = ref(storage, storagePath);

            const speechStream = await openai.audio.speech.create({
                model: "gpt-4o-mini-tts",
                voice,
                input: script,
                response_format: "mp3",
            });

            const buffer = Buffer.from(await speechStream.arrayBuffer());

            await uploadBytes(storageRef, buffer, {
                contentType: "audio/mp3",
            });

            return await getDownloadURL(storageRef);
        });

        const GenerateCaptions = await step.run("generateCaptions", async () => {
            const deepgram = createClient(process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY);

            const { result } = await deepgram.listen.prerecorded.transcribeUrl(
                { url: GenerateAudioFile },
                { model: "nova-3" }
            );

            return result?.results?.channels[0]?.alternatives[0]?.words || [];
        });

        const GenerateImagePrompts = await step.run("generateImagePrompts", async () => {
            const prompt = ImagePromptScript.replace("{style}", artStyle).replace("{script}", script);

            const completion = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [{ role: "user", content: prompt }],
                temperature: 0.85,
            });

            const responseContent = completion.choices[0]?.message?.content;
            if (!responseContent) throw new Error("OpenAI did not return image prompts.");

            return JSON.parse(responseContent);
        });

        const GenerateImages = await step.run("generateImages", async () => {
            const results = await Promise.all(
                GenerateImagePrompts.map(async ({ imagePrompt }, idx) => {
                    if (idx > 0) await new Promise((r) => setTimeout(r, 1000 * idx)); // Throttle slightly

                    try {
                        const [outputUrl] = await replicate.run(
                            "bytedance/sdxl-lightning-4step:6f7a773af6fc3e8de9d5a3c00be77c17308914bf67772726aff83496ba1e3bbe",
                            {
                                input: {
                                    prompt: imagePrompt,
                                    height: 1280,
                                    width: 1024,
                                    num_outputs: 1,
                                },
                            }
                        );

                        const resp = await axios.get(outputUrl, { responseType: "arraybuffer", timeout: 20000 });
                        const filename = `Reelsy-data/images/img-${Date.now()}-${Math.random().toString(36).substring(2, 7)}.png`;
                        const storageRef = ref(storage, filename);
                        await uploadBytes(storageRef, resp.data, { contentType: "image/png" });

                        return await getDownloadURL(storageRef);
                    } catch (error) {
                        if (error.response?.status === 429) {
                            const retryAfter = parseInt(error.response.headers["retry-after"] || "10", 10);
                            throw new RetryAfterError("Replicate rate limit exceeded", retryAfter);
                        }
                        throw error;
                    }
                })
            );

            return results;
        });

        const UpdateVideoRecordStep = await step.run("updateDbWithAssets", async () => {
            return await convex.mutation(api.videoData.UpdateVideoRecord, {
                recordId,
                audioUrl: GenerateAudioFile,
                captionJson: GenerateCaptions,
                images: GenerateImages,
            });
        });

        const RenderVideo = await step.run("renderVideo", async () => {
            const services = await getServices({
                region: "us-east1",
                compatibleOnly: true,
            });

            if (!services.length) throw new Error("No Remotion services available in Cloud Run.");

            const serviceName = services[0].serviceName;
            const serveUrl = process.env.GCP_SERVE_URL;

            const renderResult = await renderMediaOnCloudrun({
                serviceName,
                region: "us-east1",
                serveUrl,
                composition: "reelsy",
                inputProps: {
                    videoData: {
                        audioUrl: GenerateAudioFile,
                        captionJson: GenerateCaptions,
                        images: GenerateImages,
                        caption: caption
                    },
                },
                codec: "h264",
            });

            if (!renderResult?.publicUrl) {
                throw new Error("Render result missing public URL.");
            }

            console.log("Render completed. Public URL:", renderResult.publicUrl);

            return renderResult.publicUrl;
        });

        const FinalUpdateStep = await step.run("updateDbWithDownloadUrl", async () => {
            return await convex.mutation(api.videoData.UpdateVideoRecord, {
                recordId,
                downloadUrl: RenderVideo,
            });
        });

        return { success: true, downloadUrl: RenderVideo };
    }
);
