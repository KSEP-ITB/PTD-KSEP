'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';

const page = () => {
  const [formData, setFormData] = useState({
    nama: '',
    namaPanggilan: '',
    deskripsi: '',
    syarat: '',
    kuota: ''
  });

  //@ts-ignore
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  //@ts-ignore
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#FF5F6D] to-[#FFC371] p-12 border-white">
      <Card className="max-w-xl mx-auto bg-white">
        <CardHeader>
          <CardTitle className="w-full space-y-2">
            <CardTitle className='text-center text-3xl bg-gradient-to-r text-transparent bg-clip-text from-[#FF5F6D] to-[#FFC371]'>Biodata</CardTitle>
            <p className='text-center text-sm font-normal text-slate-400'>Disini kamu dapat mengisi biodata diri kamu untuk dikenalkan ke Ca-KSEP</p>
          </CardTitle>
          </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="nama" className="text-red-600">
                Nama
              </Label>
              <Input
                id="nama"
                name="nama"
                placeholder="Tulis namamu disini..."
                value={formData.nama}
                onChange={handleChange}
                className="w-full p-2 rounded-md"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="namaPanggilan" className="text-red-600">
                Nama Panggilan
              </Label>
              <Input
                id="namaPanggilan"
                name="namaPanggilan"
                placeholder="Tulis panggilanmu disini..."
                value={formData.namaPanggilan}
                onChange={handleChange}
                className="w-full p-2 rounded-md"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="deskripsi" className="text-red-600">
                Deskripsi
              </Label>
              <Textarea
                id="deskripsi"
                name="deskripsi"
                placeholder="Tulis deskripsi disini..."
                value={formData.deskripsi}
                onChange={handleChange}
                className="w-full p-2 rounded-md h-32"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="syarat" className="text-red-600">
                Syarat
              </Label>
              <Textarea
                id="syarat"
                name="syarat"
                placeholder="Tulis syarat disini..."
                value={formData.syarat}
                onChange={handleChange}
                className="w-full p-2 rounded-md h-32"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="kuota" className="text-red-600">
                Kuota
              </Label>
              <Input
                id="kuota"
                name="kuota"
                type="text"
                placeholder="1-3"
                value={formData.kuota}
                onChange={handleChange}
                className="w-full p-2 rounded-md max-w-[100px]"
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md"
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