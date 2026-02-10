import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Post from "@/models/Post";

export default async function Dashboard() {
  const session = await auth();

  if (!session) redirect("/login");
  const posts = await Post.find({}).sort({ createdAt: -1 }).lean();

  return (
    <>
  <div>Welcome, {session.user.email}</div>
  {posts.map((post) => (
          <div key={post._id.toString()} className="border p-4 rounded shadow">
            <h2 className="font-semibold">{post.title}</h2>
            <p>{post.content}</p>
          </div>
        ))}
        </>
);
}
