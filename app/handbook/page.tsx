'use client'

// Library Import
import React, { useEffect, useState } from 'react'

// Auth Import
import { useSession } from 'next-auth/react'

// Components Import
import HandbookHeader from '@/components/Handbook/HandbookHeader'
import HandbookCard from '@/components/Handbook/HandbookCard'
import AddHandbookDialog from '@/components/Handbook/AddHandbookDialog'

// Schemas Import
import { handbookSchemaTypeWithId } from '@/lib/schemas'

// Actions Import
import { createHandbook, deleteHandbook, getAllHandbook } from '@/actions/handbook-actions'

const Handbook = () => {
  const { data: session } = useSession()

  const [handbooks, setHandbooks] = useState<handbookSchemaTypeWithId[]>([])

  useEffect(() => {
    async function fetchHandbooks() {
      try {
        const data = await getAllHandbook();
        setHandbooks(data);
      } catch (error) {
        console.error("Error fetching handbooks:", error);
      }
    }

    fetchHandbooks();
  }, []);

  const handleAddHandbook = async (newHandbook: { day: string; title: string; link: string }) => {
    try {
      const addedHandbook = await createHandbook(newHandbook.day, newHandbook.title, newHandbook.link);
      setHandbooks((prev) => [...prev, addedHandbook]);
    } catch (error) {
      console.error("Error adding handbook:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteHandbook(id);
      setHandbooks((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting handbook:", error);
    }
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
        {handbooks && handbooks.map((item) => (
          <HandbookCard
            id={item.id}
            key={item.id}
            title={item.title}
            day={item.day}
            link={item.link}
            onDelete={handleDelete}
          />
        ))}
        {handbooks.length === 0 && (
          <p className='w-full text-center text-white text-xl'>No handbooks to show.</p>
        )}
      </div>
    </div>
  )
}

export default Handbook