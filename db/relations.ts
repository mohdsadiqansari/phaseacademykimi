import { relations } from "drizzle-orm";
import { courses, reviews } from "./schema";

export const coursesRelations = relations(courses, ({ many }) => ({
  reviews: many(reviews),
}));

export const reviewsRelations = relations(reviews, ({ one }) => ({
  course: one(courses, {
    fields: [reviews.courseId],
    references: [courses.id],
  }),
}));
