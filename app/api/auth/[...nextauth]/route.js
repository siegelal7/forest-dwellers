// app/api/auth/[...nextauth]/route.js
import { handlers } from "@/auth";

// Explicitly destructure and export
export const GET = handlers.GET;
export const POST = handlers.POST;
