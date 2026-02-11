import { registerUser } from "@/app/actions/register";

export default function RegisterPage() {
  return (
    <div>
      <h1>Register</h1>
      <form action={registerUser}>
        <input name="email" type="email" placeholder="Email" required />
        <input name="name" type="text" placeholder="Name" required />
        <input name="password" type="password" placeholder="Password" required />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
