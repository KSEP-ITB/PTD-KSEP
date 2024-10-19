"use client"

import { deleteAssigmentForStudent } from '@/actions/assigment-actions'
import { createStudentAssigment, getStudentAssigmentByAssigmentIdAndUserId } from '@/actions/assigment-actions'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '../ui/button'
import { useState, useEffect } from 'react'
import Link from 'next/link'

interface AssignmentCardProps {
  id: string // Tambahkan id untuk menghapus tugas
  day: string
  title: string
  dueDate: string
  description: string
  onDelete: (id: string) => void // Callback untuk penghapusan tugas
}

const AssignmentCard = ({ id, day, title, description, dueDate, onDelete }: AssignmentCardProps) => {
  const { data: session } = useSession()
  const [link, setLink] = useState<string>('')
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false) // State baru untuk melacak status pengiriman

  useEffect(() => {
    const checkSubmission = async () => {
      if (session?.user.id) {
        const hasSubmitted = await getStudentAssigmentByAssigmentIdAndUserId(id, session.user.id);
        setIsSubmitted(hasSubmitted); // Atur status pengiriman
      }
    };
    checkSubmission();
  }, [id, session]);

  const handleDelete = async () => {
    try {
      await deleteAssigmentForStudent(id)
      toast('Assignment deleted successfully')
      onDelete(id) // Panggil callback untuk menghapus dari daftar
      setIsOpen(false)
    } catch (error) {
      toast('Failed to delete assignment')
    }
  }

  const handleSubmit = async () => {
    if (!link) {
      toast('Please provide a link')
      return
    }

    try {
      await createStudentAssigment(session?.user.id as string, id, link)
      toast('Assignment submitted successfully')
      setLink('') // Reset input setelah submit
      setIsSubmitted(true) // Set status pengiriman menjadi true
    } catch (error) {
      toast('Failed to submit assignment')
    }
  }

  return (
    <div className="rounded-xl bg-gradient-to-r from-[#E84756] to-[#A958A7] p-6 text-white shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="mb-1">Day {day}</p>
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="text-sm">Due Date: {dueDate}</p>
        </div>
        <div className="flex space-x-2">
          {session?.user.role === "USER" && (
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger>
                <Button onClick={() => setIsOpen(true)} disabled={isSubmitted}> {/* Nonaktifkan tombol jika sudah disubmit */}
                  Submit
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Submit for {title} Task</DialogTitle>
                  <DialogDescription>
                    Upload your assignment by providing a link.
                  </DialogDescription>
                </DialogHeader>
                {/* Input untuk upload link */}
                <input
                  type="text"
                  placeholder="Enter the link"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  className="w-full p-2 mt-4 text-black rounded-md"
                />
                <Button onClick={handleSubmit} className="mt-4" disabled={isSubmitted}> {/* Nonaktifkan tombol jika sudah disubmit */}
                  Submit Link
                </Button>
              </DialogContent>
            </Dialog>
          )}
          {session?.user.role === "ADMIN" && (
            <div>
              <button
                onClick={handleDelete}
                className="rounded-lg bg-red-600 px-4 py-2 text-white"
              >
                Delete
              </button>
              <Link href={`/assignments/${id}`}>
                <Button>
                  See Responden
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
      <p className='py-2'>
        {description}
      </p>
    </div>
  )
}

export default AssignmentCard
