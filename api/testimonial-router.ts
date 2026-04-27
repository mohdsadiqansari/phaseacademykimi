import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import {
  findAllTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "./queries/testimonials";

export const testimonialRouter = createRouter({
  list: publicQuery
    .input(z.object({ featured: z.boolean().optional() }).optional())
    .query(({ input }) => {
      return findAllTestimonials(input ?? {});
    }),

  // ─── Admin ───
  create: adminQuery
    .input(
      z.object({
        name: z.string().min(1),
        role: z.string().optional(),
        content: z.string().min(1),
        rating: z.number().min(1).max(5).default(5),
        avatar: z.string().optional(),
        featured: z.number().default(0),
      }),
    )
    .mutation(({ input }) => {
      return createTestimonial(input);
    }),

  update: adminQuery
    .input(
      z.object({
        id: z.number(),
        data: z.object({
          name: z.string().min(1).optional(),
          role: z.string().optional(),
          content: z.string().min(1).optional(),
          rating: z.number().min(1).max(5).optional(),
          avatar: z.string().optional(),
          featured: z.number().optional(),
        }),
      }),
    )
    .mutation(({ input }) => {
      return updateTestimonial(input.id, input.data);
    }),

  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => {
      return deleteTestimonial(input.id);
    }),
});
