'use client';
// Library Import
import { useState } from 'react';
import Image from 'next/image';
// Component Import
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// Asset Import
import JoYuri from '@/public/assets/JoYuti.jpg';

interface ApplicantCardProps {
  name: string;
  reason: string;
  imageUrl?: string;
}

const ApplicantCard = ({ name, reason, imageUrl }: ApplicantCardProps) => {
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
  };

  return (
    <Card className="border-2 border-white rounded-xl w-full bg-gradient-to-r from-[#FF5F6D] to-[#FFC371] p-4 flex items-center justify-between gap-6">
      <div className="flex items-start gap-4">
        <Image
          src={JoYuri}
          alt="Jo Yuri"
          className="h-[120px] w-[120px] rounded-full border-2 border-white object-cover"
        />
        <div className="space-y-[2px] w-full h-full flex-1">
          <h2 className="font-bold text-white text-2xl">Nama Ca-KSEP</h2>
          <p className='text-white text-sm'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer pellentesque pellentesque sagittis. Sed eget orci eget eros finibus fringilla. Aenean magna metus, faucibus at laoreet nec, facilisis faucibus augue. Sed eget aliquet nunc. Nullam laoreet sapien quis semper fermentum. Fusce diam elit, ultricies quis orci non, congue iaculis turpis. </p>
        </div>
      </div>
      <Button className="shadow-lg bg-white hover:bg-white text-[#FF5F6D] relative bottom-0 font-medium w-[100px]">
        Terima
      </Button>
    </Card>
  );
};

export default ApplicantCard;