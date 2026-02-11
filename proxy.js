// proxy.js
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

// Standard Auth.js v5 proxy export
export const { auth: proxy } = NextAuth(authConfig);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
  callbacks: {
    authorized({ auth, nextUrl }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');

      if (isOnDashboard && !isLoggedIn) {
        // This is what triggers the redirect to /login
        return false; 
      }
      return true;
    },
  },
};
