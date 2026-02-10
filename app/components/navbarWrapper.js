// components/NavbarWrapper.js
import { auth } from "@/auth";
import Navbar from "./navbar"; // This is your existing client file

export default async function NavbarWrapper() {
  const session = await auth(); // Fetch session on the server
  return <Navbar session={session} />; // Pass it down
}
