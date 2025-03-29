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
        
        // Return all faculties if no institution filter
        return await query.collect();
    }
})