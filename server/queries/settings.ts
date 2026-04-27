import { eq } from "drizzle-orm";
import * as schema from "@db/schema";
import type { InsertSiteSettings } from "@db/schema";
import { getDb } from "./connection";

export async function findSiteSettings() {
  const rows = await getDb()
    .select()
    .from(schema.siteSettings)
    .where(eq(schema.siteSettings.id, 1))
    .limit(1);
  return rows.at(0) ?? null;
}

export async function getOrCreateSiteSettings() {
  const existing = await findSiteSettings();
  if (existing) return existing;
  const result = await getDb()
    .insert(schema.siteSettings)
    .values({
      siteTitle: "Phase Academy",
      siteDescription: "Master the Art of Cyber Defense",
      contactEmail: "hello@phaseacademy.com",
      contactPhone: "+1 (555) 123-4567",
      contactAddress: "123 Cyber Lane, Tech District, San Francisco, CA 94105",
    });
  const id = Number(result[0].insertId);
  const rows = await getDb()
    .select()
    .from(schema.siteSettings)
    .where(eq(schema.siteSettings.id, id))
    .limit(1);
  return rows.at(0) ?? null;
}

export async function updateSiteSettings(data: Partial<InsertSiteSettings>) {
  const existing = await findSiteSettings();
  if (!existing) {
    return getOrCreateSiteSettings();
  }
  await getDb()
    .update(schema.siteSettings)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(schema.siteSettings.id, 1));
  return findSiteSettings();
}
