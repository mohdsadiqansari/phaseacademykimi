import { eq, and, like, desc, count } from "drizzle-orm";
import * as schema from "@db/schema";
import type { InsertCourse } from "@db/schema";
import { getDb } from "./connection";

export async function findAllCourses(filters?: {
  category?: string;
  level?: string;
  search?: string;
  featured?: boolean;
  status?: string;
}) {
  const db = getDb();
  const conditions = [];

  if (filters?.category) {
    conditions.push(eq(schema.courses.category, filters.category as any));
  }
  if (filters?.level) {
    conditions.push(eq(schema.courses.level, filters.level as any));
  }
  if (filters?.search) {
    conditions.push(like(schema.courses.title, `%${filters.search}%`));
  }
  if (filters?.featured !== undefined) {
    conditions.push(eq(schema.courses.featured, filters.featured ? 1 : 0));
  }
  if (filters?.status) {
    conditions.push(eq(schema.courses.status, filters.status as any));
  } else {
    conditions.push(eq(schema.courses.status, "published" as any));
  }

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  return db
    .select()
    .from(schema.courses)
    .where(whereClause)
    .orderBy(desc(schema.courses.featured), desc(schema.courses.createdAt));
}

export async function findCourseBySlug(slug: string) {
  const rows = await getDb()
    .select()
    .from(schema.courses)
    .where(eq(schema.courses.slug, slug))
    .limit(1);
  return rows.at(0) ?? null;
}

export async function findCourseById(id: number) {
  const rows = await getDb()
    .select()
    .from(schema.courses)
    .where(eq(schema.courses.id, id))
    .limit(1);
  return rows.at(0) ?? null;
}

export async function findFeaturedCourses(limit = 6) {
  return getDb()
    .select()
    .from(schema.courses)
    .where(and(eq(schema.courses.featured, 1), eq(schema.courses.status, "published" as any)))
    .orderBy(desc(schema.courses.createdAt))
    .limit(limit);
}

export async function findCourseCategories() {
  const rows = await getDb()
    .selectDistinct({ category: schema.courses.category })
    .from(schema.courses)
    .where(eq(schema.courses.status, "published" as any));
  return rows.map((r) => r.category);
}

export async function createCourse(data: InsertCourse) {
  const result = await getDb().insert(schema.courses).values(data);
  const id = Number(result[0].insertId);
  return findCourseById(id);
}

export async function updateCourse(id: number, data: Partial<InsertCourse>) {
  await getDb()
    .update(schema.courses)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(schema.courses.id, id));
  return findCourseById(id);
}

export async function deleteCourse(id: number) {
  await getDb().delete(schema.courses).where(eq(schema.courses.id, id));
  return { success: true };
}

export async function countCourses() {
  const rows = await getDb().select({ count: count() }).from(schema.courses);
  return rows[0]?.count ?? 0;
}
