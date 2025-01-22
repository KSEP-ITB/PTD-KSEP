'use client';

import ApplicantCard from "@/components/Kajasep/ApplicantCard";

// Dummy data for development
const applicants = [
  {
    name: "Farrel Athalla Putra",
    reason: "Kak saya mau daftar",
    imageUrl: ""
  },
  {
    name: "Farrel Athalla Putra",
    reason: "Kak saya mau daftar",
    imageUrl: ""
  },
  {
    name: "Farrel Athalla Putra",
    reason: "Kak saya mau daftar",
    imageUrl: ""
  }
];

export default function InfoPendaftar() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-center text-3xl font-bold mb-8">
          <span className="text-black">INFO </span>
          <span className="text-red-600">PENDAFTAR</span>
        </h1>
        
        <div className="space-y-4">
          {applicants.map((applicant, index) => (
            <ApplicantCard
              key={index}
              name={applicant.name}
              reason={applicant.reason}
              imageUrl={applicant.imageUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
}