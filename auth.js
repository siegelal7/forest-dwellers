// auth.js
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"; // Pure JS, compatible with Edge/Turbopack
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { authConfig } from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        await dbConnect();
        const user = await User.findOne({ email: credentials.email });

        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          return { id: user._id.toString(), email: user.email };
        }
        return null;
      },
    }),
  ],
  session: { strategy: "jwt" }, // Required for credentials
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }

      await dbConnect();
      const userExists = await User.findById(token.sub).lean();

      if (!userExists) {
        return null; // Invalidates the JWT token
      }

      return token;
    },
    async session({ session, token }) {
      // If the jwt callback above returned null, token will be undefined/null here
      if (!token?.sub) return null;

      session.user.id = token.sub;
      return session;
    },
  },
});
