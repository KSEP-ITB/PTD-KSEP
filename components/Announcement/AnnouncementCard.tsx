"use client"

// Library Import
import React, { useRef } from 'react';
import { motion, useInView } from "framer-motion";

// // Auth Import
// import { useSession } from 'next-auth/react';

// // Components Import
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { Button } from '../ui/button';

type Data = {
  title: string;
  content: string;
  onDelete: (id: string) => void;
};

export default function AnnouncementCard({ title, content, onDelete }: Data) {
  // const [isOpen, setIsOpen] = useState<boolean>(false)
  // const { data: session } = useSession()

  const ref = useRef(null);
  
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="bg-gradient-to-br to-[#CF9FC8] from-[#A74899] border-2 rounded-2xl w-full p-4 border-white space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, ease: "easeInOut" }} 
    >
      <div className='font-bold text-2xl text-white'>{title}</div>
      <div
        className="overflow-x-auto text-white"
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
      {/* {session?.user.role === "ADMIN" && (
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
      )} */}
    </motion.div>
  );
}
