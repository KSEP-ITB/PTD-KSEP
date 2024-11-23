'use client'

// Library Import
import Image from "next/image"
import { motion } from "framer-motion"

// Constants
import { testimonials } from "@/lib/constants"

// Assets Import
import Title from "@/public/What Those Who Have Joined Say To Pendidikan Tingkat Dasar KSEP.png"
import Star from "@/public/STAR2.png"

const Testimoni = () => {
  return (
    <section>
      <div className='h-full bg-gradient-to-br from-[#A958A7] to-[#3E205A] flex flex-col items-center justify-center py-20 relative'>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="w-full flex flex-col items-center justify-center"
        >
          <Image 
            src={Title}
            alt="Title"
            className="pb-10 w-[80%] md:w-[80%] z-10"
          />
        </motion.div>
        <div className="w-full max-w-7xl grid md:grid-cols-3 px-4 gap-4">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1, delay: index * 0.3 }}
              className="bg-gradient-to-b from-[#edb2e5] to-[#A74899] border-[3px] rounded-2xl overflow-hidden py-4 md:py-6"
            >
              <p className="font-[700] md:text-3xl text-[#C72F11] white-stroke-text-title pl-[20px] pr-[20px]">{testimonial.name}</p>
              <p className="font-[700] text-[#FFF2B0] md:text-lg px-[18px] mt-2">{testimonial.program}</p>
              <p className="text-white font-[500] px-[18px] text-sm md:text-sm lg:text-base mt-4">&apos;{testimonial.feedback}&apos;</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimoni
