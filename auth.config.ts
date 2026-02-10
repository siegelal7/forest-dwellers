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

  if (isOnDashboard && !isLoggedIn) {
    return false; // Redirect to login
  }

  // Only redirect to dashboard if we are SURE we aren't logging out
  if (isLoggedIn && nextUrl.pathname === '/') {
    return Response.redirect(new URL('/dashboard', nextUrl));
  }
  return true;
},
  },
  providers: [], 
} satisfies NextAuthConfig;
