"use client";

// Library Import
import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

// Components Importa
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '../ui/button';

// Auth Import
import { useSession } from "next-auth/react";

interface CardProps {
  id: string;
  day: string;
  title: string;
  link: string;
  onDelete: (id: string) => void;
}

const Card = ({ id, day, title, link, onDelete }: CardProps) => {
  const { data: session } = useSession()

  const [showPdf, setShowPdf] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const formattedLink = link.replace("/view", "/preview");

  return (
    <motion.div 
      ref={ref}
      className="border-2 rounded-2xl w-full bg-gradient-to-tr from-[#0F389B] to-[#8CAAF4] p-4 border-white space-y-2 md:space-y-0"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, ease: "easeInOut" }} 
    >
      <div className='font-bold text-xl md:text-2xl text-white'>{day}</div>
      <div className="overflow-x-auto text-white">
        {title}
      </div>

      <div className="py-4">
        {session?.user.role === "ADMIN" && (
          <Dialog>
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
                  Are you sure want to delete the Handbook?
                </DialogTitle>
                <DialogDescription>
                  This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <div className='flex gap-x-4 w-full'>
                <Button 
                  className='w-full' onClick={() => { 
                    onDelete(id)
                    setIsProcessing(true);
                  }} 
                  variant={"destructive"}>
                  Sure!
                </Button>
                <Button 
                  className='w-full' 
                  variant={"outline"}
                  disabled={isProcessing}
                  onClick={() => setIsProcessing(false)}
                >
                  Cancel
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    
      {/* Show ViewerJS */}
      <div className="w-full h-auto flex justify-end pt-4 md:pt-0">
        {showPdf ? (
          <div className="w-full flex flex-col items-center space-y-4">
            <div className="w-full flex justify-end">
              <div
                className="rounded-full bg-sky-600 hover:bg-sky-400 border-2 border-sky-700 cursor-pointer py-1 px-2 flex items-center justify-center w-[150px] text-white text-sm md:text-[16px]"
                onClick={() => setShowPdf(false)}
              >
                Close Handbook
              </div>
            </div>
            <iframe
              src={formattedLink}
              className="w-full border-0 h-[750px]"
              title="PDF Viewer"
            ></iframe>
          </div>
        ) : (
          <div className="flex justify-between items-center flex-col gap-y-4">
            <div
              className="rounded-full bg-sky-600 hover:bg-sky-400 border-2 border-sky-700 cursor-pointer py-1 px-2 flex items-center justify-center w-[150px] text-white text-sm md:text-[16px]"
              onClick={() => setShowPdf(true)}
            >
              View Handbook
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Card;
