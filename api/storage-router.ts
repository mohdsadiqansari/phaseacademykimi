import { z } from "zod";
import { createRouter, adminQuery } from "./middleware";
import { generateUploadUrl } from "./lib/s3";
import { nanoid } from "nanoid";

export const storageRouter = createRouter({
  getUploadUrl: adminQuery
    .input(
      z.object({
        filename: z.string(),
        contentType: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const ext = input.filename.split(".").pop();
      const id = nanoid();
      const key = `${id}.${ext}`;
      
      const { uploadUrl, publicUrl } = await generateUploadUrl(key, input.contentType);
      return { uploadUrl, publicUrl, key };
    }),
});
