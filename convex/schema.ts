import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  admin: defineTable({
    name: v.string(),
    email: v.string(),
    isAccepting_request: v.optional(v.boolean()),
    institutions: v.optional(v.array(v.id('institutions'))),
  }),

  institutions: defineTable({
    name: v.string(),
    admin_email: v.string(),
    courses_offered: v.optional(v.array(v.id('courses'))),
    faculties: v.optional(v.array(v.id('faculties'))),
    total_rooms_available: v.number(),
    institution_timing: v.string(),
  }),

  courses: defineTable({
    name: v.string(),
    db_name : v.optional(v.string()),
    duration : v.number(),
    institution_id : v.optional(v.id('institutions')),
    departments: v.optional(v.array(v.id('departments'))),
  }),

  departments: defineTable({
    name: v.string(),
    number_of_sections : v.number(),
    years : v.optional(v.array(v.id('years'))),
    course_id : v.optional(v.id('courses')),
    minimum_classes_per_day: v.number(),
    max_classes_per_day: v.number(),
  }),

  years: defineTable({
    name: v.number(),
    department_id : v.optional(v.id('departments')),
    sections: v.optional(v.array(v.id('sections'))),
    subjects: v.optional(v.array(v.id('subjects'))),
  }),

  subjects: defineTable({
    name: v.string(),
    subject_code: v.string(),
    isPractical: v.boolean(),
    departmentId : v.optional(v.id('departments')),
    yearId : v.optional(v.id('years')),
    sub_class_duration: v.optional(v.number()),
    per_week_timing: v.optional(v.number()),
    subject_teachers: v.optional(v.array(v.id('faculties'))),
  }),

  faculties: defineTable({
    name: v.string(),
    email: v.string(),
    teaching_subjects: v.optional(v.array(v.id('subjects'))),
    department: v.optional(v.id('departments')),
    isAvailable: v.boolean(),
    isVerified: v.boolean(),
    institutionId: v.optional(v.id('institutions')),
    status: v.union(v.literal('pending'), v.literal('approved'), v.literal('rejected')),
  }),

  sections: defineTable({
    name: v.string(),
    hasGroups: v.boolean(),
    department_id : v.optional(v.id('departments')),
    year_id : v.optional(v.id('years')),
    groups: v.optional(v.array(v.string())),
  }),


  labs: defineTable({
    name: v.string(),
    room_number: v.string(),
    available_for_subject: v.optional(v.array(v.id('subjects'))),
  }),

  invitation: defineTable({
    token: v.string(),
    institutionId: v.id('institutions'),
    createdAt: v.number(),
    expiry: v.number(),
    status: v.union(v.literal('active'), v.literal('expired')),
  }),
});