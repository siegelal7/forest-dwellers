'use client';
import { handleLogin } from '@/app/actions/login';
import { useActionState } from 'react';

export default function LoginPage() {
    const [state, formAction, isPending] = useActionState(handleLogin, null);

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '2rem' }}>
      <form 
        action={formAction} 
        style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
      >
        <input name="email" type="email" placeholder="Email" required />
        <input name="password" type="password" placeholder="Password" required />
        {state?.message && (
          <p className="text-red-500 text-sm font-medium">{state.message}</p>
        )}
        <button disabled={isPending} style={{border: '1px solid blue',cursor:'pointer'}} type="submit">Login</button>
        {isPending ? 'Logging in...' : ''}
      </form>
      <p>Need an account? <a href="/register">Register here</a></p>
    </div>
  );
}