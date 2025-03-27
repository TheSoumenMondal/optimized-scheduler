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
            department: args.department as any,
            teaching_subjects: [],
            isAvailable: false,
            isVerified: false,
            institutionId: invitation.institutionId,
            status: "pending",
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
        return allFaculty;

    }

})

export const approveFaculty = mutation({
    args: {
        institutionId: v.id("institutions"),
        faculty_id: v.id("faculties"),
        status: v.union(v.literal("pending"),
            v.literal("approved"),
            v.literal("rejected")
        )
    },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.faculty_id, {
            status: args.status,
        });
        await ctx.db.patch(args.faculty_id, {
            institutionId: args.institutionId,
        })
        if (args.status === "approved") {
            await ctx.db.patch(args.faculty_id, {
                isVerified: true,
            });
        }
        const institution = await ctx.db.get(args.institutionId);

        const existingFaculties = institution!.faculties || [];
        await ctx.db.patch(args.institutionId, {
            faculties: [...existingFaculties, args.faculty_id]
        });
        return args.status
    }

})


export const removeFaculty = mutation({
    args: {
        faculty_id: v.id("faculties"),
    },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.faculty_id);
        const faculty = await ctx.db.get(args.faculty_id);
        if (!faculty?.institutionId) {
            throw new Error("Faculty or institution ID not found");
        }
        const institution = await ctx.db.get(faculty.institutionId);
        if (!institution?.faculties) {
            return
        }
        const updatedFaculties = institution.faculties.filter(
            (id) => id !== args.faculty_id
        );
        await ctx.db.patch(faculty.institutionId, {
            faculties: updatedFaculties,
        });
    }
})