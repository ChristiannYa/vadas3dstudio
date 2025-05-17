"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { z } from "zod";
import { redirect } from "next/navigation";
import { createSession, deleteSession } from "@/lib/session";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .trim(),
});

type LoginFormFields = z.infer<typeof loginSchema>;

type LoginFormErrors = {
  // Set the type to an array of strings because a
  // field might have multiple errors
  [K in keyof LoginFormFields]?: string[];
} & {
  form?: string[];
};

type LoginForm =
  | {
      errors?: LoginFormErrors;
    }
  | undefined;

export async function login(
  prevState: LoginForm,
  formData: FormData
): Promise<LoginForm> {
  // Simulate a slow network request
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Redirect path to be stored if login is successful
  let redirectPath: string | null = null;

  try {
    const result = loginSchema.safeParse(Object.fromEntries(formData));

    // Format submission - check
    if (!result.success) {
      return {
        errors: result.error.flatten().fieldErrors,
      };
    }

    const { email, password } = result.data;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return {
        errors: {
          // Store the error message in the form property
          // for ambiguous errors
          form: ["Invalid email or password"],
        },
      };
    }

    // Compare password against password hash
    const isValidPassword = await bcrypt.compare(password, user.password_hash);

    //  Check if password is valid
    if (!isValidPassword) {
      return {
        errors: {
          // Store the error message in the form property
          // for ambiguous errors
          form: ["Invalid email or password"],
        },
      };
    }

    await createSession(user.id);
    redirectPath = "/";
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
}

/**
 * Since the project strucure has the `Header` component in the
 * root layout, the `useUser` hook won't be triggered when being
 * routed to '/'. Which means that the UI when displaying the
 * username or the login button will not be updated until a page
 * refresh. So we can't redirect the user here to the '/' route.
 *
 * To fix this we could use a custom logout function in the
 * `LogoutButton` component that will force a page reload,
 * which will trigger the `useUser` hook, properly updating the UI.
 * @returns
 */
export async function logout() {
  try {
    await deleteSession();
    return { success: true };
  } catch (error) {
    console.error("Logout error:", error);
    return { success: false, error: "Failed to logout" };
  }
}

/*
  * 
    We'd use this IF wherever the UI that conditionally shows
    the user's name on whether or not they are logged in is in 
    a route that calls the `useUser` hook on mount.
  *

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
*/
