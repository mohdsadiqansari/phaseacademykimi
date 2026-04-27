import * as cookie from "cookie";
import { Session } from "@contracts/constants";
import { getSessionCookieOptions } from "./lib/cookies";
import { createRouter, authedQuery, publicQuery } from "./middleware";
import { signSessionToken } from "./kimi/session";
import { upsertUser, findUserByUnionId } from "./queries/users";
import { firebaseAdmin } from "./lib/firebase-admin";
import { z } from "zod";

export const authRouter = createRouter({
  me: authedQuery.query((opts) => opts.ctx.user),
  logout: authedQuery.mutation(async ({ ctx }) => {
    const opts = getSessionCookieOptions(ctx.req.headers);
    ctx.resHeaders.append(
      "set-cookie",
      cookie.serialize(Session.cookieName, "", {
        httpOnly: opts.httpOnly,
        path: opts.path,
        sameSite: opts.sameSite?.toLowerCase() as "lax" | "none",
        secure: opts.secure,
        maxAge: 0,
      }),
    );
    return { success: true };
  }),

  firebaseAuth: publicQuery
    .input(z.object({ idToken: z.string() }))
    .mutation(async ({ input, ctx }) => {
      try {
        const decodedToken = await firebaseAdmin.auth().verifyIdToken(input.idToken);
        const { uid, email, name, picture } = decodedToken;

        if (!uid) {
          throw new Error("Invalid Firebase token");
        }

        await upsertUser({
          unionId: uid,
          email: email || null,
          name: name || email || "User",
          avatar: picture || null,
          lastSignInAt: new Date(),
        });

        const token = await signSessionToken({
          unionId: uid,
          clientId: "firebase_auth",
        });

        const opts = getSessionCookieOptions(ctx.req.headers);
        ctx.resHeaders.append(
          "set-cookie",
          cookie.serialize(Session.cookieName, token, {
            ...opts,
            maxAge: Session.maxAgeMs / 1000,
          })
        );

        return { success: true };
      } catch (error: any) {
        console.error("Firebase auth error:", error);
        throw new Error(error.message || "Authentication failed");
      }
    }),
});
