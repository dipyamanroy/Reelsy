import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const CreateVideoData = mutation({
    args: {
        title: v.string(),
        topic: v.string(),
        script: v.string(),
        artStyle: v.string(),
        caption: v.any(),
        voice: v.string(),
        uid: v.id('users'),
        createdBy: v.string()
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.insert('videoData', {
            title: args.title,
            topic: args.topic,
            script: args.script,
            artStyle: args.artStyle,
            caption: args.caption,
            voice: args.voice,
            uid: args.uid,
            createdBy: args.createdBy
        })
        return result;
    }
})

export const UpdateVideoRecord = mutation({
    args:{
        recordId: v.id('videoData'),
        audioUrl: v.string(),
        images: v.any(),
        captionJson: v.any()
    },
    handler: async(ctx, args) => {
        const result = await ctx.db.patch(args.recordId, {
            audioUrl: args.audioUrl,
            captionJson: args.captionJson,
            images: args.images
        });

        return result
    }
})