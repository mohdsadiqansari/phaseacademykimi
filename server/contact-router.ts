import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import {
  findAllContacts,
  findContactById,
  createContact,
  updateContactStatus,
  deleteContact,
} from "./queries/contacts";

export const contactRouter = createRouter({
  submit: publicQuery
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().email(),
        subject: z.string().optional(),
        message: z.string().min(1),
      }),
    )
    .mutation(({ input }) => {
      return createContact(input);
    }),

  // ─── Admin ───
  list: adminQuery
    .input(z.object({ status: z.string().optional(), limit: z.number().optional(), offset: z.number().optional() }).optional())
    .query(({ input }) => {
      return findAllContacts(input ?? {});
    }),

  getById: adminQuery
    .input(z.object({ id: z.number() }))
    .query(({ input }) => {
      return findContactById(input.id);
    }),

  markRead: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => {
      return updateContactStatus(input.id, "read");
    }),

  markReplied: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => {
      return updateContactStatus(input.id, "replied");
    }),

  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => {
      return deleteContact(input.id);
    }),
});
