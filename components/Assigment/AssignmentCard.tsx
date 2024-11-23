"use client"

// Library Import
import React, { useState, useRef, useEffect } from 'react'
import { motion, useInView } from "framer-motion"
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'

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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'

// Schema Import
import { studentAssignmentSchema, studentAssignmentType } from '@/lib/schemas'
import { createStudentAssignment, getStudentAssignmentByAssignmentIdAndUserId } from '@/actions/assigment-actions'

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
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogDeleteOpen, setDialogDeleteOpen] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const form = useForm<studentAssignmentType>({
    resolver: zodResolver(studentAssignmentSchema),
    defaultValues: {
      link: '',
    }
  })

  useEffect(() => {
    const checkSubmission = async () => {
      if (session?.user.id) {
        const hasSubmitted = await getStudentAssignmentByAssignmentIdAndUserId(id, session.user.id)

        if (hasSubmitted) {
          setIsSubmitted(hasSubmitted)
        }
      }
    }
    checkSubmission()
  }, [id, session])

  const handleSubmitSubmission = async (data: studentAssignmentType) => {
    console.log("Submitting assignment:", data.link);
  
    try {
      setIsProcessing(true);
  
      if (!session?.user?.id) {
        throw new Error("User is not authenticated.");
      }
  
      const response = await createStudentAssignment(
        session.user.id, 
        id,                       
        data.link
      );
  
      console.log("Assignment submitted successfully:", response);
      setIsProcessing(false);
      setDialogOpen(false);
    } catch (error) {
      console.error("Failed to submit assignment:", error);
      setIsProcessing(false);
    }
  };

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
          <p className="text-sm text-white font-light">Due Date: {dueDate}</p>
        </div>
      </div>
      <div
        className="overflow-x-auto text-white pt-2 md:pt-4"
        dangerouslySetInnerHTML={{ __html: description }}
      ></div>
      {linkAttach && (
        <Link href={linkAttach} target='_blank' className="text-white underline">
          <Button size={"sm"} className='mt-4 bg-amber-500 hover:bg-amber-400 rounded-full border-2 border-amber-700'>
            See Attatchment
          </Button>
        </Link>
      )}
      {session && session.user.role === "ADMIN" && (
        <div className='w-full flex justify-end'>
          <Link href={`assignments/${id}`}>
            <Button className='bg-sky-500 hover:bg-sky-400 rounded-full border-2 border-sky-700 text-white'>
              View Submission
            </Button>
          </Link>
        </div>
      )}
      {session && session.user.role === "USER" && (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <div className='w-full flex justify-end'>
              <Button 
                className='mt-4 bg-sky-500 hover:bg-sky-400 rounded-full border-2 border-sky-700 text-white px-4 py-2 ' 
                disabled={isSubmitted}
              >
                Submit Assignment
              </Button>
            </div>
          </DialogTrigger>
          <DialogContent className='bg-gradient-to-r from-[#FFCDE6] to-[#FFEFC7]'>
            <DialogHeader>
              <DialogTitle className='bg-gradient-to-r from-[#FF6B6B] to-[#FFB56B] text-transparent bg-clip-text'>
                Submission Form
              </DialogTitle>
              <DialogDescription>
                You can only submit once
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmitSubmission)}>
                  <FormItem>
                    <FormLabel>Submission Link</FormLabel>
                    <FormControl>
                      <Input 
                        type="text"
                        placeholder="Enter your submission link"
                        className="focus-visible:ring-transparent" {...form.register('link')} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                <div className="py-2" />
                <Button
                  type="submit"
                  className="w-full bg-orange-400 hover:bg-orange-300"
                  variant={"default"}
                >
                  Submit My Assignment
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      )}
      {session && session.user.role === "ADMIN" && (
        <Dialog open={dialogDeleteOpen} onOpenChange={setDialogDeleteOpen}>
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
                onClick={() => { setIsProcessing(false); setDialogDeleteOpen(false) }} 
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
