// app/actions/posts.js
"use server";

import { auth } from "@/auth";
import dbConnect from "@/lib/mongodb";
import Post from "@/models/Post";
import { revalidatePath } from "next/cache";

export async function createPost(formData) {
  const session = await auth();

  // 1. Security Check
  if (!session?.user?.id) {
    throw new Error("You must be logged in to post.");
  }

  await dbConnect();

  // 2. Extract Data
  const title = formData.get("title");
  const content = formData.get("content");

  // 4. Refresh the page to show the new post
 try {
    await Post.create({ title, content, author: session.user.id});
    
    revalidatePath('/dashboard'); 
    
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
