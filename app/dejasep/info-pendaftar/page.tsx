"use client";

import React, { useEffect, useState } from "react";
import ApplicantCard from "@/components/Kajasep/ApplicantCard";
import {
  getKajasepFromUserId,
  getApplicationsFromKjasepId,
} from "@/actions/kajasep-actions"; // Import necessary actions
import { useSession } from "next-auth/react";

// Define a type for the applicant data
interface Applicant {
  id: string;
  applicantId: string;
  message: string | null;
  applyStatus: string;
  applicant: {
    username: string;
  };
}

const InfoPendaftar = () => {
  const { data: session } = useSession();
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [kajasepId, setKajasepId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (session?.user?.id) {
          // Step 1: Fetch the Kajasep ID associated with the current user
          const kajasep = await getKajasepFromUserId(session.user.id);
          if (kajasep) {
            setKajasepId(kajasep.id);

            // Step 2: Fetch applications using the retrieved Kajasep ID
            const applications = await getApplicationsFromKjasepId(kajasep.id);
            setApplicants(applications);
          } else {
            console.error("No Kajasep found for the current user.");
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [session]);

  if (isLoading) {
    return <p>Loading applicants...</p>;
  }

  if (!kajasepId) {
    return <p>You do not have an associated Kajasep.</p>;
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
          {applicants.length > 0 ? (
            applicants.map((applicant) => (
              <ApplicantCard
                key={applicant.id}
                applicationId={applicant.id}
                name={applicant.applicant.username}
                reason={applicant.message || "No reason provided"}
                applyStatus={applicant.applyStatus}
                kajasepId={kajasepId || ""} // Pass the Kajasep ID
                applicantId={applicant.applicantId || ""} // Current user ID
              />
            ))
          ) : (
            <p>No applicants found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoPendaftar;
