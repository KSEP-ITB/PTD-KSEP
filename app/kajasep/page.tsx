"use client";
// Library Import
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
// Components Import
import CaKSEPHeader from "@/components/CaKSEP/CaKSEPHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"
// Asset Import
import JoYuri from '@/public/assets/JoYuti.jpg';
// Icon Import
import { Search } from 'lucide-react';
// Types Import
import { Kajasep } from "@/types/types";
import { getAllKajaseps } from "@/actions/kajasep-actions";
import FormApplication from "@/components/ApplicationForm";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Textarea } from "@/components/ui/textarea";

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
  const [isKaJasepDialogOpen, setIsKaJasepDialogOpen] = useState(false)
  const [isFormApplicationOpen, setIsFormApplicationOpen] = useState(false)
  const [kajasepList, setKajasepList] = useState<Kajasep[]>([])
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    async function fetchKajasep() {
      try {
        const data = await getAllKajaseps()
        if (data) {
          console.log(data)
          // @ts-ignore
          setKajasepList(data)
        } else {
          console.error("Failed to fetch Kajasep list.")
        }        
      } catch (error) {
        console.error("Error fetching Kajasep list:", error)
      }
    }

    fetchKajasep()
  }, [])

  const itemsPerPage = 6;

  const filteredData = kajasepList.filter((kajasep) =>
    kajasep.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
    });
  };

  const currentData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      message,
    };
    console.log("Form Data Submitted:", formData);
    // Tambahkan logika submit ke API di sini
    setIsFormApplicationOpen(false);
  };

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
                alt={kajasep.name ? kajasep.name : "N/A"}
                className="h-[120px] w-[120px] rounded-full border-2 border-white object-cover"
              />
              <div className="space-y-[2px] w-full h-full flex-1">
                <h2 className="font-bold text-white text-3xl">{kajasep.name}</h2>
                <p className="text-white">Kuota: {kajasep.quota}</p>
                <p className="text-white">Pendaftar: {"2"}</p>
              </div>
              <Dialog open={isKaJasepDialogOpen} onOpenChange={setIsKaJasepDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    size={"default"}
                    className="rounded-full bg-white font-medium hover:bg-white text-[#FF6F3C] transition-all duration-300">
                    Daftar
                  </Button>
                </DialogTrigger>
                <DialogContent className="p-8 border-2 border-white bg-gradient-to-br from-[#FF5F6D] to-[#FFC371] flex items-start justify-start gap-x-8 md:min-w-[800px]">
                  <Image
                    src={JoYuri}
                    alt={kajasep.name ? kajasep.name : "N/A"}
                    className="h-[240px] w-[240px] rounded-xl border-2 border-white object-cover"
                  />
                  <div className="h-full space-y-4">
                    <div className="">
                      <h2 className="font-bold text-white text-3xl">{kajasep.name}</h2>
                      <p className="text-white">Nama Panggilan</p>
                    </div>
                    <div>
                      <p className="text-white text-[18px] font-semibold">Deskripsi</p>
                      <p className="text-white text-sm">
                        {kajasep.description}
                      </p>
                    </div>
                    <div>
                      <p className="text-white text-[18px] font-semibold">Syarat</p>
                      <p className="text-white text-sm">
                        {kajasep.requirement}
                      </p>
                    </div>
                    <div>
                      <p className="text-white text-[18px] font-semibold">Kontak</p>
                      <p className="text-white text-sm">
                       ID Line :{kajasep.line} 
                      </p>
                      <p className="text-white text-sm">
                        Instagram : @{kajasep.instagram}
                      </p>
                    </div>
                    <Button 
                      className="shadow-lg bg-white hover:bg-white text-[#FF5F6D] relative bottom-0 font-medium w-[100px]"
                      onClick={() => {
                        setIsKaJasepDialogOpen(false)
                        setIsFormApplicationOpen(true)
                      }}
                    >
                      Daftar
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          ))
        ) : (
          <p className="text-center text-white text-lg">Tidak ada hasil yang ditemukan.</p>
        )}
      </div>

      <Dialog open={isFormApplicationOpen} onOpenChange={setIsFormApplicationOpen}>
        <DialogContent className="border-2 border-white bg-gradient-to-br from-[#FF5F6D] to-[#FFC371] p-6 rounded-lg">
          <form onSubmit={handleSubmit}>
            <h2 className="text-lg font-bold text-white mb-2">Form Application</h2>

            {/* Message */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">Message</label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your message"
                className="focus-visible:ring-transparent mb-4"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-2">
              <Button type="button" variant="secondary" onClick={() => setIsFormApplicationOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Submit
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

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