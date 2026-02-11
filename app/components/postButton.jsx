'use client';
export default function PostButton({ onClick }) {
  return <button style={{border: '2px solid #3b82f6',borderRadius: '8px', cursor: 'pointer',padding: '10px 20px', marginBottom:'5px', marginTop:'5px'}} onClick={onClick}>Create Post</button>;
}