// auth.config.js
import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: '/login', 
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      const isOnRoot = nextUrl.pathname === '/';

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } 
      
      // FIX: Only redirect to dashboard if they are explicitly on root 
      // and NOT in the middle of a logout process.
      if (isLoggedIn && isOnRoot) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }

      return true;
    },
  },
  providers: [], 
} satisfies NextAuthConfig;
