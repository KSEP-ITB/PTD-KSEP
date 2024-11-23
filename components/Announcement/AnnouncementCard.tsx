"use client"

// Library Import
import React, { useRef, useState } from 'react';
import { motion, useInView } from "framer-motion";

// Auth Import
import { useSession } from 'next-auth/react';

// Components Import
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
  const { data: session } = useSession();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false); 

  const ref = useRef(null);
  
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="bg-gradient-to-br to-[#CF9FC8] from-[#A74899] border-2 rounded-2xl w-full p-4 border-white space-y-2 md:space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, ease: "easeInOut" }} 
    >
      <div className='font-bold text-xl md:text-2xl text-white'>{title}</div>
      <div
        className="overflow-x-auto text-white text-sm md:text-[16px]"
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
      {session?.user.role === "ADMIN" && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <div className='w-full flex justify-end'>
              <Button 
                className='mt-4 bg-red-500 hover:bg-red-400 rounded-full border-2 border-red-700 text-white px-4 py-2' 
              >
                Delete
              </Button>
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Are you sure want to delete the Announcement?
              </DialogTitle>
              <DialogDescription>
                This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <div className='flex gap-x-4 w-full'>
              <Button
                className="w-full"
                onClick={() => {
                  setIsProcessing(true); 
                  onDelete(id);
                }}
                variant={"destructive"}
                disabled={isProcessing} 
              >
                Sure!
              </Button>
              <Button
                className="w-full"
                variant={"outline"}
                disabled={isProcessing} 
                onClick={() => {setIsProcessing(false); setIsDialogOpen(false)}} 
              >
                Cancel
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </motion.div>
  );
}
