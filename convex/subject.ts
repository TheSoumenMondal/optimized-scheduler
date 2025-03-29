import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const addSubject = mutation({
    args: {
        name: v.string(),
        subject_code: v.string(),
        isPractical: v.boolean(),
        departmentId: v.optional(v.id('departments')),
        yearId: v.optional(v.id('years')),
        Class_duration: v.optional(v.number()),
        per_week_timing: v.optional(v.number()),
        subject_teachers: v.optional(v.array(v.id('faculties'))),
    },
    handler: async (ctx, args) => {
        const isExistingSubject = await ctx.db.query('subjects').filter((q) => q.eq(q.field('subject_code'), args.subject_code)).collect();
        if (isExistingSubject.length > 0) {
            return {
                message: 'Subject already exists',
                status: 400,
            }
        }
        const subject = await ctx.db.insert('subjects', args);

        if (args.yearId) {
            const year = await ctx.db.get(args.yearId);
            const existingSubjects = year?.subjects || [];
            await ctx.db.patch(args.yearId, {
                subjects: [...existingSubjects, subject]
            });
        }
        return {
            message: 'Subject added successfully',
            status: 200,
            data: subject,
        }
    }
})