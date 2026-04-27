import { authRouter } from "./auth-router";
import { courseRouter } from "./course-router";
import { testimonialRouter } from "./testimonial-router";
import { reviewRouter } from "./review-router";
import { galleryRouter } from "./gallery-router";
import { contactRouter } from "./contact-router";
import { settingsRouter } from "./settings-router";
import { statsRouter } from "./stats-router";
import { storageRouter } from "./storage-router";
import { createRouter, publicQuery } from "./middleware";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  course: courseRouter,
  testimonial: testimonialRouter,
  review: reviewRouter,
  gallery: galleryRouter,
  contact: contactRouter,
  settings: settingsRouter,
  stats: statsRouter,
  storage: storageRouter,
});

export type AppRouter = typeof appRouter;
