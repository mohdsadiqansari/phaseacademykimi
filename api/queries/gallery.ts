import { eq, desc, asc, count } from "drizzle-orm";
import * as schema from "@db/schema";
import type { InsertGalleryImage } from "@db/schema";
import { getDb } from "./connection";

export async function findAllGalleryImages(category?: string) {
  const db = getDb();
  if (category) {
    return db
      .select()
      .from(schema.galleryImages)
      .where(eq(schema.galleryImages.category, category))
      .orderBy(asc(schema.galleryImages.order), desc(schema.galleryImages.createdAt));
  }
  return db
    .select()
    .from(schema.galleryImages)
    .orderBy(asc(schema.galleryImages.order), desc(schema.galleryImages.createdAt));
}

export async function findGalleryImageById(id: number) {
  const rows = await getDb()
    .select()
    .from(schema.galleryImages)
    .where(eq(schema.galleryImages.id, id))
    .limit(1);
  return rows.at(0) ?? null;
}

export async function createGalleryImage(data: InsertGalleryImage) {
  const result = await getDb().insert(schema.galleryImages).values(data);
  const id = Number(result[0].insertId);
  return findGalleryImageById(id);
}

export async function updateGalleryImage(id: number, data: Partial<InsertGalleryImage>) {
  await getDb()
    .update(schema.galleryImages)
    .set(data)
    .where(eq(schema.galleryImages.id, id));
  return findGalleryImageById(id);
}

export async function deleteGalleryImage(id: number) {
  await getDb().delete(schema.galleryImages).where(eq(schema.galleryImages.id, id));
  return { success: true };
}

export async function countGalleryImages() {
  const rows = await getDb().select({ count: count() }).from(schema.galleryImages);
  return rows[0]?.count ?? 0;
}
