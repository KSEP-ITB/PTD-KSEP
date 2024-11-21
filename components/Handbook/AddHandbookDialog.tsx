'use client'

// Library Import
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'

// Components Import
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
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
import { handbookSchema, handbookSchemaType } from '@/lib/schemas'

interface AddHandbookDialogProps {
  onAddHandbook: (newHandbook: handbookSchemaType) => void;
}

const AddHandbookDialog = ({ onAddHandbook }: AddHandbookDialogProps) => {
  const [dialogOpen, setDialogOpen] = useState(false)

  const form = useForm<handbookSchemaType>({
    resolver: zodResolver(handbookSchema),
    defaultValues: {
      day: "",
      title: "",
      link: "",
    }
  })

  async function onSubmit(values: handbookSchemaType) {
    try {
      //await createAnnouncement(values.title, values.content)
      //toast("Successfully create announcement")
      //setDialogOpen(false) 
      //const updatedAnnouncements = await getAllAnnouncement()
      //setAnnouncement(updatedAnnouncements)
      onAddHandbook({ ...values })
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
            asChild
            className='w-[150px] rounded-xl bg-sky-950 border-sky-700 border-2 hover:bg-sky-800' 
            onClick={() => setDialogOpen(true)}
          >
            <div>Add Handbook</div>
          </Button>
        </motion.div>
      </DialogTrigger>
      <DialogContent className='bg-gradient-to-r from-[#0F389B] to-[#8CAAF4] border-sky-700 text-white'>
        <DialogHeader>
          <DialogTitle className='text-white'>Add Handbook</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
            <FormItem>
              <FormLabel className='text-white'>Day</FormLabel>
              <FormControl>
                <Input 
                  className='focus-visible:ring-transparent  text-black'
                  placeholder='Masukkan hari terbit buku pegangan' {...form.register('day')} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
            <FormItem>
              <FormLabel className='text-white'>Title</FormLabel>
              <FormControl>
                <Input 
                  className='focus-visible:ring-transparent  text-black'
                  placeholder='Masukkan judul buku pegangan' {...form.register('title')} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
            <FormItem>
              <FormLabel className='text-white'>Link</FormLabel>
              <FormControl>
                <Input
                  className='focus-visible:ring-transparent  text-black'
                  placeholder='Tautan harus dari file PDF google drive' {...form.  register('link')} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
            <div className='py-2' />
            <Button 
              type='submit' 
              className='w-full bg-sky-950 border-sky-700 border-2 rounded-lg hover:bg-sky-800'
            >
              Create Handbook
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default AddHandbookDialog