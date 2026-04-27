import { eq, desc, count, and } from "drizzle-orm";
import * as schema from "@db/schema";
import type { InsertReview } from "@db/schema";
import { getDb } from "./connection";

export async function findReviewsByCourse(courseId: number, status = "approved") {
  return getDb()
    .select()
    .from(schema.reviews)
    .where(and(eq(schema.reviews.courseId, courseId), eq(schema.reviews.status, status as "pending" | "approved" | "rejected")))
    .orderBy(desc(schema.reviews.createdAt));
}

export async function findAllReviews(filters?: { status?: string; courseId?: number }) {
  const db = getDb();
  const conditions = [];
  if (filters?.status) {
    conditions.push(eq(schema.reviews.status, filters.status as "pending" | "approved" | "rejected"));
  }
  if (filters?.courseId) {
    conditions.push(eq(schema.reviews.courseId, filters.courseId));
  }
  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;
  return db.select().from(schema.reviews).where(whereClause).orderBy(desc(schema.reviews.createdAt));
}

export async function findReviewById(id: number) {
  const rows = await getDb()
    .select()
    .from(schema.reviews)
    .where(eq(schema.reviews.id, id))
    .limit(1);
  return rows.at(0) ?? null;
}

export async function createReview(data: InsertReview) {
  const result = await getDb().insert(schema.reviews).values(data);
  const id = Number(result[0].insertId);
  return findReviewById(id);
}

export async function updateReviewStatus(id: number, status: "pending" | "approved" | "rejected") {
  await getDb()
    .update(schema.reviews)
    .set({ status })
    .where(eq(schema.reviews.id, id));
  return findReviewById(id);
}

export async function replyToReview(id: number, reply: string) {
  await getDb()
    .update(schema.reviews)
    .set({ reply })
    .where(eq(schema.reviews.id, id));
  return findReviewById(id);
}

export async function deleteReview(id: number) {
  await getDb().delete(schema.reviews).where(eq(schema.reviews.id, id));
  return { success: true };
}

export async function countPendingReviews() {
  const rows = await getDb()
    .select({ count: count() })
    .from(schema.reviews)
    .where(eq(schema.reviews.status, "pending"));
  return rows[0]?.count ?? 0;
}

export async function countReviews() {
  const rows = await getDb().select({ count: count() }).from(schema.reviews);
  return rows[0]?.count ?? 0;
}
