"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { z } from "zod";
import { createSession } from "@/lib/session";
import { redirect } from "next/navigation";

const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "First name must be at least 2 characters" })
      .trim(),
    last_name: z
      .string()
      .min(2, { message: "Last name must be at least 2 characters" })
      .trim(),
    email: z.string().email({ message: "Invalid email address" }).trim(),
    password: z
      .string()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{6,}$/, {
        message:
          "Password must be at least 6 characters and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      })
      .trim(),

    confirm_password: z
      .string()
      .min(1, { message: "Please confirm your password" })
      .trim(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
  });

type RegisterFormFields = z.infer<typeof registerSchema>;

type RegisterFormErrors = {
  // Set the type to an array of strings because
  // a field might have multiple errors
  [K in keyof RegisterFormFields]?: string[];
} & {
  form?: string[];
};

type RegisterForm =
  | {
      errors?: RegisterFormErrors;
      values?: Pick<RegisterFormFields, "name" | "last_name" | "email">;
    }
  | undefined;

export async function register(
  prevState: RegisterForm,
  formData: FormData
): Promise<RegisterForm> {
  // Simulate a slow network request
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Redirect path to be stored if registration is successful
  let redirectPath: string | null = null;

  const name = formData.get("name") as string;
  const last_name = formData.get("last_name") as string;
  const email = formData.get("email") as string;

  try {
    const result = registerSchema.safeParse(Object.fromEntries(formData));

    // Format submission - check
    if (!result.success) {
      return {
        errors: result.error.flatten().fieldErrors,
        values: { name, last_name, email },
      };
    }

    const { password } = result.data;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      // state
      return {
        errors: {
          email: ["Email already registered"],
        },
        values: { name, last_name, email },
      };
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        last_name,
        email,
        password_hash: passwordHash,
      },
    });

    // Create session for the new user
    await createSession(newUser.id.toString());

    redirectPath = "/";
  } catch (error) {
    console.error("Registration error:", error);
    return {
      errors: {
        form: ["An error occurred during registration"],
      },
      values: { name, last_name, email },
    };
  } finally {
    if (redirectPath) {
      redirect(redirectPath);
    }
  }
}
