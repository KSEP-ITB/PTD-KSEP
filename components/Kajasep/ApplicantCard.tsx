"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { acceptDejasep, rejectDejasep } from "@/actions/kajasep-actions";
import { cancelKajasepApplication } from "@/actions/kajasep-applications";

interface ApplicantCardProps {
  applicationId: string;
  applicantId: string;
  kajasepId: string;
  name: string;
  reason: string;
  applyStatus: string;
}

const ApplicantCard = ({
  applicationId,
  applicantId,
  kajasepId,
  name,
  reason,
  applyStatus,
}: ApplicantCardProps) => {
  const [status, setStatus] = useState(applyStatus); // Track the current application status

  const handleAccept = async () => {
    try {
      await acceptDejasep(applicationId, applicantId, kajasepId); // Update application status to "APPROVED"
      setStatus("APPROVED"); // Update local status
    } catch (error) {
      console.error("Error approving application:", error);
    }
  };

  const handleReject = async () => {
    try {
      await rejectDejasep(kajasepId, applicantId, applicationId); // Update application status to "REJECTED"
      await cancelKajasepApplication(applicantId); // Remove the Kajasep application and decrement totalApplicants
      setStatus("REJECTED"); // Update local status
    } catch (error) {
      console.error("Error rejecting application:", error);
    }
  };

  return (
    <Card className="border-2 border-white rounded-xl w-full bg-gradient-to-r from-[#FF5F6D] to-[#FFC371] p-4 flex items-center justify-between gap-6">
      <div className="space-y-[2px] w-full flex-1">
        <h2 className="font-bold text-white text-2xl">{name}</h2>
        <p className="text-white text-sm">{reason}</p>
        <p className="text-white text-sm">Status: {status}</p>
      </div>
      <div className="flex gap-2">
        {status === "APPLIED" && (
          <>
            <Button
              className="shadow-lg bg-white hover:bg-white text-[#FF5F6D] relative bottom-0 font-medium w-[100px]"
              onClick={handleAccept}
            >
              Terima
            </Button>
            <Button
              className="shadow-lg bg-white hover:bg-white text-[#FF5F6D] relative bottom-0 font-medium w-[100px]"
              onClick={handleReject}
            >
              Tolak
            </Button>
          </>
        )}
        {status === "APPROVED" && <p className="text-white">Diterima</p>}
        {status === "REJECTED" && <p className="text-white">Ditolak</p>}
      </div>
    </Card>
  );
};

export default ApplicantCard;
