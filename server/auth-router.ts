import * as cookie from "cookie";
import { Session } from "@contracts/constants";
import { getSessionCookieOptions } from "./lib/cookies";
import { createRouter, authedQuery, publicQuery } from "./middleware";
import { signSessionToken } from "./kimi/session";
import { upsertUser, findUserByEmail } from "./queries/users";
import { env } from "./lib/env";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { nanoid } from "nanoid";

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
  mockLogin: publicQuery.mutation(async ({ ctx }) => {
    // Only allow mock login in development
    if (env.isProduction) {
      throw new Error("Mock login is disabled in production.");
    }
    const dummyUnionId = "local_dev_admin";
    await upsertUser({
      unionId: dummyUnionId,
      name: "Admin User",
      role: "admin",
      lastSignInAt: new Date(),
    });
    const token = await signSessionToken({
      unionId: dummyUnionId,
      clientId: env.appId || "mock_client",
    });
    const opts = getSessionCookieOptions(ctx.req.headers);
    ctx.resHeaders.append(
      "set-cookie",
      cookie.serialize(Session.cookieName, token, {
        httpOnly: opts.httpOnly,
        path: opts.path,
        sameSite: opts.sameSite?.toLowerCase() as "lax" | "none",
        secure: opts.secure,
        maxAge: Session.maxAgeMs / 1000,
      }),
    );
    return { success: true };
  }),
  register: publicQuery
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(8),
        name: z.string().min(2),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const existingUser = await findUserByEmail(input.email);
      if (existingUser) {
        throw new Error("Email is already registered");
      }

      const unionId = nanoid();
      const passwordHash = bcrypt.hashSync(input.password, 10);

      await upsertUser({
        unionId,
        email: input.email,
        passwordHash,
        name: input.name,
      });

      const token = await signSessionToken({
        unionId,
        clientId: env.appId || "local_auth",
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
    }),

  login: publicQuery
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const user = await findUserByEmail(input.email);
      if (!user || !user.passwordHash) {
        throw new Error("Invalid email or password");
      }

      const isValid = bcrypt.compareSync(input.password, user.passwordHash);
      if (!isValid) {
        throw new Error("Invalid email or password");
      }

      await upsertUser({
        ...user,
        lastSignInAt: new Date(),
      });

      const token = await signSessionToken({
        unionId: user.unionId,
        clientId: env.appId || "local_auth",
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
    }),
});
