import React from 'react'
import Image from 'next/image'
import KSEPLogo from '@/public/assets/KSEPLogo.png'
import { Instagram } from 'lucide-react';
import { Youtube } from 'lucide-react';
import { Linkedin } from 'lucide-react';
import Link from 'next/link';

const socialMediaItems = [
  {
    name: 'Instagram',
    logo: Instagram,
    path: 'https://www.instagram.com/ptd_ksepitb/' 
  },
  {
    name: 'YouTube',
    logo: Youtube,
    path: 'https://www.youtube.com/@ksepitb' 
  },
  {
    name: 'LinkedIn',
    logo: Linkedin,
    path: 'https://www.linkedin.com/company/ksepitb' 
  },
]

const Footer = () => {
  return (
    <div className='wrapper flex flex-col items-center gap-y-12 z-20'>
      <div className='flex flex-col md:flex-row items-center gap-4'>
        <Image 
          src={KSEPLogo}
          alt='Logo KSEP'
          width={48}
          height={48}
        />
        <h5 className='text-orange-gradient font-bold text-center text-[18px] md:text-2xl'>Kelompok Studi Ekonomi dan Pasar Modal</h5>
      </div>
      <div className='-my-6'>
        <Link href={"/credits"} className='underline text-center text-orange-500'>
          See Credits
        </Link>
      </div>
      <div className='flex flex-col gap-y-4 items-center'>
        <p className='text-center text-orange-gradient'>Our Social Media</p>
        <div className='flex gap-x-10 lg:gap-x-20'> 
          {socialMediaItems.map((item, index) => {
            const Icon = item.logo
            return (
              <Link key={index} href={item.path} target='_blank'>
                <Icon className='w-10 h-10 text-[#ED5126]' />
              </Link>
            )
          })}
        </div>
      </div>
      <p className='font-bold text-[#ED5126] text-center text-[16px] md:text-xl'>
        © 2024 Kelompok Studi Ekonomi dan Pasar Modal ITB. All Rights Reserved
      </p>
    </div>
  )
}

export default Footer