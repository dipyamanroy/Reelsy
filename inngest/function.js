import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { inngest } from "./client";
import { storage } from "@/configs/firebase";
import { OpenAI } from "openai";
import { createClient } from "@deepgram/sdk";
import Replicate from "replicate";
import axios from "axios";

const ImagePromptScript = `Generate a detailed image prompt for each scene from this 30-second video script, using a {style} style. Output JSON only.

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


export const helloWorld = inngest.createFunction(
    { id: "hello-world" },
    { event: "test/hello.world" },
    async ({ event, step }) => {
        await step.sleep("wait-a-moment", "1s");
        return { message: `Hello ${event.data.email}!` };
    },
);

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
        const {
            script,
            topic,
            title,
            caption,
            artStyle,
            voice,
        } = event?.data;

        // Generate audio file MP3
        const GenerateAudioFile = await step.run(
            "generateAudioFile",
            async () => {
                // if (!script) {
                //     throw new Error("Script text is required for TTS.");
                // }

                // const storagePath = `Reelsy-data/audio/tts-${Date.now()}.mp3`;
                // const storageRef = ref(storage, storagePath);

                // const speechStream = await openai.audio.speech.create({
                //     model: "gpt-4o-mini-tts",
                //     voice: voice,
                //     input: script,
                //     response_format: "mp3",
                // });

                // const buffer = Buffer.from(await speechStream.arrayBuffer());

                // await uploadBytes(storageRef, buffer, {
                //     contentType: "audio/mp3",
                // });

                // const downloadUrl = await getDownloadURL(storageRef);
                // return downloadUrl;
                return "https://firebasestorage.googleapis.com/v0/b/fifth-bridge.firebasestorage.app/o/Reelsy-data%2Faudio%2Ftts-1745041983203.mp3?alt=media&token=a2eec23a-5e7c-4847-93c0-35caccf6470b"
            }
        );

        // Generate Captions
        // const GenerateCaptions = await step.run(
        //     "generateCaptions",
        //     async () => {
        //         const deepgram = createClient(process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY);

        //         const { result, error } = await deepgram.listen.prerecorded.transcribeUrl(
        //             {
        //                 url: GenerateAudioFile,
        //             },
        //             {
        //                 model: "nova-3",
        //             }
        //         );
        //         return result.results?.channels[0]?.alternatives[0]?.words;
        //     }
        // )

        // Generate Image prompt
        const GenerateImagePrompts = await step.run(
            "generateImagePrompts",
            async () => {
                const imagePrompt = ImagePromptScript
                    .replace("{style}", artStyle)
                    .replace("{script}", script);

                const completion = await openai.chat.completions.create({
                    model: "gpt-4o-mini",
                    messages: [
                        { role: "user", content: imagePrompt }
                    ],
                    temperature: 0.85,
                });

                const resp = JSON.parse(completion.choices[0]?.message?.content);

                return resp;
            }
        );

        // GenerateImages
        const GenerateImages = await step.run(
            "generateImages",
            async () => {
                const urls = await Promise.all(
                    GenerateImagePrompts.map(async ({ imagePrompt }) => {
                        const [output] = await replicate.run(
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

                        const resp = await axios.get(output, {
                            responseType: "arraybuffer",
                            timeout: 20000,
                        });

                        const fileName = `Reelsy-data/images/img-${Date.now()}-${Math.random()
                            .toString(36)
                            .substr(2, 5)}.png`;
                        const storageRef = ref(storage, fileName);
                        await uploadBytes(storageRef, resp.data, { contentType: "image/png" });

                        return getDownloadURL(storageRef);
                    })
                );

                return urls;
            }
        );

        return GenerateImages;
    }
);
