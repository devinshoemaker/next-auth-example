import prisma from "@/db";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { authConfig } from "./auth.config";

async function getUser(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
    include: {
      password: true,
    },
  });

  return user;
}

export async function signUp(formData: FormData) {
  const parsedCredentials = z
    .object({ email: z.string().email(), password: z.string().min(6) })
    .safeParse(Object.fromEntries(formData));

  if (parsedCredentials.success) {
    const { email, password } = parsedCredentials.data;

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      throw new Error("Email address already exists.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        email,
        password: {
          create: {
            hash: hashedPassword,
          },
        },
      },
    });
  } else {
    throw new Error("Invalid credentials.");
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          const user = await getUser(email);
          if (!user || !user.password) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(
            password,
            user.password.hash
          );

          if (passwordsMatch) {
            return user;
          }
        }

        return null;
      },
    }),
  ],
});
