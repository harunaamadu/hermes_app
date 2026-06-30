"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export type LoginResult = { error?: string };

export async function loginWithCredentials(
  _prevState: LoginResult | undefined,
  formData: FormData,
): Promise<LoginResult> {
  try {
    await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      redirectTo: "/dashboard",
    });
    return {};
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid email or password" };
        default:
          return { error: "Something went wrong" };
      }
    }
    // NEXT_REDIRECT throws (the success path) must still propagate —
    // only AuthError gets turned into a return value above.
    throw error;
  }
}

export async function loginWithGoogle(callbackUrl?: string) {
  try {
    await signIn("google", { redirectTo: callbackUrl ?? "/dashboard" });
  } catch (error) {
    if (error instanceof AuthError) {
      throw new Error("Couldn't sign in with Google. Please try again.");
    }
    throw error;
  }
}