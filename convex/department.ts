import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const addDepartment = mutation({
    args: {
        name: v.string(),
        years: v.number(),
        minimum_classes_per_day: v.number(),
        max_classes_per_day: v.number(),
    },
    handler: async (ctx, args) => {
        const isExistingDepartment = await ctx.db
            .query("departments")
            .filter((q) => q.eq(q.field("name"), args.name))
            .first()
        if (isExistingDepartment) return
        const newDepartment = await ctx.db.insert("departments", {
            name: args.name,
            years: args.years,
            minimum_classes_per_day: args.minimum_classes_per_day,
            max_classes_per_day: args.max_classes_per_day
        })
        return newDepartment
    }
})

