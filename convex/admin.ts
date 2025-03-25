import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const createAdmin = mutation({
    args: {
        name: v.string(),
        email: v.string(),
        isAccepting_request: v.optional(v.boolean()),
        institutions: v.optional(v.array(v.id("institutions")))
    },
    handler: async (ctx, args) => {

        const existingAdmin = await ctx.db
            .query("admin")
            .filter((q) => q.eq(q.field("email"), args.email))
            .first();

        if (existingAdmin) {
            return
        }

        const admin = await ctx.db.insert("admin", {
            name: args.name,
            email: args.email,
            isAccepting_request: args.isAccepting_request,
            institutions: args.institutions
        });
        return admin;
    }
})