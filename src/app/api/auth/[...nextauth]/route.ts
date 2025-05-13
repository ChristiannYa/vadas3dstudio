import NextAuth from "next-auth";
import authOptions from "@/lib/authOptions";

// Create auth handler with the v5 approach
export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);

// Export the handlers for API routes
export const GET = handlers.GET;
export const POST = handlers.POST;
