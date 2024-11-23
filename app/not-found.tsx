'use client'

// Library Import
import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

// Components Import
import { Button } from '@/components/ui/button'

const Loading = () => {
  return (
    <motion.div
      className="px-4 w-full h-[80vh] flex flex-col items-center justify-center bg-gradient-to-tr from-[#FF5F6D] to-[#FFC371] text-center md:text-start text-white space-y-4 md:space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
    >
      {/* Heading Animation */}
      <motion.h1
        className="text-xl md:text-3xl"
        initial={{ scale: 0.5, y: -50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <span className="font-bold text-4xl md:text-5xl">404</span>
        <br />
        Oops! The page you're looking for doesn't exist.
      </motion.h1>

      {/* Button Animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          delay: 0.8,
          ease: 'easeOut',
        }}
      >
        <Button
          className="bg-white rounded-full text-orange-500 hover:bg-white/80 font-medium shadow-lg transform hover:scale-105 transition-transform duration-300"
        >
          <Link href={"/"}>
            Go Back Home
          </Link>
        </Button>
      </motion.div>

      {/* Floating Effect */}
      <motion.div
        className=" text-white/50 text-sm pt-6"
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'easeInOut',
        }}
      >
        Created with NextJS, TailwindCSS, ShadcnUI, and Framer Motion
      </motion.div>
    </motion.div>
  )
}

export default Loading
