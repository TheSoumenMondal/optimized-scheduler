/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as admin from "../admin.js";
import type * as courses from "../courses.js";
import type * as department from "../department.js";
import type * as faculty from "../faculty.js";
import type * as institution from "../institution.js";
import type * as invitation from "../invitation.js";
import type * as section from "../section.js";
import type * as subject from "../subject.js";
import type * as years from "../years.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  admin: typeof admin;
  courses: typeof courses;
  department: typeof department;
  faculty: typeof faculty;
  institution: typeof institution;
  invitation: typeof invitation;
  section: typeof section;
  subject: typeof subject;
  years: typeof years;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
