'use client'

import SearchBar from '@/components/Handbook/HBSearchBar'
import Card from '@/components/Handbook/HBCard'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { handbookSchema, handbookSchemaType, handbookSchemaTypeWithId } from '@/lib/schemas'
import { createHandbook, deleteHandbook, getAllHandbook } from '@/actions/handbook-actions'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

// Components Import
import HandbookHeader from '@/components/Handbook/HandbookHeader'
import HandbookDialog from '@/components/Handbook/HandbookDialog'

const dummyHandbook = [
  {
    id: "1",
    day: "Monday",
    title: "Introduction to Programming",
    link: "https://drive.google.com/file/d/14gO1rJypWcWjzUy7WOTY-LjNZUAyiYvJ/view",
  },
  {
    id: "2",
    day: "Tuesday",
    title: "JavaScript Basics",
    link: "https://drive.google.com/file/d/14gO1rJypWcWjzUy7WOTY-LjNZUAyiYvJ/view",
  },
  {
    id: "3",
    day: "Wednesday",
    title: "Understanding React",
    link: "https://drive.google.com/file/d/14gO1rJypWcWjzUy7WOTY-LjNZUAyiYvJ/view",
  },
  {
    id: "4",
    day: "Thursday",
    title: "Styling with CSS",
    link: "https://drive.google.com/file/d/14gO1rJypWcWjzUy7WOTY-LjNZUAyiYvJ/view",
  },
  {
    id: "5",
    day: "Friday",
    title: "Introduction to APIs",
    link: "https://drive.google.com/file/d/14gO1rJypWcWjzUy7WOTY-LjNZUAyiYvJ/view",
  },
  {
    id: "6",
    day: "Saturday",
    title: "Building a Full-Stack Application",
    link: "https://drive.google.com/file/d/14gO1rJypWcWjzUy7WOTY-LjNZUAyiYvJ/view",
  },
];

const Handbook = () => {
  // const { data: session } = useSession()
  // const router = useRouter()
  // const [dialogOpen, setDialogOpen] = useState(false)
  const [handbooks, setHandbooks] = useState(dummyHandbook)

  // // if (!session) {
  // //   router.push("/sign-in")
  // // }

  // useEffect(() => {
  //   async function getAllHandbookData() {
  //     const data = await getAllHandbook();
  //     setHandbooks(data)
  //   }

  //   getAllHandbookData()
  // }, [])

  // const form = useForm<handbookSchemaType>({
  //   resolver: zodResolver(handbookSchema),
  //   defaultValues: {
  //     day: "",
  //     title: "",
  //     link: ""
  //   }
  // })

  // async function onSubmit(values: handbookSchemaType) {
  //   try {
  //     await createHandbook(values.day, values.title, values.link)
  //     toast("Handbook created successfully")
  //     setDialogOpen(false)
  //     const updatedHandbooks = await getAllHandbook()
  //     setHandbooks(updatedHandbooks)
  //   } catch (error) {
  //     console.error(error)
  //     toast("Failed to create handbook")
  //   }
  // }

  // async function handleDelete(id: string) {
  //   try {
  //     await deleteHandbook(id)
  //     toast("Handbook deleted successfully")
  //     const updatedHandbooks = await getAllHandbook()
  //     setHandbooks(updatedHandbooks)
  //   } catch (error) {
  //     console.error(error)
  //     toast("Failed to delete handbook")
  //   }
  // }

  const handleAddHandbook = (newHandbook: { day: string, title: string; link: string }) => {
    const id = (handbooks.length + 1).toString(); // Generate ID
    setHandbooks([...handbooks, { id, ...newHandbook }]); // Tambahkan data baru
  };

  const handleDelete = (id: string) => {
    const updatedAnnouncements = handbooks.filter((item) => item.id !== id);
    setHandbooks(updatedAnnouncements);
  };

  return (
    <div className='w-full h-full flex flex-col items-center space-y-8 bg-[#0F389B]  pb-20'>
      <HandbookHeader />

      <div className='max-w-5xl w-full flex flex-col items-start'>
        <HandbookDialog onAddHandbook={handleAddHandbook} />
      </div>

      {/* <div className='bg-[#0F389B] px-20 py-20'>
        {handbooks.map((item) => (
          <Card
            key={item.id}
            HBDay={item.day}
            HBTitle={item.title}
            link={item.link}
            onDelete={() => handleDelete(item.id)}
            isAdmin={session?.user.role === "ADMIN"}
          />
        ))}
      </div> */}
    </div>
  )
}

export default Handbook