import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import {
  findAllGalleryImages,
  createGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
} from "./queries/gallery";

export const galleryRouter = createRouter({
  list: publicQuery
    .input(z.object({ category: z.string().optional() }).optional())
    .query(({ input }) => {
      return findAllGalleryImages(input?.category);
    }),

  // ─── Admin ───
  create: adminQuery
    .input(
      z.object({
        url: z.string().min(1),
        caption: z.string().optional(),
        category: z.string().optional(),
        order: z.number().default(0),
      }),
    )
    .mutation(({ input }) => {
      return createGalleryImage(input);
    }),

  update: adminQuery
    .input(
      z.object({
        id: z.number(),
        data: z.object({
          url: z.string().optional(),
          caption: z.string().optional(),
          category: z.string().optional(),
          order: z.number().optional(),
        }),
      }),
    )
    .mutation(({ input }) => {
      return updateGalleryImage(input.id, input.data);
    }),

  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => {
      return deleteGalleryImage(input.id);
    }),
});
