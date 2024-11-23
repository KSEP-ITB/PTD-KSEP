'use client'

// Library Import
import React, { useState } from 'react'

// Auth Import
import { useSession } from 'next-auth/react'

// Components Import
import HandbookHeader from '@/components/Handbook/HandbookHeader'
import HandbookCard from '@/components/Handbook/HandbookCard'
import AddHandbookDialog from '@/components/Handbook/AddHandbookDialog'


// import { useRouter } from 'next/navigation'
// import { handbookSchema, handbookSchemaType, handbookSchemaTypeWithId } from '@/lib/schemas'
// import { createHandbook, deleteHandbook, getAllHandbook } from '@/actions/handbook-actions'
// import { toast } from 'sonner'

const dummyHandbook = [
  {
    id: "1",
    day: "Monday",
    title: "Introduction to Programming",
    link: "https://drive.google.com/file/d/14gO1rJypWcWjzUy7WOTY-LjNZUAyiYvJ/view",
  },
];

const Handbook = () => {
  const { data: session } = useSession()

  // const router = useRouter()

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

      {session && session.user.role === "ADMIN" && (
        <div className='px-4 max-w-5xl w-full flex flex-col items-start'>
          <AddHandbookDialog onAddHandbook={handleAddHandbook} />
        </div>
      )}

      <div className="px-4 max-w-5xl w-full space-y-4">
        {handbooks.map((item) => (
          <HandbookCard
            key={item.id}
            title={item.title}
            day={item.day}
            link={item.link}
          />
        ))}
      </div>
    </div>
  )
}

export default Handbook