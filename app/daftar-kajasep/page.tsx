'use client';
// Library
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
// Components Import
import AdminCard from "@/components/AdminCard";
// Types Import
import { Kajasep } from "@/types/types";
// Actions Import
import { getAllKajasep } from "@/actions/admin-actions";
import { useRouter } from "next/navigation";

const AdminPage = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const [kajasepList, setKajasepList] = useState<Kajasep[]>([]);

  useEffect(() => {
    if (!session || session.user.role !== "ADMIN") {
      router.push("/")
    }
  
  }, [])
  useEffect(() => {
    async function fetchKajasep() {
      try {
        const data = await getAllKajasep();
        if (data) {
          // @ts-ignore
          setKajasepList(data)
        } else {
          console.error("Failed to fetch Kajasep list.");
        }
      } catch (error) {
        console.error("Error fetching Kajasep list:", error);
      }
    }

    fetchKajasep();
  }, []);

  return (
    <main>
      <div className="flex flex-col items-center w-full min-h-screen h-full pt-2 pb-20 bg-[#FF5F6D]/25 px-4">
        <div className="w-full max-w-5xl py-8">
          <h1 className="text-start text-3xl font-bold bg-gradient-to-r from-[#FF5F6D] to-[#FFC371] bg-clip-text text-transparent">
            Daftar Ka Jasep
          </h1>
        </div>
        <div className="max-w-5xl flex flex-col gap-y-4 w-full items-center">
          {kajasepList && kajasepList.map((admin, index) => (
            <AdminCard
              key={index}
              name={admin.name || "N/A"}
              currQuota={admin.dejaseps?.length || 0}
              quota={admin.quota || 0}
              // @ts-ignore
              dejasep={admin.dejaseps || []}
            />
          ))}
          {!kajasepList && (
            <p className="text-xl text-white">Tidak ada Kak Jasep untuk ditampilkan.</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default AdminPage;
