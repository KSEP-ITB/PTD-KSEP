"use client";

import React, { useState } from "react";
import ProfilePage from "@/components/CaKSEP/CaKSEPProfile";
import Popup from "@/components/CaKSEP/CaKSEPPopUp";
import CaKSEPHeader from "@/components/CaKSEP/CaKSEPHeader";

const mockData = [
  { id: 1, name: "Naufarrel Zhafif Abhista", quota: 3, profilePicture: "/profile-picture.png" },
  { id: 2, name: "John Doe", quota: 2, profilePicture: "/profile-picture.png" },
  { id: 3, name: "Naufarrel Zhafif Abhista", quota: 3, profilePicture: "/profile-picture.png" },
  { id: 4, name: "John Doe", quota: 2, profilePicture: "/profile-picture.png" },
  { id: 5, name: "Naufarrel Zhafif Abhista", quota: 3, profilePicture: "/profile-picture.png" },
  { id: 6, name: "John Doe", quota: 2, profilePicture: "/profile-picture.png" },
  { id: 7, name: "Naufarrel Zhafif Abhista", quota: 3, profilePicture: "/profile-picture.png" },
  { id: 8, name: "John Doe", quota: 2, profilePicture: "/profile-picture.png" },
];

const KajasepPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedKajasep, setSelectedKajasep] = useState<any>(null);
  const [showPopup, setShowPopup] = useState(false);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(mockData.length / itemsPerPage);

  const handlePageChange = (page: number) => setCurrentPage(page);

  const handleDaftar = (kajasep: any) => setSelectedKajasep(kajasep);

  const handlePopupSubmit = () => {
    setShowPopup(false);
    setSelectedKajasep(null);
  };

  const currentData = mockData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  if (selectedKajasep && !showPopup) {
    return <ProfilePage data={selectedKajasep} onDaftar={() => setShowPopup(true)} onBack={() => setSelectedKajasep(null)} />;
  }

  return (
    <div className="w-full h-full flex flex-col items-center space-y-8 bg-gradient-to-b from-[#FFF5E4] to-[#FFBD59] pb-20">
      <CaKSEPHeader />
      <div className="grid grid-cols-1 gap-4">
        {currentData.map((kajasep) => (
          <div
            key={kajasep.id}
            className="flex items-center w-full max-w-xl mx-auto p-6 rounded-lg shadow-lg bg-gradient-to-r from-[#FF9F43] to-[#FF6F3C]">
            <img src={kajasep.profilePicture} alt={kajasep.name} className="w-16 h-16 rounded-full mr-6 border-2 border-white" />
            <div className="flex-1">
              <h2 className="font-bold text-white text-lg">{kajasep.name}</h2>
              <p className="text-white text-sm">Kuota: {kajasep.quota}</p>
            </div>
            <button
              onClick={() => handleDaftar(kajasep)}
              className="px-4 py-2 rounded font-bold shadow-md bg-white text-[#FF6F3C]">
              Daftar
            </button>
          </div>
        ))}
      </div>
      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 mx-1 rounded ${
              currentPage === index + 1 ? "bg-[#FF9F43] text-white" : "bg-white text-[#FF6F3C] border border-[#FF9F43]"
            }`}>
            {index + 1}
          </button>
        ))}
      </div>
      {showPopup && (
        <Popup
          title="Alasan Mendaftar"
          placeholder="Tulis alasanmu mendaftar..."
          onCancel={() => {
            setShowPopup(false);
            window.alert("Pendaftaran dibatalkan");
          }}
          onSubmit={handlePopupSubmit}
        />
      )}
    </div>
  );
};

export default KajasepPage;