import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import {
  findAllCourses,
  findCourseBySlug,
  findCourseById,
  findFeaturedCourses,
  findCourseCategories,
  createCourse,
  updateCourse,
  deleteCourse,
} from "./queries/courses";

export const courseRouter = createRouter({
  list: publicQuery
    .input(
      z
        .object({
          category: z.string().optional(),
          level: z.string().optional(),
          search: z.string().optional(),
          featured: z.boolean().optional(),
        })
        .optional(),
    )
    .query(({ input }) => {
      return findAllCourses(input ?? {});
    }),

  getBySlug: publicQuery
    .input(z.object({ slug: z.string() }))
    .query(({ input }) => {
      return findCourseBySlug(input.slug);
    }),

  getFeatured: publicQuery.query(() => {
    return findFeaturedCourses(6);
  }),

  getCategories: publicQuery.query(() => {
    return findCourseCategories();
  }),

  // Admin
  create: adminQuery
    .input(
      z.object({
        title: z.string().min(1),
        slug: z.string().min(1),
        description: z.string().optional(),
        shortDescription: z.string().optional(),
        category: z.enum(["ethical-hacking", "network-security", "web-security", "malware-analysis", "digital-forensics", "cloud-security"]),
        level: z.enum(["beginner", "intermediate", "advanced"]),
        duration: z.string().optional(),
        price: z.number().default(0),
        thumbnail: z.string().optional(),
        featured: z.number().default(0),
        status: z.enum(["published", "draft"]).default("published"),
        curriculum: z.string().optional(),
        whatYoullLearn: z.string().optional(),
        requirements: z.string().optional(),
        metaTitle: z.string().optional(),
        metaDescription: z.string().optional(),
      }),
    )
    .mutation(({ input }) => {
      return createCourse(input as any);
    }),

  update: adminQuery
    .input(
      z.object({
        id: z.number(),
        data: z.object({
          title: z.string().min(1).optional(),
          slug: z.string().min(1).optional(),
          description: z.string().optional(),
          shortDescription: z.string().optional(),
          category: z.enum(["ethical-hacking", "network-security", "web-security", "malware-analysis", "digital-forensics", "cloud-security"]).optional(),
          level: z.enum(["beginner", "intermediate", "advanced"]).optional(),
          duration: z.string().optional(),
          price: z.number().optional(),
          thumbnail: z.string().optional(),
          featured: z.number().optional(),
          status: z.enum(["published", "draft"]).optional(),
          curriculum: z.string().optional(),
          whatYoullLearn: z.string().optional(),
          requirements: z.string().optional(),
          metaTitle: z.string().optional(),
          metaDescription: z.string().optional(),
        }),
      }),
    )
    .mutation(({ input }) => {
      return updateCourse(input.id, input.data as any);
    }),

  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => {
      return deleteCourse(input.id);
    }),

  toggleFeatured: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const course = await findCourseById(input.id);
      if (!course) throw new Error("Course not found");
      return updateCourse(input.id, { featured: course.featured ? 0 : 1 });
    }),

  toggleStatus: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const course = await findCourseById(input.id);
      if (!course) throw new Error("Course not found");
      return updateCourse(input.id, { status: course.status === "published" ? "draft" : "published" });
    }),
});
