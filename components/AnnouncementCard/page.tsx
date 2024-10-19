"use client"
import { useSession } from 'next-auth/react';
import React from 'react';

type Data = {
  id: string;
  title: string;
  content: string;
  onDelete: (id: string) => void; // Add onDelete prop
};

export default function AnnouncementCard({ id, title, content, onDelete }: Data) {
  const { data: session } = useSession()

  return (
    <div className='bg-gradient-to-b from-[#CF9FC8] to-[#A74899] rounded-3xl border-[3px] border-white mb-5 p-10 text-white'>
      <div className='font-bold text-lg mb-5'> {title} </div>
      <div className='overflow-x-auto'> {content} </div>
      {session?.user.role === "ADMIN" && (
      <button 
        className='mt-4 bg-red-600 text-white rounded px-4 py-2' 
        onClick={() => onDelete(id)} // Call onDelete when clicked
      >
        Delete
      </button>
      )}
    </div>
  );
}
