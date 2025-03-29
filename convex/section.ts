import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createSection = mutation({
    args: {
        name: v.string(),
        hasGroups: v.boolean(),
        department_id: v.optional(v.id('departments')),
        year_id: v.optional(v.id('years')),
        groups: v.optional(v.array(v.string())),
    },
    handler: async (ctx, args) => {
        const isExistingSection = await ctx.db
            .query("sections")
            .filter((q) =>
                q.and(
                    q.eq(q.field("name"), args.name),
                    q.eq(q.field("department_id"), args.department_id),
                    q.eq(q.field("year_id"), args.year_id)
                )
            )
            .first();
        if (isExistingSection) return 404;

        const newSection = await ctx.db.insert("sections", {
            name: args.name,
            hasGroups: args.hasGroups,
            department_id: args.department_id,
            year_id: args.year_id,
            groups: args.groups,
        })

        if (args.year_id) {
            const year = await ctx.db.get(args.year_id);
            if (year) {
                await ctx.db.patch(args.year_id, {
                    sections: [...(year.sections || []), newSection]
                });
            }
        }

        return newSection;
    }
})


export const getSection = query({
    args: {
        year_id: v.id("years")
    },
    handler: async (ctx, args) => {
        await ctx.db.get(args.year_id);
        const section = await ctx.db
            .query("sections")
            .filter(q => q.eq(q.field("year_id"), args.year_id))
            .collect();
        return section;
    }
})