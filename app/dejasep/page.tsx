"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  createKajasep,
  updateKajasepInfo,
  getKajasepFromUserId,
} from "@/actions/kajasep-actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { UploadButton } from "@/lib/uploadthing";
import { MoveUpRight } from "lucide-react";
import { useRouter } from "next/navigation";

const KajasepForm = () => {
  const { data: session } = useSession();
  const router = useRouter()
  const userId = session?.user?.id || null; // Get user ID from session

  useEffect(() => {
    if (!session || session.user.role !== "KAJASEP") {
      router.push("/")
    }
  }, [])

  const [formData, setFormData] = useState({
    nama: "",
    namaPanggilan: "",
    deskripsi: "",
    syarat: "",
    kuota: "",
    instagram: "",
    line: "",
    imageUrl: "", // Store the uploaded image URL
  });

  const [isLoading, setIsLoading] = useState(true); // To handle loading state
  const [isEditMode, setIsEditMode] = useState(false); // To track if it's edit or create mode

  useEffect(() => {
    const fetchKajasep = async () => {
      if (userId) {
        try {
          const kajasep = await getKajasepFromUserId(userId); // Fetch biodata using userId
          if (kajasep) {
            setFormData({
              nama: kajasep.name || "",
              namaPanggilan: kajasep.nickname || "",
              deskripsi: kajasep.description || "",
              syarat: kajasep.requirement || "",
              kuota: kajasep.quota?.toString() || "",
              instagram: kajasep.instagram || "",
              line: kajasep.line || "",
              imageUrl: kajasep.imageUrl || "",
            });
            setIsEditMode(true); // If data exists, switch to edit mode
          }
        } catch (error) {
          console.error("Error fetching Kajasep data:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    fetchKajasep();
  }, [userId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      console.error("User is not logged in.");
      return;
    }

    const payload = {
      name: formData.nama || "",
      nickname: formData.namaPanggilan || "",
      description: formData.deskripsi || "",
      requirement: formData.syarat || "",
      quota: formData.kuota ? parseInt(formData.kuota, 10) : undefined,
      instagram: formData.instagram || "",
      line: formData.line || "",
      imageUrl: formData.imageUrl || undefined,
    };

    try {
      if (isEditMode) {
        // Update existing Kajasep
        await updateKajasepInfo(userId, payload);
      } else {
        // Create new Kajasep
        await createKajasep(
          userId,
          payload.name,
          payload.nickname,
          payload.description,
          payload.requirement,
          payload.quota,
          payload.imageUrl,
          payload.instagram,
          payload.line
        );
        console.log("Kajasep created successfully!");
      }
      window.location.reload();

      // Reset form after submission
      setFormData({
        nama: "",
        namaPanggilan: "",
        deskripsi: "",
        syarat: "",
        kuota: "",
        instagram: "",
        line: "",
        imageUrl: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#FF5F6D] to-[#FFC371] p-4 md:py-12">
      <Card className="max-w-xl mx-auto bg-white border-white">
        <CardHeader>
          <CardTitle className="flex justify-between">
            <span className="text-start text-3xl bg-gradient-to-r text-transparent bg-clip-text from-[#FF5F6D] to-[#FFC371]">
              {isEditMode ? "Edit Biodata" : "Biodata"}
            </span>
            <Link href="/dejasep/info-pendaftar">
              <Button
                variant="ghost"
                size="sm"
                className="text-[#FF5F6D] font-medium hover:text-[#FF5F6D]"
              >
                Lihat Pendaftar <MoveUpRight />
              </Button>
            </Link>
          </CardTitle>
          <p className="text-start text-sm font-normal text-slate-400">
            {isEditMode
              ? "Edit data biodata kamu untuk Ca-KSEP."
              : "Isi biodata untuk dikenalkan ke Ca-KSEP."}
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-2">
            <div className="space-y-2">
              <Label htmlFor="nama" className="text-[#FF5F6D]">
                Nama
              </Label>
              <Input
                id="nama"
                name="nama"
                placeholder="Tulis namamu disini..."
                value={formData.nama}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="namaPanggilan" className="text-[#FF5F6D]">
                Nama Panggilan
              </Label>
              <Input
                id="namaPanggilan"
                name="namaPanggilan"
                placeholder="Tulis panggilanmu disini..."
                value={formData.namaPanggilan}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instagram" className="text-[#FF5F6D]">
                Instagram
              </Label>
              <Input
                id="instagram"
                name="instagram"
                placeholder="Tulis Instagram disini..."
                value={formData.instagram}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="line" className="text-[#FF5F6D]">
                ID Line
              </Label>
              <Input
                id="line"
                name="line"
                placeholder="Tulis ID Line disini..."
                value={formData.line}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deskripsi" className="text-[#FF5F6D]">
                Deskripsi
              </Label>
              <textarea
                id="deskripsi"
                name="deskripsi"
                placeholder="Tulis deskripsi disini..."
                value={formData.deskripsi}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-pink-500"
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="syarat" className="text-[#FF5F6D]">
                Syarat
              </Label>
              <textarea
                id="syarat"
                name="syarat"
                placeholder="Tulis syarat disini..."
                value={formData.syarat}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-pink-500"
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="kuota" className="text-[#FF5F6D]">
                Kuota
              </Label>
              <Input
                id="kuota"
                name="kuota"
                type="number"
                placeholder="Kuota De Jasep"
                value={formData.kuota}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gambar" className="text-[#FF5F6D]">
                Upload Gambar
              </Label>
              {formData.imageUrl && (
                <img
                  src={formData.imageUrl}
                  alt="Preview"
                  className="w-[200px] h-auto rounded-lg mx-auto"
                />
              )}
              <UploadButton
                className="mt-3 flex items-start ut-button:bg-gradient-to-r ut-button:from-[#FF5F6D] ut-button:to-[#FFC371] ut-button:text-white  ut-button:py-7 ut-button:rounded-xl"
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  if (res && res[0]) {
                    setFormData((prev) => ({
                      ...prev,
                      imageUrl: res[0].url,
                    }));
                  }
                }}
                onUploadError={(error) => {
                  console.error("Error uploading file:", error);
                }}
              />
              {/* {formData.imageUrl && (
                <p className="text-sm text-green-600">
                  File uploaded successfully!
                </p>
              )} */}
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#FF5F6D] to-[#FFC371] text-white"
            >
              {isEditMode ? "Update" : "Simpan"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default KajasepForm;
