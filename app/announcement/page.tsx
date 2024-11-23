"use client"

// Library Import
import React, { useEffect, useState } from 'react'

// Auth Import
import { useSession } from 'next-auth/react'

// Components Import
import AnnouncementHeader from '@/components/Announcement/AnnouncementHeader'
import AddAnnouncementDialog from '@/components/Announcement/AddAnnouncementDialog'
import AnnouncementCard from '@/components/Announcement/AnnouncementCard'

// Schemas Import
import { announcementSchemaTypeWithId } from '@/lib/schemas'

// Actions Import
import { createAnnouncement, deleteAnnouncement, getAllAnnouncement } from '@/actions/announcement-actions'


const page = () => {
  const { data: session } = useSession()

  const [announcements, setAnnouncements] = useState<announcementSchemaTypeWithId[]>([]);

  useEffect(() => {
    async function getAllAnnouncementData() {
      try {
        const data = await getAllAnnouncement()
        if (data) {
          setAnnouncements(data)
        }
      } catch (error) {
        console.error("Error fetching announcements:", error)
      }
    }
    getAllAnnouncementData()
  }, [])

  const handleDelete = async (id: string) => {
    try {
      await deleteAnnouncement(id);
      setAnnouncements((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting announcement:", error);
    }
  };

  const handleAddAnnouncement = async (newAnnouncement: {
    title: string;
    content: string;
  }) => {
    try {
      const addedAnnouncement = await createAnnouncement(
        newAnnouncement.title,
        newAnnouncement.content
      );
      setAnnouncements((prev) => [...prev, addedAnnouncement]);
    } catch (error) {
      console.error("Error adding announcement:", error);
    }
  };

  return (
    <div className='w-full h-full flex flex-col items-center space-y-8 bg-[#4E2865] pb-20'>
      <AnnouncementHeader />

      { session && session.user.role === 'ADMIN' && (
        <div className='px-4 max-w-5xl w-full flex flex-col items-start'>
          <AddAnnouncementDialog onAddAnnouncement={handleAddAnnouncement} />
        </div>
      )}

      <div className="px-4 max-w-5xl w-full space-y-4">
        {announcements && announcements
          .slice()
          .reverse()
          .map((item) => (
            <AnnouncementCard
              key={item.id}
              id={item.id}
              title={item.title}
              content={item.content}
              onDelete={handleDelete}
            />
        ))}
        {announcements.length === 0 && (
          <p className='w-full text-center text-white'>
            No announcements to show.
          </p>
        )}
      </div>
    </div>
  )
}

export default page
