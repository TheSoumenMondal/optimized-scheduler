import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

const INVITATION_EXPIRY_DURATION = 60 * 24 * 60 * 60 * 1000;

export const createInvitation = mutation({
    args: {
        institution_id: v.id("institutions"),
    },
    handler: async (ctx, args) => {
        const token = `${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 15)}`;
        const createdAt = Date.now();
        const expiry = createdAt + INVITATION_EXPIRY_DURATION;

        const existingInvitation = await ctx.db
            .query("invitation")
            .filter((q) => q.eq(q.field("institutionId"), args.institution_id))
            .filter((q) => q.eq(q.field("status"), "active"))
            .first();

        if (existingInvitation) {
            await ctx.db.delete(existingInvitation._id);
        }

        const invitationId = await ctx.db.insert("invitation", {
            token,
            institutionId: args.institution_id,
            createdAt,
            expiry,
            status: "active",
        });
        return { token, invitationId };
    },
});

export const getInvitationForInstitute = query({
    args: {
        institution_id: v.id("institutions"),
    },
    handler: async (ctx, args) => {
        const invitation = await ctx.db
            .query("invitation")
            .filter((q) => q.eq(q.field("institutionId"), args.institution_id))
            .collect();
        if (!invitation) {
            return null;
        }
        return invitation;
    },
});



export const getToken = query({
    args: {
        institution_id: v.id("institutions")
    },
    handler: async (ctx, args) => {
        const token = ctx.db
            .query("invitation")
            .filter((q) => q.eq(q.field("institutionId"), args.institution_id)).unique()
        return token
    },
})