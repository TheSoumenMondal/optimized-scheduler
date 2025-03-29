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
        institution_id: v.optional(v.id("institutions")),
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


export const getInstitutionByToken = query({
    args: {
        token: v.string(),
    },
    handler: async (ctx, args) => {
        try {
            const invitation = await ctx.db
                .query("invitation")
                .filter((q) => q.eq(q.field("token"), args.token)).unique()

            if (!invitation) {
                return null;
            }

            return invitation
        } catch (error) {
            console.error("Error in getInstitutionByToken:", error);
            return null;
        }
    }
});


export const validateToken = query({
    args: {
        token: v.string(),
    },
    handler: async (ctx, args) => {
        try {
            const invitation = await ctx.db
                .query("invitation")
                .filter((q) => q.eq(q.field("token"), args.token))
                .unique();
            if (!invitation) {
                return 404;
            }
            if (invitation.expiry < Date.now()) {
                return 410;
            }
            if (invitation.status !== "active") {
                return 403;
            }
            return 202;
        } catch (error) {
            console.error("Error validating token:", error);
            return 500;
        }
    }
});
