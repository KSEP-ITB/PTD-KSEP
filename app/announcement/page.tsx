"use client"

// Library Import
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'

// Auth Import
import { useSession } from 'next-auth/react'

// Assets Import
import Dice from '@/public/assets/Dice1.png'
import Sparkle from '@/public/assets/StarShining.png'

// Components Import
import AnnouncementHeader from '@/components/Announcement/AnnouncementHeader'
import AnnouncementCard from '@/components/Announcement/AnnouncementCard'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

// Schemas Import
import { announcementSchema, announcementSchemaType, announcementSchemaTypeWithId } from '@/lib/schemas'

// Actions Import
import { createAnnouncement, deleteAnnouncement, getAllAnnouncement } from '@/actions/announcement-actions'

const page = () => {
  // const { data: session, status } = useSession()
  // const [dialogOpen, setDialogOpen] = useState(false)
  // const [announcement, setAnnouncement] = useState<announcementSchemaTypeWithId[]>([])

  // useEffect(() => {
  //   async function getAllAnnouncementData() {
  //     try {
  //       const data = await getAllAnnouncement()

  //       if (data) {
  //         setAnnouncement(data)
  //       }
  //     } catch (error) {
  //       console.error("Error fetching announcements:", error)
  //     }
  //   }
  //   getAllAnnouncementData()
  // }, [])

  // const form = useForm<announcementSchemaType>({
  //   resolver: zodResolver(announcementSchema),
  //   defaultValues: {
  //     title: "",
  //     content: ""
  //   }
  // })

  // async function onSubmit(values: announcementSchemaType) {
  //   try {
  //     await createAnnouncement(values.title, values.content)
  //     toast("Successfully create announcement")
  //     setDialogOpen(false) 
  //     const updatedAnnouncements = await getAllAnnouncement()
  //     setAnnouncement(updatedAnnouncements)
  //   } catch (error) {
  //     console.log(error)
  //     toast("Failed to create announcement")
  //   }
  // }

  // async function handleDelete(id: string) {
  //   try {
  //     await deleteAnnouncement(id);
  //     toast("Announcement deleted successfully");
  //     const updatedAnnouncements = await getAllAnnouncement();
  //     setAnnouncement(updatedAnnouncements);
  //   } catch (error) {
  //     console.log(error);
  //     toast("Failed to delete announcement");
  //   }
  // }

  return (
    <div className='w-full h-full'>
      <AnnouncementHeader />

      {/* <div className='bg-[#4E2865] w-full px-4 py-8 text-white flex flex-col items-center justify-center
      '>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger>
            <Button onClick={() => setDialogOpen(true)}>
              Add Announcement
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Announcement</DialogTitle>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField 
                    control={form.control}
                    name='title'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder='Enter title...' {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField 
                    control={form.control}
                    name='content'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Content</FormLabel>
                        <FormControl>
                          <Textarea placeholder='Enter content...' {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <div className='py-2' />
                  <Button type='submit' className='w-full'>
                    Create Announcement
                  </Button>
                </form>
              </Form>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>  

    <div className='bg-[#4E2865] px-20 py-20 z-20'>
        {announcement.map((item) => {
          return (
            <AnnouncementCard
              key={item.id}
              id={item.id}
              title={item.title}
              content={item.content}
              onDelete={handleDelete}
            />
          )
        })}
      </div> */}
    </div>
  )
}

export default page
