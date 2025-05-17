import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/lib/prisma";
import { authConstants } from "@/lib/constants/auth";
import { generateUUID } from "@/utils/auth";

export const { auth, handlers } = NextAuth({
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
    async signIn({ user, account }) {
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
              data: {
                name: user.name?.split(" ")[0] || "",
                last_name: user.name?.split(" ").slice(1).join(" ") || "",
                email: user.email,
                password_hash: `oauth_${generateUUID()}`,
              },
            });
            console.log("New user created:", user.email);
          } else {
            console.log("User already exists:", user.email);
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

  pages: {
    signIn: "/auth/log-in",
    error: "/auth/error",
  },
});
