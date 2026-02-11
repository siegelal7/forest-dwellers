
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Post from "@/models/Post";
import DashboardClient from "./DashboardClient";
export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const session = await auth();

  console.log('session');
  console.log(session);
  if (!session) redirect("/login");
  const posts = await Post.find({}).populate('author').sort({ createdAt: -1 }).lean();
  console.log(posts);
  const options = { 
  year: 'numeric', 
  month: 'short', 
  day: 'numeric', 
  hour: '2-digit', 
  minute: '2-digit' 
};

//  function handleClick() {
//     console.log("increment like count")
//   }

  return (
    <>
  <div>Welcome, {session.user.email}</div>
  <main>
      <h1>My Dashboard</h1>
      {/* Client logic lives inside this component */}
      <DashboardClient />
  
  {posts.map((post) => (
          <div key={post._id.toString()} className="border p-4 rounded shadow">
            <h2 className="font-semibold">{post.title}</h2>
            <p>{post.content}</p>
            <p>{post.author.name} {post.createdAt.toLocaleString('en-US', options)}</p>
          </div>
        ))}
        </main>
        </>
);
}
