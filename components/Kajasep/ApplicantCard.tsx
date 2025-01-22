'use client';

import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";

interface ApplicantCardProps {
  name: string;
  reason: string;
  imageUrl?: string;
}

const ApplicantCard = ({ name, reason, imageUrl }: ApplicantCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    nama: '',
    fakultas: '',
    alasan: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsModalOpen(false);
  };

  return (
    <>
      <Card className="w-full mb-4 overflow-hidden bg-gradient-to-r from-yellow-400 to-red-600 p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-yellow-200 border-2 border-red-500">
            {/* Placeholder for profile image */}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-black">{name}</h3>
            <p className="text-sm text-black">{reason}</p>
          </div>
        </div>
        <Button 
          variant="secondary"
          className="bg-yellow-400 hover:bg-yellow-500 text-black px-6"
          onClick={() => setIsModalOpen(true)}
        >
          Terima
        </Button>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px] bg-gradient-to-b from-red-600 via-orange-500 to-orange-400 border-none p-0">
          <div className="p-6 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 rounded-full bg-yellow-400 p-2 hover:bg-yellow-500"
            >
              <X className="h-4 w-4" />
            </button>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="nama" className="text-white">
                  Nama
                </Label>
                <Input
                  id="nama"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  className="w-full rounded-md"
                  placeholder="Nasya Fairisha"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fakultas" className="text-white">
                  Fakultas/Jurusan
                </Label>
                <Input
                  id="fakultas"
                  name="fakultas"
                  value={formData.fakultas}
                  onChange={handleChange}
                  className="w-full rounded-md"
                  placeholder="FMIPA-M"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="alasan" className="text-white">
                  Alasan
                </Label>
                <Textarea
                  id="alasan"
                  name="alasan"
                  value={formData.alasan}
                  onChange={handleChange}
                  className="w-full rounded-md h-32"
                  placeholder="Karena aku suka sama kakak <3"
                />
              </div>

              <Button 
                type="submit"
                className="w-full bg-red-700 hover:bg-red-800 text-white"
              >
                Terima
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ApplicantCard;