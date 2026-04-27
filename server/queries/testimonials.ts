import { eq, desc, count } from "drizzle-orm";
import * as schema from "@db/schema";
import type { InsertTestimonial } from "@db/schema";
import { getDb } from "./connection";

export async function findAllTestimonials(filters?: { featured?: boolean }) {
  const db = getDb();
  if (filters?.featured !== undefined) {
    return db
      .select()
      .from(schema.testimonials)
      .where(eq(schema.testimonials.featured, filters.featured ? 1 : 0))
      .orderBy(desc(schema.testimonials.createdAt));
  }
  return db.select().from(schema.testimonials).orderBy(desc(schema.testimonials.createdAt));
}

export async function findTestimonialById(id: number) {
  const rows = await getDb()
    .select()
    .from(schema.testimonials)
    .where(eq(schema.testimonials.id, id))
    .limit(1);
  return rows.at(0) ?? null;
}

export async function createTestimonial(data: InsertTestimonial) {
  const result = await getDb().insert(schema.testimonials).values(data);
  const id = Number(result[0].insertId);
  return findTestimonialById(id);
}

export async function updateTestimonial(id: number, data: Partial<InsertTestimonial>) {
  await getDb()
    .update(schema.testimonials)
    .set(data)
    .where(eq(schema.testimonials.id, id));
  return findTestimonialById(id);
}

export async function deleteTestimonial(id: number) {
  await getDb().delete(schema.testimonials).where(eq(schema.testimonials.id, id));
  return { success: true };
}

export async function countTestimonials() {
  const rows = await getDb().select({ count: count() }).from(schema.testimonials);
  return rows[0]?.count ?? 0;
}
