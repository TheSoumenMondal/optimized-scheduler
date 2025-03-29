import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const addDepartment = mutation({
    args: {
        name: v.string(),
        minimum_classes_per_day: v.number(),
        number_of_sections: v.number(),
        max_classes_per_day: v.number(),
        course_id: v.optional(v.id("courses"))
    },
    handler: async (ctx, args) => {
        const isExistingDepartment = await ctx.db
            .query("departments")
            .filter((q) =>
                q.and(
                    q.eq(q.field("name"), args.name),
                    q.eq(q.field("course_id"), args.course_id)
                )
            )
            .first()
        if (isExistingDepartment) return 404
        const newDepartment = await ctx.db.insert("departments", {
            name: args.name,
            course_id: args.course_id,
            number_of_sections: args.number_of_sections,
            minimum_classes_per_day: args.minimum_classes_per_day,
            max_classes_per_day: args.max_classes_per_day
        })

        const course = await ctx.db.get(args.course_id!);
        await ctx.db.patch(args.course_id!, {
            departments: [...(course?.departments || []), newDepartment]
        });

        return newDepartment
    }
})


export const getAllDepartments = query({
    args: {
        course_id: v.optional(v.id("courses"))
    },
    handler: async (ctx, args) => {
        const departments = await ctx.db
            .query("departments")
            .filter((q) => q.eq(q.field("course_id"), args.course_id))
            .collect()
        return departments
    }
})


export const getDepartmentDetails = query({
    args: {
        department_id: v.string()
    },
    handler: async (ctx, args) => {
        const department = await ctx.db
            .query("departments")
            .filter((q) => q.eq(q.field("_id"), args.department_id))
            .first()
        return department
    }
})