// auth.js
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config"; // Import the edge config
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

// auth.js
export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        await dbConnect();
        const user = await User.findOne({ email: credentials.email });

        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          // 1. Ensure the ID is returned here
          return { id: user._id.toString(), email: user.email };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // 2. When the user logs in, add the ID to the JWT token
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // 3. Move the ID from the JWT token into the Session object
      if (session.user) {
        session.user.id = token.id;
      }
      return session;
    },
  },
});
