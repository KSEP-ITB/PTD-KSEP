'use client'

// Library Import
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'

// Quill Import
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'

// Lazy load React Quill
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

// Components Import
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Schemas Import
import { assignmentForStudentSchema, assignmentForStudentType } from '@/lib/schemas'

interface AddAssignmentDialogProps {
  onAddAssignment: (newAssignment: assignmentForStudentType) => void;
}

const AddAssignmentDialog = ({ onAddAssignment }: AddAssignmentDialogProps) => {
  const [dialogOpen, setDialogOpen] = useState(false)

  const form = useForm<assignmentForStudentType>({
    resolver: zodResolver(assignmentForStudentSchema),
    defaultValues: {
      day: "",
      title: "",
      description: "",
      dueDate: "",
      linkAttach: "",
    }
  })

  async function onSubmit(values: assignmentForStudentType) {
    try {
      //await createAnnouncement(values.title, values.content)
      //toast("Successfully create announcement")
      //setDialogOpen(false) 
      //const updatedAnnouncements = await getAllAnnouncement()
      //setAnnouncement(updatedAnnouncements)
      onAddAssignment({ ...values })
      form.reset() // Reset form
      setDialogOpen(false) // Tutup dialog
    } catch (error) {
      console.log(error)
      //toast("Failed to create announcement")
    }
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <Button 
            className='w-[150px] rounded-xl bg-pink-950 border-pink-700 border-2 hover:bg-pink-800' 
            asChild 
            onClick={() => setDialogOpen(true)}
          >
            <div>Add Assignment</div>
          </Button>
        </motion.div>
      </DialogTrigger>
      <DialogContent className='bg-gradient-to-r from-pink-400 to-amber-400 border-pink-700 text-white'>
        <DialogHeader>
          <DialogTitle className='text-white'>Add Assignment</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
            <FormField 
              control={form.control}
              name='day'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-white'>Day</FormLabel>
                  <FormControl>
                    <Input className='text-black' placeholder='Enter day...' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField 
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-white'>Title</FormLabel>
                  <FormControl>
                    <Input className='text-black' placeholder='Enter title...' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField 
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-white'>Description</FormLabel>
                  <FormControl>
                    <ReactQuill 
                      theme="snow"
                      value={field.value} 
                      onChange={field.onChange} 
                      className='bg-white text-black'
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField 
              control={form.control}
              name='dueDate'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-white'>dueDate</FormLabel>
                  <FormControl>
                    <Input className='text-black' placeholder='Ikutin format DD/MM/YYYY' {...field} />
                  </FormControl>
                </FormItem>
              )}
            /><FormField 
            control={form.control}
            name='linkAttach'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-white'>Link Attachment</FormLabel>
                <FormControl>
                  <Input className='text-black' placeholder='Enter link attachment' {...field} />
                </FormControl>
              </FormItem>
            )}
          />
            <div className='py-2' />
            <Button
              type='submit' 
              className='w-full bg-pink-950 border-pink-700 border-2 rounded-lg hover:bg-pink-800'
            >
              Create Assignment
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default AddAssignmentDialog