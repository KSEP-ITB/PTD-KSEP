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
import { UserRoundPen } from "lucide-react";
import { useRouter } from "next/navigation";

const KajasepPage: React.FC = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id || null;
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormApplicationOpen, setIsFormApplicationOpen] = useState(false);
  const [kajasepList, setKajasepList] = useState<Kajasep[]>([]);
  const [isKaJasepDialogOpen, setIsKaJasepDialogOpen] = useState(false);
  const [userApplications, setUserApplications] = useState<string[]>([]);
  const [selectedKajasepId, setSelectedKajasepId] = useState<string | null>(
    null
  );
  const [selectedKajasep, setSelectedKajasep] = useState<Kajasep | null>(null);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (!session || session.user.role !== "USER") {
      router.push("/");
    }
  }, []);

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

  const openKajasepDialog = (kajasep: Kajasep) => {
    setSelectedKajasep(kajasep);
    setSelectedKajasepId(kajasep.id);
    setIsKaJasepDialogOpen(true);
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
          // @ts-ignore
          currentData.map((kajasep) => {
            const isApplied = userApplications.includes(kajasep.id);

            return (
              <div
                key={kajasep.id}
                className="flex items-center gap-3 md:gap-6 p-4 md:p-4 rounded-2xl border-2 border-white bg-gradient-to-tr from-[#FF5F6D] to-[#FFC371] transition-transform duration-300 hover:scale-105"
              >
                <img
                  // @ts-ignore
                  src={kajasep.imageUrl || JoYuri}
                  alt={kajasep.name || "N/A"}
                  // width={120}
                  // height={120}
                  className="w-[80px] h-[80px] min-w-[80px] min-h-[80px] max-w-[80px] max-h-[80px] md:w-[80px] md:h-[80px] md:min-w-[120px] md:min-h-[120px] md:max-w-[120px] md:max-h-[120px] rounded-full border-2 border-white object-cover"
                />
                <div className="space-y-[2px] w-full h-full flex-1">
                  <h2 className="font-bold text-white text-[16px] md:text-2xl lg:text-3xl">
                    {kajasep.name}
                  </h2>
                  <p className="text-xs md:text-[16px] text-white">
                    Kuota: {kajasep.quota}
                  </p>
                  <p className="text-xs md:text-[16px] text-white">
                    Pendaftar: {kajasep.totalApplicants}
                  </p>
                </div>

                <Dialog
                  open={
                    isKaJasepDialogOpen && selectedKajasep?.id === kajasep.id
                  }
                  onOpenChange={(open) => {
                    setIsKaJasepDialogOpen(open);
                    if (!open) setSelectedKajasep(null);
                  }}
                >
                  <DialogTrigger asChild>
                    <Button
                      size={"default"}
                      className="rounded-full bg-white font-medium hover:bg-white text-[#FF6F3C] transition-all duration-300"
                      onClick={() => openKajasepDialog(kajasep)}
                    >
                      Daftar
                    </Button>
                  </DialogTrigger>
                  {selectedKajasep && (
                    <DialogContent className="p-4 md:p-8 border-2 border-white bg-gradient-to-br from-[#FF5F6D] to-[#FFC371] flex md:flex-row flex-col items-start justify-start gap-x-8 md:min-w-[800px]">
                      <img
                        // @ts-ignore
                        src={selectedKajasep.imageUrl || JoYuri || null}
                        alt={
                          selectedKajasep.name ? selectedKajasep.name : "N/A"
                        }
                        // width={270}
                        // height={270}
                        className="h-[200px] w-[200px] min-h-[200px] min-w-[200px] max-h-[200px] max-w-[200px] md:h-[300px] md:w-[300px] md:min-h-[300px] md:min-w-[300px] md:max-h-[300px] md:max-w-[300px] rounded-xl border-2 border-white object-cover"
                      />
                      <div className="h-full space-y-2 md:space-y-4">
                        <div className="">
                          <h2 className="font-bold text-white text-xl md:text-2xl lg:text-3xl">
                            {selectedKajasep.name}
                          </h2>
                          <p className="text-white">
                            {selectedKajasep.nickname}
                          </p>
                        </div>
                        <div>
                          <p className="text-white text-[18px] font-semibold">
                            Deskripsi
                          </p>
                          <p className="text-white text-sm">
                            {selectedKajasep.description}
                          </p>
                        </div>
                        <div>
                          <p className="text-white text-[18px] font-semibold">
                            Syarat
                          </p>
                          <p className="text-white text-sm">
                            {selectedKajasep.requirement}
                          </p>
                        </div>
                        <div>
                          <p className="text-white text-[18px] font-semibold">
                            Kontak
                          </p>
                          <p className="text-white text-sm">
                            ID Line: {selectedKajasep.line}
                          </p>
                          <p className="text-white text-sm">
                            Instagram: @{selectedKajasep.instagram}
                          </p>
                        </div>
                        {isApplied ? (
                          <p className="text-white">Terdaftar</p>
                        ) : (
                          (() => {
                            const isFull =
                              selectedKajasep.quota &&
                              selectedKajasep.totalApplicants >=
                                selectedKajasep.quota + 1;
                            return (
                              <Button
                                className="shadow-lg bg-white hover:bg-white text-[#FF5F6D] relative bottom-0 font-medium w-[100px]"
                                onClick={() => {
                                  setIsKaJasepDialogOpen(false);
                                  setIsFormApplicationOpen(true);
                                }}
                                // @ts-ignore
                                disabled={isFull}
                              >
                                Daftar
                              </Button>
                            );
                          })()
                        )}
                      </div>
                    </DialogContent>
                  )}
                </Dialog>
              </div>
            );
          })
        ) : (
          <p className="text-center text-white text-lg">
            Tidak ada hasil yang ditemukan.
          </p>
        )}

        {/* Form Application Dialog */}
        <Dialog
          open={isFormApplicationOpen}
          onOpenChange={(open) => {
            setIsFormApplicationOpen(open);
            if (!open) setSelectedKajasepId(null);
          }}
        >
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
      </div>

      {/* Pagination */}
      {filteredData.length > 0 && (
        <div className="flex justify-center mt-4">
          {/* Tombol ke Halaman Pertama */}
          {currentPage > 1 && (
            <button
              onClick={() => handlePageChange(1)}
              className="px-4 py-2 mx-1 rounded-full bg-white text-[#FF5F6D] border-2 border-[#FF5F6D] transition-all duration-300"
            >
              First
            </button>
          )}

          {/* Tombol Pagination */}
          {[...Array(totalPages)].map((_, index) => {
            const startPage = Math.max(currentPage - 2, 1); // 2 halaman sebelum currentPage
            const endPage = Math.min(currentPage + 1, totalPages); // 1 halaman setelah currentPage

            if (index + 1 >= startPage && index + 1 <= endPage) {
              return (
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
              );
            }

            return null;
          })}

          {/* Tombol ke Halaman Terakhir */}
          {currentPage < totalPages && (
            <button
              onClick={() => handlePageChange(totalPages)}
              className="px-4 py-2 mx-1 rounded-full bg-white text-[#FF5F6D] border-2 border-[#FF5F6D] transition-all duration-300"
            >
              Last
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default KajasepPage;
