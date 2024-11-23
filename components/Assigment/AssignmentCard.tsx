"use client"

// Library Import
import React, { useState, useRef } from 'react'
import { motion, useInView } from "framer-motion"
import Link from 'next/link'

// Auth Import
import { useSession } from 'next-auth/react'

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

interface AssignmentCardProps {
  id: string 
  day: string
  title: string
  dueDate: string
  description: string
  onDelete: (id: string) => void 
  linkAttach?: string | undefined | null
}

const AssignmentCard = ({ id, day, title, description, dueDate, onDelete, linkAttach }: AssignmentCardProps) => {
  const { data: session } = useSession()
  
  const [isProcessing, setIsProcessing] = useState(false); 
  const [link, setLink] = useState<string>('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // useEffect(() => {
  //   const checkSubmission = async () => {
  //     if (session?.user.id) {
  //       const hasSubmitted = await getStudentAssigmentByAssigmentIdAndUserId(id, session.user.id)
  //       setIsSubmitted(hasSubmitted)
  //     }
  //   }
  //   checkSubmission()
  // }, [id, session])

  const handleDelete = async () => {
    try {
      // await deleteAssigmentForStudent(id)
      // toast('Assignment deleted successfully')
      // onDelete(id)
    } catch (error) {
    }
  }

  const handleSubmit = async () => {
    if (!link) {
      return
    }

    // try {
    //   await createStudentAssigment(session?.user.id as string, id, link)
    //   toast('Assignment submitted successfully')
    //   setLink('')
    //   setIsSubmitted(true)
    // } catch (error) {
    //   toast('Failed to submit assignment')
    // }
  }

  return (
    <motion.div
      ref={ref}
      className="bg-gradient-to-br from-[#E84756] to-[#A958A7] border-2 rounded-2xl w-full p-6 border-white shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, ease: "easeInOut" }} 
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="mb-1 text-white font-semibold">Day {day}</p>
          <h2 className="text-xl md:text-2xl font-bold text-white">{title}</h2>
          {/* <p className="text-sm text-white font-light">Due Date: {dueDate}</p> */}
        </div>
      </div>
      <div
        className="overflow-x-auto text-white pt-2 md:pt-4"
        dangerouslySetInnerHTML={{ __html: description }}
      ></div>
      {linkAttach && (
        <Link href={linkAttach} target='_blank' className="text-blue-300 underline">
          {linkAttach}
        </Link>
      )}
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
                onClick={() => setIsProcessing(false)} 
              >
                Cancel
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </motion.div>
  )
}

export default AssignmentCard
