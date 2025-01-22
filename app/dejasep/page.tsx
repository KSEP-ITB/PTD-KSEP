'use client';
// Library Import
import React, { useState } from 'react';
import Link from 'next/link';
// Component Import
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
// Quill Import
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
// Icon Import
import { MoveUpRight } from 'lucide-react';
// Lazy load React Quill
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const page = () => {
  const [formData, setFormData] = useState({
    nama: '',
    namaPanggilan: '',
    deskripsi: '',
    syarat: '',
    kuota: '',
    gambar: null, // Untuk menyimpan file gambar
  });

  // @ts-ignore
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // @ts-ignore
  const handleQuillChange = (value, fieldName) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  // @ts-ignore
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        gambar: file,
      }));
    }
  };

  // @ts-ignore
  const handleSubmit = (e) => {
    e.preventDefault();

    // Proses simpan gambar ke folder public (untuk demo saja, ini seharusnya dilakukan di server)
    if (formData.gambar) {
      const reader = new FileReader();
      reader.onload = () => { // @ts-ignore
        console.log('File uploaded:', formData.gambar.name);
        console.log('Base64 preview:', reader.result);
      };
      reader.readAsDataURL(formData.gambar);
    }

    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#FF5F6D] to-[#FFC371] p-12">
      <Card className="max-w-xl mx-auto bg-white border-white">
        <CardHeader>
          <CardTitle className="flex justify-between">
            <span className="text-start text-3xl bg-gradient-to-r text-transparent bg-clip-text from-[#FF5F6D] to-[#FFC371]">
              Biodata
            </span>
            <Link href="/dejasep/info-pendaftar">
              <Button
                variant={"ghost"}
                size={"sm"}
                className="text-[#FF5F6D] font-medium hover:text-[#FF5F6D]"
              >
                Lihat Pendaftar <MoveUpRight />
              </Button>
            </Link>
          </CardTitle>
          <p className="text-start text-sm font-normal text-slate-400">
            Disini kamu dapat mengisi biodata diri kamu untuk dikenalkan ke Ca-KSEP
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
                className="w-full p-2 rounded-md focus-visible:ring-transparent"
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
                className="w-full p-2 rounded-md focus-visible:ring-transparent"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deskripsi" className="text-[#FF5F6D]">
                Deskripsi
              </Label>
              <ReactQuill
                theme="snow"
                value={formData.deskripsi}
                onChange={(value) => handleQuillChange(value, 'deskripsi')}
                className="bg-white text-black focus-visible:ring-transparent"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="syarat" className="text-[#FF5F6D]">
                Syarat
              </Label>
              <ReactQuill
                theme="snow"
                value={formData.syarat}
                onChange={(value) => handleQuillChange(value, 'syarat')}
                className="bg-white text-black focus-visible:ring-transparent"
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
                onChange={(e) => {
                  const value = parseInt(e.target.value, 10);
                  if (value >= 0 || e.target.value === "") {
                    setFormData({ ...formData, kuota: e.target.value });
                  }
                }}
                className="w-full p-2 rounded-md focus-visible:ring-transparent"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gambar" className="text-[#FF5F6D]">
                Upload Gambar
              </Label>
              <Input
                id="gambar"
                name="gambar"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-2 rounded-md focus-visible:ring-transparent"
              />
            </div>
            <div className="py-2" />
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#FF5F6D] to-[#FFC371] text-white"
            >
              Simpan
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;