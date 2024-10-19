import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react';

interface CardProps {
  HBDay: string
  HBTitle: string
  link: string
  onDelete?: () => void
  isAdmin?: boolean
}

const Card = ({ HBDay, HBTitle, link, onDelete, isAdmin }: CardProps) => {
  return (
    <div className='border-2 rounded-2xl bg-gradient-to-tr from-[#0F389B] to-[#8CAAF4] my-[2vw] px-[4vw] py-[2vw] flex flex-col'>
      <h3 className='font-semibold text-white text-[1.5vw]'>{HBDay}</h3>
      <h1 className='font-bold text-white text-[3vw] mb-[2vw]'>{HBTitle}</h1>
      <div className='flex justify-between items-center w-full flex-col gap-y-4'>
        <Link href={link} target='_blank' className='w-full flex justify-start'>
          <Button className='bg-white text-[#0F389B] text-bold font-bold hover:bg-white/80 flex items-center gap-x-2'>
            Go To Handbook <ExternalLink className='2-4 h-4' />
          </Button>
        </Link>

        {/* Tampilkan tombol hapus hanya jika pengguna adalah admin */}
        {isAdmin && (
          <Button
            variant='destructive'
            className='text-red-600 font-semibold text-[1.5vw] ml-2'
            onClick={onDelete}
          >
            Delete
          </Button>
        )}
      </div>
    </div>
  )
}

export default Card
