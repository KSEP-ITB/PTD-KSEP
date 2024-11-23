'use client'

// Library Import
import React from 'react'
import Image, { StaticImageData } from 'next/image'
import { motion } from 'framer-motion'

const HeaderLayout = ({ 
  background, 
  title, 
  titleColor, 
  images 
}:{
  background: string
  title: string
  titleColor: string
  images: {
    src: StaticImageData
    alt: string
    className: string
    width: number
    height: number
  }[]
}) => {
  return (
    <div className={`relative h-48 md:h-[275px] w-full ${background} overflow-hidden`}>
      {/* Background Images */}
      {images.map((image, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: index * 0.2 }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            className={`absolute ${image.className}`}
            width={image.width}
            height={image.height}
          />
        </motion.div>
      ))}
      
      {/* Title */}
      <motion.div
        className="relative z-10 flex h-full items-center justify-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1
          className={`text-3xl md:text-7xl font-extrabold bg-gradient-to-r text-transparent bg-clip-text  ${titleColor}`}
        >
          {title}
        </h1>
      </motion.div>
    </div>
  )
}

export default HeaderLayout
