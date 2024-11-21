"use client"

// Library Import
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'

// Auth Import
import { useSession } from 'next-auth/react'

// Assets Import
import Dice from '@/app/assets/Dice1.png'
import Sparkle from '@/app/assets/StarShining.png'

// Components Import
import AnnouncementCard from '@/components/Announcement/page'
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
  const { data: session, status } = useSession()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [announcement, setAnnouncement] = useState<announcementSchemaTypeWithId[]>([])

  useEffect(() => {
    async function getAllAnnouncementData() {
      try {
        const data = await getAllAnnouncement()

        if (data) {
          setAnnouncement(data)
        }
      } catch (error) {
        console.error("Error fetching announcements:", error)
      }
    }
    getAllAnnouncementData()
  }, [])

  const form = useForm<announcementSchemaType>({
    resolver: zodResolver(announcementSchema),
    defaultValues: {
      title: "",
      content: ""
    }
  })

  async function onSubmit(values: announcementSchemaType) {
    try {
      await createAnnouncement(values.title, values.content)
      toast("Successfully create announcement")
      setDialogOpen(false) 
      const updatedAnnouncements = await getAllAnnouncement()
      setAnnouncement(updatedAnnouncements)
    } catch (error) {
      console.log(error)
      toast("Failed to create announcement")
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteAnnouncement(id);
      toast("Announcement deleted successfully");
      const updatedAnnouncements = await getAllAnnouncement();
      setAnnouncement(updatedAnnouncements);
    } catch (error) {
      console.log(error);
      toast("Failed to delete announcement");
    }
  }

  return (
    <div className='w-full h-full overflow-clip'>
      <div className='relative flex bg-gradient-to-r from-[#A958A7] to-[#3E205A] items-center justify-center h-[200px] md:h-[275px]'>
        <Image 
        src={Dice}
        width={368}
        alt='dice'
        className='absolute -left-[250px] md:-left-[130px] top-[0px] md:top-[60px] w-100 z-10 '
        />
        <h1 className='relative font-sans font-extrabold text-3xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-[#ED3633] to-[#EF7219] border-white white-stroke-text text-center'>ANNOUNCEMENT</h1>
        <Image
        src={Sparkle}
        width = {350}
        alt = 'sparkle'
        className='absolute -top-[170px] -right-[140px] md:-right-[100px] md:-top-[100px]'
        />
      </div>

      <div className='bg-[#4E2865] w-full px-4 py-8 text-white flex flex-col items-center justify-center
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
      </div>
    </div>
  )
}

export default page
