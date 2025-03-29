import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const addCourse = mutation({
    args: {
        name: v.string(),
        db_name: v.optional(v.string()),
        duration: v.number(),
        institution_id: v.id('institutions'),
        departments: v.optional(v.array(v.id('departments')))
    },
    handler: async (ctx, args) => {
        try {
            const db_name = args.name.toUpperCase().replace(/\s+/g, '');
            const isExistingCourse = await ctx
                .db
                .query("courses")
                .filter((q) => q.eq(q.field("db_name"), db_name)).first();

            if (isExistingCourse) {
                return 404;
            }

            const course = await ctx.db.insert("courses", {
                name: args.name,
                db_name: db_name,
                institution_id: args.institution_id,
                duration: args.duration,
                departments: args.departments
            });

            await ctx.db.patch(course, {
                departments: [...(args.departments ?? [])]
            });

            const institution = await ctx.db.get(args.institution_id);
            await ctx.db.patch(args.institution_id, {
                courses_offered: [...(institution?.courses_offered ?? []), course]
            });

            return course;
        } catch (error: any) {
            throw new Error(`Failed to add course: ${error.message}`);
        }
    }
});

export const getAllCourses = query({
    args: {
        institution_id: v.id("institutions")
    },
    handler: async (ctx, args) => {
        try {
            const courses = await ctx.db
                .query("courses")
                .filter((q) => q.eq(q.field("institution_id"), args.institution_id))
                .collect();

            return courses;
        } catch (error: any) {
            throw new Error(`Failed to fetch courses: ${error.message}`);
        }
    }
});


export const getCourseDetails = query({
    args: {
        course_id: v.id('courses')
    },
    handler: async (ctx, args) => {
        const course = await ctx.db.get(args.course_id);
        if (!course) return 404;
        return course;
    }
})