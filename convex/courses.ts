import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const addCourse = mutation({
    args: {
        name: v.string(),
        duration: v.number(),
        departments: v.optional(v.array(v.id('departments'))),
    },
    handler: async (ctx, args) => {
        const isExistingCourse = await ctx
            .db
            .query("courses")
            .filter((q) => q.eq(q.field("name"), args.name)).first()
        if (isExistingCourse) return;
        
        const smallName = args.name.toLowerCase()
        const course = await ctx.db.insert("courses", {
            name: smallName,
            duration: args.duration,
            departments: args.departments
        })

        await ctx.db.patch(course, {
            departments: [...(args.departments ?? [])]
        })

        return course
    }
})


export const addDepartmentsToCourse = mutation({
    args: {
        course_id: v.id("courses"),
        departments: v.optional(v.array(v.id('departments')))
    },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.course_id, {
            departments: [...(args.departments ?? [])]
        })
    }
})