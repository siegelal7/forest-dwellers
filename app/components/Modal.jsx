'use client';
import { createPost } from "@/app/actions/posts";

export default function MyModal({ onClose }) {
    async function handleSubmit(formData){
        const result = await createPost(formData);

        if (result.success) {
        onClose(); // <-- This is your callback! It closes the modal.
        } else {
        alert("Failed to save: " + result.error);
        }
  }
  const handleKeyDown = (e) => {
  // Check if Enter was pressed WITHOUT the Shift key
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault(); // Prevents a new line in the textarea
    e.currentTarget.form.requestSubmit(); // Triggers the form action/onSubmit
  }
};

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl shadow-2xl relative w-full max-w-md">
        <button 
          onClick={onClose}
          className="absolute top-2 right-4 text-2xl"
          type="submit"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">New Post</h2>
        <form action={handleSubmit}>
                <input
                  autoFocus
                  name="title" 
                  placeholder="Post Title" 
                  className="border p-2 rounded text-black"
                  required 
                />
                <textarea 
                  name="content" 
                  placeholder="What's on your mind?" 
                  className="border p-2 rounded text-black h-32"
                  onKeyDown={handleKeyDown}
                  required 
                />
                <button 
                  type="submit" 
                  className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 ml-1"
                >
                  Post
                </button>
            </form>
      </div>
    </div>
  );
}
