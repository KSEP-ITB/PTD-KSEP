"use client";

// Library Import
import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

// Components Importa
import { Button } from "../ui/button";

interface CardProps {
  day: string;
  title: string;
  link: string;
}

const Card = ({ day, title, link }: CardProps) => {
  const [showPdf, setShowPdf] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const formattedLink = link.replace("/view", "/preview");

  return (
    <motion.div 
      ref={ref}
      className="border-2 rounded-2xl w-full bg-gradient-to-tr from-[#0F389B] to-[#8CAAF4] p-4 border-white"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, ease: "easeInOut" }} 
    >
      <div className='font-bold text-lg text-white'>{day}</div>
      <div className="overflow-x-auto text-white">
        {title}
      </div>

      {/* Show ViewerJS */}
      <div className="w-full h-auto flex justify-end">
        {showPdf ? (
          <div className="w-full flex flex-col items-center space-y-4">
            <div className="w-full flex justify-end">
              <div
                className="rounded-full bg-sky-600 hover:bg-sky-400 border-2 border-sky-700 cursor-pointer py-1 px-2 flex items-center justify-center w-[150px] text-white"
                onClick={() => setShowPdf(false)}
              >
                Close Handbook
              </div>
            </div>
            <iframe
              src={formattedLink}
              className="w-full border-0 h-[750px]"
              title="PDF Viewer"
            ></iframe>
          </div>
        ) : (
          <div className="flex justify-between items-center flex-col gap-y-4">
            <div
              className="rounded-full bg-sky-600 hover:bg-sky-400 border-2 border-sky-700 cursor-pointer py-1 px-2 flex items-center justify-center w-[150px] text-white"
              onClick={() => setShowPdf(true)}
            >
              View Handbook
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Card;
