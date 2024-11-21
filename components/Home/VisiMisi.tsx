'use client'

// Library Import
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Assets Import
import WhatIs from "@/public/What is Pendidikan Tingkat Dasar KSEP.png";
import Visi from "@/public/Visi.png";
import Misi from "@/public/Misi.png";
import Card from "@/public/CARD1.png";
import Dadu from "@/public/DADU1.png";

const VisiMisi = () => {
  // Refs for tracking sections
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  return (
    <section ref={sectionRef}>
      <div className="h-full bg-gradient-to-br from-[#F9AFB6] to-[#FFEFC7] flex flex-col items-center justify-center relative overflow-hidden">
        {/* Background Elements */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="absolute left-0 z-0 top-0"
        >
          <Image src={Card} alt="Card" width={300} height={300} />
        </motion.div>
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="absolute right-0 z-0 bottom-0"
        >
          <Image src={Dadu} alt="Dadu" width={250} height={250} />
        </motion.div>

        {/* Content Section */}
        <div className="gap-5 pt-20 relative w-full flex flex-col items-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex flex-col px-10 md:pr-16"
          >
            <Image src={WhatIs} alt="Title" width={400} height={100} className="z-10" />
            <p className="text-[#3E205A] p-5 bg-white/60 rounded-lg mt-5">
              Pendidikan Tingkat Dasar KSEP ITB is a place to learn about the world of economics and
              capital markets as well as a place for applicants to join and fulfill the profiles
              held by KSEP ITB
            </p>
          </motion.div>
        </div>

        {/* Visi & Misi Section */}
        <div className="grid md:grid-cols-2 pb-32 gap-10 px-10 pt-20 h-full">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="w-full h-full"
          >
            <div className="relative h-full">
              <p className="h-full text-white font-[500] bg-gradient-to-b from-[#3E205A] to-[#E84756] p-5 pt-8 border-solid border-white border-[6px] rounded-3xl overflow-hidden shadow-2xl">
                "PTD KSEP ITB 2024 sebagai penumbuh pembelajar ekonomi dan pasar modal yang
                berkualitas dan mampu mengedepankan kebersamaan serta kekeluargaan.”
              </p>
              <Image
                src={Visi}
                alt="Visi"
                className="absolute -top-10 left-0 w-[150px]"
                width={150}
                height={150}
              />
            </div>
          </motion.div>
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="w-full h-full"
          >
            <div className="relative h-full">
              <p className="h-full text-white font-[500] bg-gradient-to-b from-[#3E205A] to-[#E84756] p-5 pt-8 border-solid border-white border-[6px] rounded-3xl overflow-hidden shadow-2xl">
                1. Melahirkan pembelajar ekonomi dan pasar modal, <br />
                2. Mengembangkan peserta yang berkualitas melalui potensinya, dan <br />
                3. Mengenalkan kekeluargaan dan kaderisasi yang adil kepada pesertanya. <br />
              </p>
              <Image
                src={Misi}
                alt="Misi"
                className="absolute -top-10 left-0 w-[150px]"
                width={150}
                height={150}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VisiMisi;
