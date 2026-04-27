import { eq, desc, count, and, gte } from "drizzle-orm";
import * as schema from "@db/schema";
import type { InsertContact } from "@db/schema";
import { getDb } from "./connection";

export async function findAllContacts(filters?: { status?: string; limit?: number; offset?: number }) {
  const db = getDb();
  const conditions = [];
  if (filters?.status) {
    conditions.push(eq(schema.contacts.status, filters.status as "new" | "read" | "replied"));
  }
  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;
  return db
    .select()
    .from(schema.contacts)
    .where(whereClause)
    .orderBy(desc(schema.contacts.createdAt))
    .limit(filters?.limit ?? 100)
    .offset(filters?.offset ?? 0);
}

export async function findContactById(id: number) {
  const rows = await getDb()
    .select()
    .from(schema.contacts)
    .where(eq(schema.contacts.id, id))
    .limit(1);
  return rows.at(0) ?? null;
}

export async function createContact(data: InsertContact) {
  const result = await getDb().insert(schema.contacts).values(data);
  const id = Number(result[0].insertId);
  return findContactById(id);
}

export async function updateContactStatus(id: number, status: "new" | "read" | "replied") {
  await getDb()
    .update(schema.contacts)
    .set({ status })
    .where(eq(schema.contacts.id, id));
  return findContactById(id);
}

export async function deleteContact(id: number) {
  await getDb().delete(schema.contacts).where(eq(schema.contacts.id, id));
  return { success: true };
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
