import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/lib/prisma";
import { authConstants } from "@/lib/constants/auth";

const generateUUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

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
                // Use the generateUUID function instead of randomUUID
                password_hash: `oauth_${generateUUID()}`,
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
});
