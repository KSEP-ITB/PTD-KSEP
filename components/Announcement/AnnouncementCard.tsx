"use client"

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '../ui/button';

type Data = {
  id: string;
  title: string;
  content: string;
  onDelete: (id: string) => void;
};

export default function AnnouncementCard({ id, title, content, onDelete }: Data) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { data: session } = useSession()

  return (
    <div className='bg-gradient-to-b from-[#CF9FC8] to-[#A74899] rounded-3xl border-[3px] border-white mb-5 p-10 text-white'>
      <div className='font-bold text-lg mb-5'> {title} </div>
      <div className='overflow-x-auto'> {content} </div>
      {session?.user.role === "ADMIN" && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild onClick={() => setIsOpen(true)}>
            <button 
              className='mt-4 bg-red-600 text-white rounded px-4 py-2' 
            >
              Delete
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              Are you sure want to delete the Announcement?
            </DialogHeader>
            <Button onClick={() => onDelete(id)} variant={"destructive"}>
              Sure!
            </Button>
            <Button variant={"outline"} onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
