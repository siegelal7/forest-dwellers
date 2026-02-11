'use client'; // This is the ONLY file that gets this directive
import { useState } from 'react';
import PostButton from '../components/postButton';
import MyModal from '../components/Modal';

export default function DashboardClient() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <PostButton onClick={() => setIsOpen(true)} />
      {isOpen && <MyModal onClose={() => setIsOpen(false)} />}
    </>
  );
}
