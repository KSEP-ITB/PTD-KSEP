import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function CaKSEPCard() {
  interface DataItem {
    name: string;
    quota: number;
  }

  const [data, setData] = useState<DataItem[]>([]);

  useEffect(() => {
    fetch("https://example.com/api/data")
      .then((response) => response.json())
      .then((result) => setData(result))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="space-y-4">
      {data.map((item, index) => (
        <div
          key={index}
          className={`flex items-center p-4 rounded-lg ${
            index % 2 === 0 ? "bg-red-600" : "bg-yellow-400"
          }`}
        >
          <Image
            src="https://via.placeholder.com/50"
            alt="Profile"
            className="w-16 h-16 rounded-full mr-4"
            width={50}
            height={50}
          />
          <div className="flex-1">
            <h2 className="text-white font-bold">{item.name}</h2>
            <p className="text-white">Kuota: {item.quota}</p>
          </div>
          <Button
            className={`px-4 py-2 rounded ${
              index % 2 === 0 ? "bg-yellow-500" : "bg-red-500"
            } text-white`}
          >
            Daftar
          </Button>
        </div>
      ))}
    </div>
  );
}