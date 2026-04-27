import { createRouter, adminQuery } from "./middleware";
import { getDashboardStats } from "./queries/stats";

export const statsRouter = createRouter({
  dashboard: adminQuery.query(() => {
    return getDashboardStats();
  }),
});
