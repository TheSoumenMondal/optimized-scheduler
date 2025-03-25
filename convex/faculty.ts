import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createFaculty = mutation({
    args: {
        token: v.string(),
        name: v.string(),
        email: v.string(),
        department: v.string(),
    },
    handler: async (ctx, args) => {
        const invitation = await ctx.db
            .query("invitation")
            .filter((q) => q.eq(q.field("token"), args.token))
            .filter((q) => q.eq(q.field("status"), "active"))
            .filter((q) => q.gt(q.field("expiry"), Date.now()))
            .first();
        if (!invitation) {
            return 404
        }
        const existingFaculty = await ctx.db
            .query("faculties")
            .filter((q) => q.eq(q.field("institutionId"), invitation.institutionId))
            .filter((q) => q.eq(q.field("email"), args.email))
            .first();
        if (existingFaculty) {
            return 400
        }
        const facultyId = await ctx.db.insert("faculties", {
            name: args.name,
            email: args.email,
            department: args.department,
            teaching_subjects: [],        // Default to empty array
            isAvailable: false,           // Default, can be updated by admin
            isVerified: false,            // Default, can be updated by admin
            institutionId: invitation.institutionId, // Link to institution from invitation
            status: "pending",            // Awaiting admin approval
        });
        return facultyId;
    },
});

export const getAllFaculty = query({
    args: {
        institutionId: v.id("institutions"),
    },
    handler: async (ctx, args) => {
        const allFaculty = await ctx.db
            .query("faculties")
            .filter((q) => q.eq(q.field("institutionId"), args.institutionId))
            .collect();
        return allFaculty; // Returns empty array if none found

    }

})