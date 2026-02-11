// app/actions/auth.js
'use server';
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function handleLogin(prevState, formData) {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { message: "Invalid email or password." };
    }
    // Re-throw so Next.js can handle the redirect
    throw error;
  }
}
