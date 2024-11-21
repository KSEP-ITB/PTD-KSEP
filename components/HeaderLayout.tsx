// Library Import
import React from 'react'
import Image, { StaticImageData } from 'next/image'

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
        <Image
          key={index}
          src={image.src}
          alt={image.alt}
          className={`absolute ${image.className}`}
          width={image.width}
          height={image.height}
        />
      ))}
      
      {/* Title */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <h1
          className={`text-3xl md:text-8xl font-extrabold bg-gradient-to-r text-transparent bg-clip-text ${titleColor}`}
        >
          {title}
        </h1>
      </div>
    </div>
  )
}

export default HeaderLayout
