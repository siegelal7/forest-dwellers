'use server'

import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth"; // Import signIn from your root auth.js

export async function registerUser(formData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const name = formData.get("name");

  try {
    await dbConnect();

    // 1. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { error: "User already exists" };
    }

    // 2. Hash and Create the user
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ 
      email, 
      password: hashedPassword,
      name
    });

    console.log("New user created, attempting auto-login...");

    // 3. Log them in immediately
    // This will overwrite any old session cookies with the new user
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    });

  } catch (error) {
    // IMPORTANT: NextAuth redirects work by throwing a special error.
    // We MUST allow this error to be thrown so Next.js can handle the redirect.
    if (error.type === "NavigationRedirect" || error.message === 'NEXT_REDIRECT') {
      throw error;
    }
    
    console.error("Registration/Login error:", error);
    return { error: "Something went wrong during registration." };
  }
}
