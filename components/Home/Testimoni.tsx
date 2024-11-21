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
            className="pb-10 w-[80%] md:w-[70%] z-10"
          />
        </motion.div>
        <div className="grid md:grid-cols-3 xl:gap-10 xl:px-20 z-10 px-10 gap-5">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1, delay: index * 0.3 }}
              className="bg-gradient-to-b from-[#F5C3EE] to-[#A74899] border-[3px] rounded-2xl overflow-hidden py-10 px-2"
            >
              <p className="font-[700] text-3xl text-[#C72F11] white-stroke-text-title pl-[20px] pr-[20px]">{testimonial.name}</p>
              <p className="font-[700] text-[#FFF2B0] text-lg px-[18px] mt-2">{testimonial.program}</p>
              <p className="text-white font-[500] px-[18px] md:text-sm lg:text-base mt-4">&apos;{testimonial.feedback}&apos;</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimoni
