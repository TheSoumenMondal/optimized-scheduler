import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const generateYears = mutation({
    args: {
        name: v.number(),
        department_id: v.optional(v.id('departments')),
    },
    handler: async (ctx, args) => {
        const existingYears = await ctx.db
            .query("years")
            .filter((q) =>
                q.and(
                    q.eq(q.field("name"), args.name),
                    q.eq(q.field("department_id"), args.department_id)
                )
            )
            .collect();

        if (existingYears.length > 0) return "404";

        // If no existing year found, create a new one
        const newYear = await ctx.db.insert("years", {
            name: args.name,
            department_id: args.department_id,
        });

        if (args.department_id) {
            const department = await ctx.db.get(args.department_id);
            if (department) {
                await ctx.db.patch(args.department_id, {
                    years: [...(department.years || []), newYear]
                });
            }
        }

        return newYear;
    }
});

export const getAllYears = query({
    args: {
        department_id: v.optional(v.id('departments'))
    },
    handler: async (ctx, args) => {
        const years = await ctx.db
            .query("years")
            .filter((q) => q.eq(q.field("department_id"), args.department_id))
            .collect();
        return years;
    }
});
