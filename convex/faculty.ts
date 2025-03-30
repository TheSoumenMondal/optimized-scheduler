import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createFaculty = mutation({
    args: {
        name: v.string(),
        email: v.string(),
        teaching_subjects: v.optional(v.array(v.id('subjects'))),
        department: v.optional(v.id('departments')),
        isAvailable: v.boolean(),
        isVerified: v.boolean(),
        institutionId: v.optional(v.id('institutions')),
        status: v.union(v.literal('pending'), v.literal('approved'), v.literal('rejected')),
    },
    handler: async (ctx, args) => {
        const isExisting = await ctx.db.query("faculties").filter((q) => q.eq(q.field("email"), args.email)).first()
        if (isExisting) return 404;
        const faculty = await ctx.db.insert("faculties", args)
        return faculty
    }
})


export const getAllFaculties = query({
    args: {
        institutionId: v.optional(v.id("institutions"))
    },
    handler: async (ctx, args) => {
        const query = ctx.db.query("faculties");

        if (args.institutionId) {
            return await query
                .filter((q) => q.eq(q.field("institutionId"), args.institutionId))
                .collect();
        }

        return await query.collect();
    }
})


export const verifyFaculty = mutation({
    args: {
        faculty_id: v.optional(v.id("faculties")),
        status: v.union(v.literal('pending'), v.literal('approved'), v.literal('rejected'))
    },
    handler: async (ctx, args) => {
        const faculty = await ctx.db.get(args.faculty_id!)
        if (!faculty) return 404;
        if (args.status === "pending") {
            await ctx.db.patch(args.faculty_id!, {
                isVerified: false,
                status: "pending"
            })
            return {
                message: "Faculty pending",
                status: 200
            }
        }
        if (args.status === "rejected") {
            await ctx.db.patch(args.faculty_id!, {
                isVerified: false,
                status: "rejected"
            })
            await ctx.db.delete(args.faculty_id!)
            return {
                message: "Faculty deleted",
                status: 202
            }
        }
        await ctx.db.patch(args.faculty_id!, {
            isVerified: true,
            status: "approved"
        })

        if (faculty?.teaching_subjects) {
            const subjects = await Promise.all(
                faculty.teaching_subjects.map(async (subjectId) => {
                    const subject = await ctx.db.get(subjectId);
                    return subject;
                })
            );

            for (const subject of subjects) {
                if (subject) {
                    const currentFaculties = subject.subject_teachers || [];
                    if (!currentFaculties.includes(args.faculty_id!)) {
                        await ctx.db.patch(subject._id, {
                            subject_teachers: [...currentFaculties, args.faculty_id!]
                        });
                    }
                }
            }
        }

        if (faculty?.institutionId) {
            const institution = await ctx.db.get(faculty.institutionId)
            if (institution) {
                const currentFaculties = institution.faculties || []
                if (!currentFaculties.includes(args.faculty_id!)) {
                    await ctx.db.patch(institution._id, {
                        faculties: [...currentFaculties, args.faculty_id!]
                    })
                }
            }
        }

        return {
            message: "Faculty verified",
            status: 200
        };
    }
})