import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const CreateNewUser = mutation({
    args: {
        name: v.string(),
        email: v.string(),
        photoURL: v.string(),
    },
    handler: async (ctx, args) => {
        // Check if user exists in db
        const user = await ctx.db.query('users')
        .filter((q)=>q.eq(q.field('email'), args.email))
        .collect();

        if(!user[0]?.email)
        {
            // User does not exist, create new
            const result = await ctx.db.insert('users', {
                name: args.name,
                email: args.email,
                photoURL: args.photoURL,
                credits: 10
            })

            return result
        }

        return user[0];
    }
})