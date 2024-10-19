"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Dice from '@/app/assets/Dice1.png'
import Sparkle from '@/app/assets/StarShining.png'
import AnnouncementCard from '@/components/AnnouncementCard/page'
import { useSession } from 'next-auth/react'
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
import { useForm } from 'react-hook-form'
import { announcementSchema, announcementSchemaType, announcementSchemaTypeWithId } from '@/lib/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Textarea } from '@/components/ui/textarea'
import { createAnnouncement, deleteAnnouncement, getAllAnnouncement } from '@/actions/announcement-actions'
import { toast } from 'sonner'

type Data = {
  title: string;
  content: string;
};

const Data = [
  {
    title: "New Product Release Announcement",
    content: "We are excited to announce the release of our latest product, which offers innovative solutions for your business."
  },
  {
    title: "💸 𝐌𝐚𝐫𝐤𝐞𝐭 𝐑𝐞𝐯𝐢𝐞𝐰 : 𝐒𝐢𝐱-𝐌𝐨𝐧𝐭𝐡 𝐌𝐚𝐫𝐤𝐞𝐭 𝐑𝐞𝐜𝐚𝐩 💸",
    content: "Haloo massa KSEP👋 Udah lama nih kita ga market review, tentunya kalian semua butuh informasi market buat prospek kedepannya biar porto makin ijo ga sihh🤑🤑 Karena itu, RnCD KSEP bakal ngadain ✨ 𝐌𝐚𝐫𝐤𝐞𝐭 𝐑𝐞𝐯𝐢𝐞𝐰✨ yang mau ikut bisa cek details di bawah ini yaa‼️ 🗓️ : Kamis, 26 September 2024 ⏱️ : 18.45 - 21.00 WIB 📍 : bit.ly/SekreOnline2425 Save the date and langsung aja join Market Review by RnCD yaa biar kita bisa saling share ilmu disana via link RSVP ini, https://bit.ly/MarketReviewNomor1 https://bit.ly/MarketReviewNomor1 https://bit.ly/MarketReviewNomor1🥰🥰 see u there massa KSEP‼️ @All"
  }
]

const page = () => {
  const { data: session, status } = useSession()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [announcement, setAnnouncement] = useState<announcementSchemaTypeWithId[]>([])

  useEffect(() => {
    async function getAllAnnouncementData() {
      try {
        const data = await getAllAnnouncement()
        setAnnouncement(data)
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

      {/* ADMIN ONLY */}
      {session?.user.role === "ADMIN" && (
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
      )}

<div className='bg-[#4E2865] px-20 py-20 z-20'>
        {announcement.map((item) => {
          return (
            <AnnouncementCard
              key={item.id} // Use the ID as the key
              id={item.id} // Pass the id to the card
              title={item.title}
              content={item.content}
              onDelete={handleDelete} // Pass the delete handler
            />
          )
        })}
      </div>
    </div>
  )
}

export default page
