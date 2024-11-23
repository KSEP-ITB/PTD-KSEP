'use client'

// Library Import
import React from 'react'
import { motion } from 'framer-motion'

const page = () => {
  return (
    <motion.div
      className='px-4 w-full h-[80vh] items-center justify-center bg-gradient-to-tr from-[#FF5F6D] to-[#FFC371] text-center text-white flex flex-col gap-y-4'
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      <motion.h5
        className='md:text-2xl font-bold'
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
      >
        Created By Operations KSEP 2024/2025
      </motion.h5>
      <div className='md:text-[18px] flex flex-col gap-y-2'>
        {["Atqiya Haydar Luqman", "Jessica Allen", "Naufarrel Zhafif", "Adiel Rum", "Farrel Athalla Putra", "Refki Alfarizi", "Timothy Niels Ruslim", "Muhammad Jibril Ibrahim"].map((name, index) => (
          <motion.p
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 + index * 0.2, ease: 'easeOut' }}
          >
            {name}
          </motion.p>
        ))}
      </div>
      <motion.p
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 2.3, ease: 'easeOut' }}
        className='py-2'
      >
        © Kelompok Studi Ekonomi dan Pasar Modal
      </motion.p>
    </motion.div>
  )
}

export default page
