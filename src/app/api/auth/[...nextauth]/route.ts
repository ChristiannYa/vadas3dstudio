import GoogleProvider from "next-auth/providers/google";
import { randomUUID } from "crypto";
import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import prisma from "@/lib/prisma";
import { createSession } from "@/lib/session";

export const authConfig: NextAuthConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }): Promise<boolean> {
      if (account?.provider === "google" && user.email) {
        try {
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email },
          });

          // Check if user exists
          if (!existingUser) {
            // Create new user if they don't exist
            await prisma.user.create({
              /*
                * Since google returns a single name, we need to 
                  split it into first and last name

                  e.g., "John Smith" => ["John", "Smith"]

                  ```
                  // First part becomes "name" (John)
                  name: user.name?.split(" ")[0] || "",

                  // Rest becomes "last_name" (Smith)
                  last_name: user.name?.split(" ").slice(1).join(" ") || "",
                  ```
                
                * `password_hash` is also required because of the schema,
                  but OAuth users don't have passwords
              */
              data: {
                name: user.name?.split(" ")[0] || "",
                last_name: user.name?.split(" ").slice(1).join(" ") || "",
                email: user.email,
                password_hash: `oauth_${randomUUID()}`,
              },
            });
          }
          return true;
        } catch (error) {
          console.error("Error in Google signin:", error);
          return false;
        }
      }
      return true;
    },
  },
  events: {
    async signIn({ user }): Promise<void> {
      if (user.email) {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        // Check if user exists and create session
        if (existingUser) {
          await createSession(existingUser.id.toString());
        }
      }
    },
  },
};

export const { handlers, auth } = NextAuth(authConfig);
export const { GET, POST } = handlers;
