import { eq, gte, count } from "drizzle-orm";
import * as schema from "@db/schema";
import { getDb } from "./connection";

export async function countCourses() {
  const rows = await getDb().select({ count: count() }).from(schema.courses);
  return rows[0]?.count ?? 0;
}

export async function countTestimonials() {
  const rows = await getDb().select({ count: count() }).from(schema.testimonials);
  return rows[0]?.count ?? 0;
}

export async function countReviews() {
  const rows = await getDb().select({ count: count() }).from(schema.reviews);
  return rows[0]?.count ?? 0;
}

export async function countContacts() {
  const rows = await getDb().select({ count: count() }).from(schema.contacts);
  return rows[0]?.count ?? 0;
}

export async function countNewContactsLast7Days() {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const rows = await getDb()
    .select({ count: count() })
    .from(schema.contacts)
    .where(gte(schema.contacts.createdAt, sevenDaysAgo));
  return rows[0]?.count ?? 0;
}

export async function countPendingReviews() {
  const rows = await getDb()
    .select({ count: count() })
    .from(schema.reviews)
    .where(eq(schema.reviews.status, "pending"));
  return rows[0]?.count ?? 0;
}
