import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createInstitution = mutation({
    args: {
        name: v.string(),
        admin_email: v.string(),
        courses_offered: v.optional(v.array(v.id("courses"))),
        total_rooms_available: v.number(),
        institution_timing: v.string(),
    },
    handler: async (ctx, args) => {
        const institutionName = args.name;
        const existingInstitution = await ctx.db
            .query("institutions")
            .filter((q) =>
                q.and(
                    q.eq(q.field("admin_email"), args.admin_email),
                    q.eq(q.field("name"), institutionName)
                )
            )
            .first();

        if (existingInstitution) {
            throw new Error("An institution with this name and admin email already exists.");
        }

        const admin = await ctx.db
            .query("admin")
            .filter((q) => q.eq(q.field("email"), args.admin_email))
            .first();

        if (!admin) {
            throw new Error("Admin not found.");
        }

        const newInstituteId = await ctx.db.insert("institutions", {
            name: institutionName,
            admin_email: args.admin_email,
            courses_offered: args.courses_offered,
            total_rooms_available: args.total_rooms_available,
            institution_timing: args.institution_timing,
            faculties: [],
        });

        await ctx.db.patch(admin._id, {
            institutions: [...(admin.institutions || []), newInstituteId],
        });

        return newInstituteId;
    },
});

export const getAllInstitutes = query({
    args: {
        admin_email: v.string(),
    },
    handler: async (ctx, args) => {
        const allInstitutes = await ctx.db
            .query("institutions")
            .filter((q) => q.eq(q.field("admin_email"), args.admin_email))
            .collect();

        return allInstitutes;
    },
});


export const getSingleInstitutionDetails = query({
    args: {
        institution_id: v.id("institutions"),
    },
    handler: async (ctx, args) => {
        const institution = await ctx.db
            .query("institutions")
            .filter((q) => q.eq(q.field("_id"), args.institution_id))
            .first();

        if (!institution) {
            throw new Error("Institution not found.");
        }

        return institution;
    },
});