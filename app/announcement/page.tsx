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
    title: "🚀 Launcing PTD Website 🚀",
    content: "Hai-Hai Ca-KSEP ^_^ <br /> Kami dengan bangga mengumumkan bahwa website PTD telah resmi diluncurkan! Website ini akan menjadi tempat informasi tugas dan buku pegangan kalian. Jangan lupa untuk selalu cek website ini ya! <br /> <br /> Untuk masuk ke akun kalian, silahkan gunakan format <br /> Username : caksep{No. Ca KSEP} <br /> Password : P@55word_{No. Ca-KSEP} <br/> <br /> Apabila menemukan kendala atau kesalahan sistem (Bug), mohon lapor ke ID Line : atqeeya <br /> <br /> Terima kasih! 🎉",
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

      <div className='px-4 max-w-5xl w-full flex flex-col items-start'>
        <AddAnnouncementDialog onAddAnnouncement={handleAddAnnouncement} />
      </div>

      <div className="px-4 max-w-5xl w-full space-y-4">
        {announcements
          .slice()
          .reverse()
          .map((item) => (
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
