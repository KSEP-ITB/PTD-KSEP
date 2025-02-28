'use client'

// Library Import
import Image from "next/image";
import { motion } from "framer-motion";

// Assets Import
import Title from "@/public/Pendidikan Tingkat Dasar KSEP 2024.png"
import Star from "@/public/STARTEXTURES.png"
import Dadu from "@/public/DADU2.png"
import Pawn from "@/public/PAWN.png"
import Rail1 from "@/public/UlerTanggaStraight.png"
import Rail2 from "@/public/UlerTanggaStraight2.png"

const Hero = () => {
  return (
    <section>
      <div className='min-h-[675px] h-full bg-gradient-to-br from-[#ED422E] to-[#FE9110] relative overflow-hidden flex flex-col items-center justify-center'>
        <motion.p
          className="hidden w-full md:block text-white text-base md:text-xl z-20 pb-10 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          ITB’s Kelompok Studi Ekonomi dan Pasar Modal Present
        </motion.p>
        <motion.div
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="z-20 w-full flex justify-center items-center"
          >
          <Image src={Title} alt="Title" className="z-20 w-[80%] md:w-[45%]" />
        </motion.div>
        <motion.p
          className="bg-white px-4 py-2 lg:px-8 lg:py-4 rounded-full text-[#B91A19] mt-10 md:text-lg z-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Boarding Journey to Riches!
        </motion.p>
        
        {/* Star Texture */}
        <motion.div
          className="absolute bottom-0 flex z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <Image src={Star} alt="Star" className="w-full" />
        </motion.div>

        {/* Image Ornament */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="z-10 absolute left-0 top-0"
        >
          <Image src={Rail1} alt="Rail" className="w-[300px] md:w-[500px]" />
        </motion.div>
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="z-10 absolute right-0 bottom-0"
        >
          <Image src={Rail2} alt="Rail" className="w-[500px] md:w-[700px]" />
        </motion.div>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="z-10 absolute left-0 bottom-0"
        >
          <Image src={Dadu} alt="Dadu" className="w-[200px] md:w-[300px]" />
        </motion.div>
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="z-10 absolute top-20 right-0"
        >
          <Image src={Pawn} alt="Pawn" className="w-[150px] md:w-[200px]" />
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
