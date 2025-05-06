"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { z } from "zod";
import { redirect } from "next/navigation";
import { createSession, deleteSession } from "@/lib/session";

type LoginForm =
  | {
      errors?: {
        email?: string[];
        password?: string[];
        form?: string[];
      };
    }
  | undefined;

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .trim(),
});

export async function login(prevState: LoginForm, formData: FormData) {
  // Simulate a slow network request
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Will store our redirect path if login is successful
  let redirectPath: string | null = null;

  try {
    const result = loginSchema.safeParse(Object.fromEntries(formData));

    // Format submission check
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      // state
      return {
        errors: {
          email: fieldErrors.email,
          password: fieldErrors.password,
        },
      };
    }

    const { email, password } = result.data;
    console.log("Form data:", result.data);

    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Check if user exists
    if (!user) {
      // state
      return {
        errors: {
          // Store the error message in the form property
          form: ["Invalid email or password"],
        },
      };
    }

    // Compare password against password hash
    const isValidPassword = await bcrypt.compare(password, user.password_hash);

    //  Check if password is valid
    if (!isValidPassword) {
      // state
      return {
        errors: {
          // Store the error message in the form property
          form: ["Invalid email or password"],
        },
      };
    }

    await createSession(user.id.toString());
    redirectPath = "/profile";
  } catch (error) {
    console.error("Login error:", error);
    return {
      errors: {
        form: ["An error occurred during login"],
      },
    };
  } finally {
    if (redirectPath) {
      redirect(redirectPath);
    }
  }

  // This return is needed for TypeScript, though it will never be reached
  // if redirect is called in the finally block
  return { success: true };
}

export async function logout() {
  let redirectPath: string | null = null;

  try {
    await deleteSession();
    redirectPath = "/login";
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    if (redirectPath) {
      redirect(redirectPath);
    }
  }
}
