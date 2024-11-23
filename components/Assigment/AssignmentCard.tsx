"use client"

import React, { useState, useRef } from 'react'
import { motion, useInView } from "framer-motion"
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'

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
      toast('Failed to delete assignment')
    }
  }

  const handleSubmit = async () => {
    if (!link) {
      toast('Please provide a link')
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
        <button
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
          onClick={handleDelete}
        >
          Delete Assignment
        </button>
      )}
    </motion.div>
  )
}

export default AssignmentCard
