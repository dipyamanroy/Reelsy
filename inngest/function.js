import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { inngest } from "./client";
import { storage } from "@/configs/firebase";
import { OpenAI } from "openai";

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

        const GenerateAudioFile = await step.run(
            "GenerateAudioFile",
            async () => {
                if (!script) {
                    throw new Error("Script text is required for TTS.");
                }

                const storagePath = `Reelsy-data/audio/tts-${Date.now()}.mp3`;
                const storageRef = ref(storage, storagePath);

                const speechStream = await openai.audio.speech.create({
                    model: "gpt-4o-mini-tts",
                    voice: voice,
                    input: script,
                    response_format: "mp3",
                });

                const buffer = Buffer.from(await speechStream.arrayBuffer());

                await uploadBytes(storageRef, buffer, {
                    contentType: "audio/mp3",
                });

                const downloadUrl = await getDownloadURL(storageRef);
                return downloadUrl;
            }
        );

        return GenerateAudioFile
        // Continue with captions, images, etc...
    }
);
