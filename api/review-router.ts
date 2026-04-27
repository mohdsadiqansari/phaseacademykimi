import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import {
  findReviewsByCourse,
  findAllReviews,
  createReview,
  updateReviewStatus,
  replyToReview,
  deleteReview,
} from "./queries/reviews";

export const reviewRouter = createRouter({
  listByCourse: publicQuery
    .input(z.object({ courseId: z.number() }))
    .query(({ input }) => {
      return findReviewsByCourse(input.courseId, "approved");
    }),

  create: publicQuery
    .input(
      z.object({
        courseId: z.number(),
        userName: z.string().optional(),
        userEmail: z.string().email().optional(),
        content: z.string().min(1),
        rating: z.number().min(1).max(5).default(5),
      }),
    )
    .mutation(({ input }) => {
      return createReview({ ...input, status: "pending" });
    }),

  // ─── Admin ───
  listAll: adminQuery
    .input(z.object({ status: z.string().optional(), courseId: z.number().optional() }).optional())
    .query(({ input }) => {
      return findAllReviews(input ?? {});
    }),

  approve: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => {
      return updateReviewStatus(input.id, "approved");
    }),

  reject: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => {
      return updateReviewStatus(input.id, "rejected");
    }),

  reply: adminQuery
    .input(z.object({ id: z.number(), reply: z.string().min(1) }))
    .mutation(({ input }) => {
      return replyToReview(input.id, input.reply);
    }),

  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => {
      return deleteReview(input.id);
    }),
});
