"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import CaKSEPHeader from "@/components/CaKSEP/CaKSEPHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Search } from "lucide-react";
import { Kajasep } from "@/types/types";
import JoYuri from "@/public/assets/JoYuti.jpg";
import { getAllKajaseps } from "@/actions/kajasep-actions";
import { getApplicationsForUser } from "@/actions/kajasep-applications";
import { createKajasepApplication } from "@/actions/kajasep-applications";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
// Icon Import
import { UserRoundPen } from "lucide-react";
// Types Import
// Actions Import
import { useRouter } from "next/navigation";

const KajasepPage: React.FC = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id || null;
  const router = useRouter()

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormApplicationOpen, setIsFormApplicationOpen] = useState(false);
  const [kajasepList, setKajasepList] = useState<Kajasep[]>([]);
  const [userApplications, setUserApplications] = useState<string[]>([]);
  const [selectedKajasepId, setSelectedKajasepId] = useState<string | null>(
    null
  );
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (!session || session.user.role !== "USER") {
      router.push("/")
    }
  }, [])

  useEffect(() => {
    async function fetchKajasepsAndApplications() {
      try {
        const kajaseps = await getAllKajaseps();
        //@ts-ignore
        setKajasepList(kajaseps);

        if (userId) {
          const applications = await getApplicationsForUser(userId);
          const appliedKajasepIds = applications.map(
            (app: { kajasepId: string }) => app.kajasepId
          );
          setUserApplications(appliedKajasepIds);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchKajasepsAndApplications();
  }, [userId]);

  const itemsPerPage = 6;

  const filteredData = kajasepList.filter((kajasep) =>
    kajasep.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0 });
  };

  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId || !selectedKajasepId) {
      console.error("User ID or Kajasep ID is missing.");
      return;
    }

    try {
      await createKajasepApplication(userId, selectedKajasepId, message);
      console.log("Application submitted successfully.");
      setUserApplications((prev) => [...prev, selectedKajasepId]);
      setIsFormApplicationOpen(false);
    } catch (error) {
      console.error("Error submitting application:", error);
    }
    window.location.reload();
  };

  return (
    <div className="w-full h-full flex flex-col items-center space-y-8 bg-[#FF5F6D]/25 pb-20">
      <CaKSEPHeader />

      {/* Search Bar */}
      <div className="px-4 max-w-5xl w-full space-y-4">
        <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between relative py-4 gap-4">
          <div className="relative w-full">
            <Input
              className="focus:ring-0 focus:ring-offset-0 px-12 py-6 bg-gradient-to-r text-white from-[#FF5F6D]/75 to-[#FFC371]/75 rounded-full border-2 border-white placeholder:text-white text-[16px] placeholder:text-[16px] w-full"
              placeholder="Cari KaJasep"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute top-1/2 left-4 transform -translate-y-1/2 w-6 h-6 text-white" />
          </div>
          <div className="flex justify-end w-full">
            <Link href={"/kajasep/my-application"}>
              <Button
                variant={"outline"}
                className="py-6 rounded-full bg-white border-transparent text-[#FFC371] hover:text-[#FFC371]"
              >
                My Application <UserRoundPen />
              </Button>
            </Link>
          </div>
        </div>

        {/* Daftar KaJasep */}
        {currentData.length > 0 ? (
          currentData.map((kajasep) => {
            const isApplied = userApplications.includes(kajasep.id);

            return (
              <div
                key={kajasep.id}
                className="flex items-center gap-6 p-4 rounded-2xl border-2 border-white bg-gradient-to-tr from-[#FF5F6D] to-[#FFC371] transition-transform duration-300 hover:scale-105"
              >
                <Image
                  src={JoYuri}
                  alt={kajasep.name || "N/A"}
                  className="h-[120px] w-[120px] rounded-full border-2 border-white object-cover"
                />
                <div className="space-y-[2px] w-full h-full flex-1">
                  <h2 className="font-bold text-white text-3xl">
                    {kajasep.name}
                  </h2>
                  <p className="text-white">Kuota: {kajasep.quota}</p>
                  <p className="text-white">
                    Pendaftar: {kajasep.totalApplicants}
                  </p>
                </div>
                {isApplied ? (
                  <p className="text-white font-bold">Terdaftar</p>
                ) : (
                  <Dialog
                    open={isFormApplicationOpen}
                    onOpenChange={setIsFormApplicationOpen}
                  >
                    <DialogTrigger asChild>
                      <Button
                        size={"default"}
                        className="rounded-full bg-white font-medium hover:bg-white text-[#FF6F3C] transition-all duration-300"
                        onClick={() => setSelectedKajasepId(kajasep.id)}
                      >
                        Daftar
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="p-6 bg-gradient-to-br from-[#FF5F6D] to-[#FFC371] rounded-lg">
                      <form onSubmit={handleSubmit}>
                        <h2 className="text-lg font-bold text-white mb-2">
                          Form Application
                        </h2>
                        <Textarea
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Enter your message"
                          className="focus-visible:ring-transparent mb-4"
                        />
                        <div className="flex justify-end gap-2">
                          <Button
                            type="button"
                            variant="secondary"
                            onClick={() => setIsFormApplicationOpen(false)}
                          >
                            Cancel
                          </Button>
                          <Button type="submit">Submit</Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-center text-white text-lg">
            Tidak ada hasil yang ditemukan.
          </p>
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
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default KajasepPage;
