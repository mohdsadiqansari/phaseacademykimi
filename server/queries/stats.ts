import { sql } from "drizzle-orm";
import * as schema from "@db/schema";
import { getDb } from "./connection";
import { countCourses, countTestimonials, countReviews, countNewContactsLast7Days, countPendingReviews } from "./stats-queries";

export async function getDashboardStats() {
  const db = getDb();
  const totalCourses = await countCourses();
  const totalTestimonials = await countTestimonials();
  const totalReviews = await countReviews();
  const newContacts7d = await countNewContactsLast7Days();
  const pendingReviews = await countPendingReviews();

  // Enrollments over last 30 days (using contacts as proxy or course creation dates)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const enrollmentRows = await db
    .select({
      date: sql<string>`DATE(${schema.contacts.createdAt})`,
      count: sql<number>`COUNT(*)`,
    })
    .from(schema.contacts)
    .where(sql`${schema.contacts.createdAt} >= ${thirtyDaysAgo}`)
    .groupBy(sql`DATE(${schema.contacts.createdAt})`)
    .orderBy(sql`DATE(${schema.contacts.createdAt})`);

  return {
    totalCourses,
    totalTestimonials,
    totalReviews,
    newContacts7d,
    pendingReviews,
    enrollments30d: enrollmentRows.map((r) => ({
      date: r.date,
      count: Number(r.count),
    })),
  };
}
