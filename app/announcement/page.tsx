"use client"

// Library Import
import React, { useState } from 'react'

// Auth Import
// import { useSession } from 'next-auth/react'

// Components Import
import AnnouncementHeader from '@/components/Announcement/AnnouncementHeader'
import AddAnnouncementDialog from '@/components/Announcement/AddAnnouncementDialog'
import AnnouncementCard from '@/components/Announcement/AnnouncementCard'
// import { toast } from 'sonner'

// Schemas Import
// import { announcementSchema, announcementSchemaType, announcementSchemaTypeWithId } from '@/lib/schemas'

// Actions Import
// import { createAnnouncement, deleteAnnouncement, getAllAnnouncement } from '@/actions/announcement-actions'

// Data Dummy
const dummyAnnouncements = [
  {
    id: "1",
    title: "New Feature Release",
    content: "We're excited to announce our new feature is now live!",
  },
  {
    id: "2",
    title: "Scheduled Maintenance",
    content: "Our servers will be down for maintenance on 25th Nov from 1AM to 3AM.",
  },
  {
    id: "3",
    title: "Holiday Announcement",
    content: "We will be closed on 26th Dec for the holiday season.",
  },
  {
    id: "4",
    title: "New Feature Release",
    content: "We're excited to announce our new feature is now live!",
  },
  {
    id: "5",
    title: "Scheduled Maintenance",
    content: "Our servers will be down for maintenance on 25th Nov from 1AM to 3AM.",
  },
  {
    id: "6",
    title: "Holiday Announcement",
    content: "We will be closed on 26th Dec for the holiday season.",
  },
];

const page = () => {
  const [announcements, setAnnouncements] = useState(dummyAnnouncements);

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

  const handleAddAnnouncement = (newAnnouncement: { title: string; content: string }) => {
    const id = (announcements.length + 1).toString(); // Generate ID
    setAnnouncements([...announcements, { id, ...newAnnouncement }]); // Tambahkan data baru
  };

  const handleDelete = (id: string) => {
    const updatedAnnouncements = announcements.filter((item) => item.id !== id);
    setAnnouncements(updatedAnnouncements);
  };

  return (
    <div className='w-full h-full flex flex-col items-center space-y-8 bg-[#4E2865] pb-20'>
      <AnnouncementHeader />

      <div className='max-w-5xl w-full flex flex-col items-start'>
        <AddAnnouncementDialog onAddAnnouncement={handleAddAnnouncement} />
      </div>

      <div className="max-w-5xl w-full space-y-4">
        {announcements.map((item) => (
          <AnnouncementCard
            key={item.id}
            title={item.title}
            content={item.content}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  )
}

export default page
