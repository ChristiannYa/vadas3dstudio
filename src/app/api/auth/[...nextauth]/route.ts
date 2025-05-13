import GoogleProvider from "next-auth/providers/google";
import { randomUUID } from "crypto";
import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import prisma from "@/lib/prisma";
import { authConstants } from "@/lib/constants/auth";

const authConfig: NextAuthConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "select_account",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }): Promise<boolean> {
      if (
        account?.provider === authConstants.AUTH.PROVIDERS.GOOGLE &&
        user.email
      ) {
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
};

export const { handlers, auth } = NextAuth(authConfig);
export const { GET, POST } = handlers;
