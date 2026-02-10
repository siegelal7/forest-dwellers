// components/LogoutButton.js
import { signOut } from "@/auth";

export default function Logout() {
  return (
    <form action={async () => {
      "use server";
      // redirectTo: "/" is critical to bust the client-side cache
      await signOut({ redirectTo: "/" });
    }}>
      <button type="submit">Logout</button>
    </form>
  );
}
