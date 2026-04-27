import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import { getOrCreateSiteSettings, updateSiteSettings } from "./queries/settings";

export const settingsRouter = createRouter({
  get: publicQuery.query(async () => {
    return getOrCreateSiteSettings();
  }),

  update: adminQuery
    .input(
      z.object({
        siteTitle: z.string().optional(),
        siteDescription: z.string().optional(),
        logoUrl: z.string().optional(),
        faviconUrl: z.string().optional(),
        defaultMetaTitle: z.string().optional(),
        defaultMetaDescription: z.string().optional(),
        socialTwitter: z.string().optional(),
        socialLinkedin: z.string().optional(),
        socialGithub: z.string().optional(),
        socialYoutube: z.string().optional(),
        socialDiscord: z.string().optional(),
        contactEmail: z.string().optional(),
        contactPhone: z.string().optional(),
        contactAddress: z.string().optional(),
        analyticsGaId: z.string().optional(),
      }),
    )
    .mutation(({ input }) => {
      return updateSiteSettings(input);
    }),
});
