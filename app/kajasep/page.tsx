"use client";
// Library Import
import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "framer-motion";
// Components Import
import CaKSEPHeader from "@/components/CaKSEP/CaKSEPHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// Asset Import
import JoYuri from '@/public/assets/JoYuti.jpg';
// Icon Import
import { Search } from 'lucide-react';

const mockData = [
  { id: 1, name: "Naufarrel Zhafif Abhista", quota: 3, profilePicture: "/profile-picture.png" },
  { id: 2, name: "John Doe", quota: 2, profilePicture: "/profile-picture.png" },
  { id: 3, name: "Naufarrel Zhafif Abhista", quota: 3, profilePicture: "/profile-picture.png" },
  { id: 4, name: "John Doe", quota: 2, profilePicture: "/profile-picture.png" },
  { id: 5, name: "Naufarrel Zhafif Abhista", quota: 3, profilePicture: "/profile-picture.png" },
  { id: 6, name: "John Doe", quota: 2, profilePicture: "/profile-picture.png" },
  { id: 7, name: "Naufarrel Zhafif Abhista", quota: 3, profilePicture: "/profile-picture.png" },
  { id: 8, name: "John Doe", quota: 2, profilePicture: "/profile-picture.png" },
  { id: 9, name: "John Doe", quota: 2, profilePicture: "/profile-picture.png" },
  { id: 10, name: "Naufarrel Zhafif Abhista", quota: 3, profilePicture: "/profile-picture.png" },
  { id: 11, name: "Sigma Nuts", quota: 2, profilePicture: "/profile-picture.png" },
];

const KajasepPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const itemsPerPage = 6;

  const filteredData = mockData.filter((kajasep) =>
    kajasep.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const currentData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div className="w-full h-full flex flex-col items-center space-y-8 bg-[#FF5F6D]/25 pb-20">
      <CaKSEPHeader />

      {/* Search Bar */}
      <div className="px-4 max-w-5xl w-full space-y-4">
        <div className="w-full relative py-4">
          <div className="relative">
            <Input
              className="focus:ring-0 focus:ring-offset-0 px-12 py-6 bg-gradient-to-r text-white from-[#FF5F6D]/75 to-[#FFC371]/75 rounded-full border-2 border-white placeholder:text-white text-[16px] placeholder:text-[16px]"
              placeholder="Cari KaJasep"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute top-1/2 left-4 transform -translate-y-1/2 w-6 h-6 text-white" />
          </div>
        </div>

        {/* Daftar KaJasep */}
        {currentData.length > 0 ? (
          currentData.map((kajasep) => (
            <div
              key={kajasep.id}
              className="flex items-center gap-6 p-4 rounded-2xl border-2 border-white bg-gradient-to-tr from-[#FF5F6D] to-[#FFC371] transition-transform duration-300 hover:scale-105"
            >
              <Image
                src={JoYuri}
                alt={kajasep.name}
                className="h-[120px] w-[120px] rounded-full border-2 border-white object-cover"
              />
              <div className="space-y-[2px] w-full h-full flex-1">
                <h2 className="font-bold text-white text-3xl">{kajasep.name}</h2>
                <p className="text-white">Kuota: {kajasep.quota}</p>
              </div>
              <Link href={"/"}>
                <Button
                  size={"default"}
                  className="bg-white font-medium hover:bg-[#FFC371] text-[#FF6F3C] transition-all duration-300">
                  Daftar
                </Button>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center text-white text-lg">Tidak ada hasil yang ditemukan.</p>
        )}
      </div>

      {/* Pagination */}
      {filteredData.length > 0 && (
        <div className="flex justify-center mt-4">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 mx-1 rounded-full transition-all duration-300 ${
                currentPage === index + 1
                  ? "bg-[#FF5F6D] text-white border-2 border-white"
                  : "bg-white text-[#FF5F6D] border-2 border-[#FF5F6D]"
              }`}>
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default KajasepPage;

// from-[#FF5F6D]/75 to-[#FFC371]/75 