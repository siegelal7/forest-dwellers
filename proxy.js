// proxy.js (at your root or src/)
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

// The function should be named proxy or be the default export
const { auth } = NextAuth(authConfig);
export default auth; 

export const config = {
  // Same matcher as before
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
