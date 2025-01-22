'use client';
// Component Import
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
    <div className="min-h-screen bg-[#FF5F6D]/25 p-12 flex flex-col items-center">
      <div className="w-full max-w-5xl">
        <div className="pb-8">
          <h1 className="text-start bg-gradient-to-r from-[#FF5F6D] to-[#FFC371] bg-clip-text text-transparent font-bold text-4xl">
            Pendaftar
          </h1>
        </div>
        <div className="w-full space-y-2">
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