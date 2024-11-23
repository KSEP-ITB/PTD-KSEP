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
import { announcementSchema, announcementSchemaType } from '@/lib/schemas'

interface AddAnnouncementDialogProps {
  onAddAnnouncement: (newAnnouncement: announcementSchemaType) => void;
}

const AddAnnouncementDialog = ({ onAddAnnouncement }: AddAnnouncementDialogProps) => {
  const [dialogOpen, setDialogOpen] = useState(false)

  const form = useForm<announcementSchemaType>({
    resolver: zodResolver(announcementSchema),
    defaultValues: {
      title: "",
      content: ""
    }
  })

  async function onSubmit(values: announcementSchemaType) {
    try {
      onAddAnnouncement({ ...values })
      form.reset()
      setDialogOpen(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <Button 
            className='w-[150px] rounded-xl bg-fuchsia-950 border-fuchsia-700 border-2 hover:bg-fuchsia-800' 
            onClick={() => setDialogOpen(true)}
          >
            Add Announcement
          </Button>
        </motion.div>
      </DialogTrigger>
      <DialogContent className='bg-gradient-to-r from-[#7E1E8E] to-[#4A176A] border-purple-700 text-white'>
        <DialogHeader>
          <DialogTitle className='text-white'>
            Add Announcement
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
            <FormField 
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-white'>Title</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder='Masukkan judul pengumuman' 
                      {...field} 
                      className='focus-visible:ring-0 text-black'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField 
              control={form.control}
              name='content'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-white'>Content</FormLabel>
                  <FormControl>
                    <ReactQuill 
                      theme="snow"
                      value={field.value} 
                      onChange={field.onChange} 
                      className='bg-white text-black'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='py-2' />
            <Button 
              type='submit' 
              className='w-full bg-fuchsia-950 border-fuchsia-700 border-2 rounded-lg hover:bg-fuchsia-800'
            >
              Create Announcement
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
 
  )
}

export default AddAnnouncementDialog