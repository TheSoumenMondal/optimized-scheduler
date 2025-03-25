import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    admin: defineTable({
        name: v.string(),
        email: v.string(),
        isAccepting_request: v.optional(v.boolean()),
        institutions: v.optional(v.array(v.id("institutions")))
    }),
    institutions: defineTable({
        name: v.string(),
        admin_email: v.string(),
        courses_offered: v.optional(v.array(v.id("courses"))),
        faculties: v.optional(v.array(v.id("faculties"))),   // Stores approved faculty IDs
        total_rooms_available: v.number(),
        institution_timing: v.string(),
    }),
    courses: defineTable({
        name: v.string(),
        departments: v.optional(v.array(v.id("departments"))),
    }),
    departments: defineTable({
        name: v.string(),
        years: v.optional(v.array(v.id("years"))),
        minimum_classes_per_day: v.number(),
        max_classes_per_day: v.number(),
    }),
    years: defineTable({
        name: v.string(),
        sections: v.optional(v.array(v.id("sections"))),
        subjects: v.optional(v.array(v.id("subjects")))
    }),
    subjects: defineTable({
        name: v.string(),
        subject_code: v.string(),
        isPractical: v.boolean(),
        sub_class_duration: v.number(),
        per_week_timming: v.number(),
        subject_teachers: v.optional(v.array(v.id("faculties")))
    }),
    faculties: defineTable({
        name: v.string(),
        email: v.string(),                              // Added as a unique identifier to prevent multiple requests
        teaching_subjects: v.optional(v.array(v.id("subjects"))),
        department: v.string(),
        isAvailable: v.boolean(),
        isVerified: v.boolean(),
        institutionId: v.optional(v.id("institutions")), // Links to institution after approval
        status: v.union(v.literal("pending"),
            v.literal("approved"),
            v.literal("rejected")
        )                             // Tracks approval status (e.g., "pending", "approved", "rejected")
    }),
    sections: defineTable({
        name: v.string(),
        hasGroups: v.boolean(),
        groups: v.optional(v.array(v.id("groups")))
    }),
    groups: defineTable({
        name: v.string(),
        student_capacity: v.optional(v.number())
    }),
    labs: defineTable({
        name: v.string(),
        room_number: v.string(),
        available_for_subject: v.optional(v.array(v.id("subjects")))
    }),
    invitation: defineTable({
        token: v.string(),                    // For the 
        institutionId: v.id("institutions"),  // Links to
        createdAt: v.number(),
        expiry: v.number(),
        status: v.union(v.literal("active"), v.literal("expired")),                   // Tracks link status (e.g., "active", "expired")
    }),
});