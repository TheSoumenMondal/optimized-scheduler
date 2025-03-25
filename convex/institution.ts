import { v } from "convex/values";
import { mutation, query } from "./_generated/server";


// create an institute

export const createInstitution = mutation({
    args: {
        name: v.string(),
        admin_email: v.string(),
        courses_offered: v.optional(v.array(v.id("courses"))),
        total_rooms_available: v.number(),
        institution_timing: v.string(),
    },
    handler: async (ctx, args) => {
        try {
            // Capitalize the institution name
            const capitalizedName = args.name.toUpperCase();


            const existingInstitution = await ctx.db.query("institutions")
                .filter(q =>
                    q.and(
                        q.eq(q.field("admin_email"), args.admin_email),
                        q.eq(q.field("name"), capitalizedName)
                    )
                )
                .first();

            if (existingInstitution) {
                return
            }

            const newInstitute = await ctx.db.insert("institutions", {
                name: capitalizedName,
                admin_email: args.admin_email,
                courses_offered: args.courses_offered,
                total_rooms_available: args.total_rooms_available,
                institution_timing: args.institution_timing,
            })

            const admin = await ctx.db.query("admin")
                .filter(q => q.eq(q.field("email"), args.admin_email))
                .first();

            if (!admin) {
                throw new Error("Admin not found");
            }

            // Update admin's institutions array
            await ctx.db.patch(admin._id, {
                institutions: [...(admin.institutions || []), newInstitute]
            });
            return newInstitute;

        } catch (error) {
            if (error instanceof Error) {
                return error.message;
            }
            return "ERROR";
        }
    }
})

//get all institutes for the same admin

export const getAllInstitutes = query({
    args: {
        admin_email: v.string()
    },
    handler: async (ctx, args) => {
        try {
            const allInstitutes = await ctx.db.query("institutions")
                .filter(q => q.eq(q.field("admin_email"), args.admin_email))
                .collect();
            return allInstitutes;
        } catch (error) {
            return "ERROR";
        }
    }
})