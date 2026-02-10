import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { createPost } from "@/app/actions/posts";

export default async function Forum() {
  const session = await auth();

  if (!session) redirect("/login");

  return (
  <div style={{background:'white'}}>
    <div>Welcome, {session.user.email}</div>
    <form action={createPost}>
        <input 
          name="title" 
          placeholder="Post Title" 
          className="border p-2 rounded text-black"
          required 
        />
        <textarea 
          name="content" 
          placeholder="What's on your mind?" 
          className="border p-2 rounded text-black h-32"
          required 
        />
        <button 
          type="submit" 
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Post to Forum
        </button>
    </form>
  </div>
);
}
