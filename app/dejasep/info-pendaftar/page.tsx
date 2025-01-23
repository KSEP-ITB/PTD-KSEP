"use client";

import React, { useEffect, useState } from "react";
import ApplicantCard from "@/components/Kajasep/ApplicantCard";
import { getApplicationsFromKjasepId } from "@/actions/kajasep-actions"; // Import the action to fetch applications
import { useSession } from "next-auth/react";

// Define a type for the applicant data
interface Applicant {
  id: string;
  message: string | null;
  applyStatus: string;
  applicant: {
    username: string;
  };
}

const InfoPendaftar = () => {
  const { data: session } = useSession();
  const [applicants, setApplicants] = useState<Applicant[]>([]); // Specify the type of applicants
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        if (session?.user?.id) {
          const applications = await getApplicationsFromKjasepId(
            session.user.id
          ); // Fetch applicants using the logged-in user's Kajasep ID
          setApplicants(applications); // TypeScript will now correctly recognize the type
        }
      } catch (error) {
        console.error("Error fetching applicants:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplicants();
  }, [session]);

  if (isLoading) {
    return <p>Loading applicants...</p>;
  }

  return (
    <div className="min-h-screen bg-[#FF5F6D]/25 p-12 flex flex-col items-center">
      <div className="w-full max-w-5xl">
        <div className="pb-8">
          <h1 className="text-start bg-gradient-to-r from-[#FF5F6D] to-[#FFC371] bg-clip-text text-transparent font-bold text-4xl">
            Pendaftar
          </h1>
        </div>
        <div className="w-full space-y-2">
          {applicants.map((applicant) => (
            <ApplicantCard
              key={applicant.id}
              id={applicant.id}
              name={applicant.applicant.username}
              reason={applicant.message || "No reason provided"}
              applyStatus={applicant.applyStatus}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfoPendaftar;
