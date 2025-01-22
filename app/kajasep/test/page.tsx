import React from "react";
import ProfilePage from "@/components/CaKSEP/CaKSEPProfile";
const HardcodedProfile: React.FC = () => {
  const hardcodedData = {
    name: "Naufarrel Zhafif Abhista",
    nickname: "Farrel",
    description:
      "Naufarrel adalah seorang pemimpin yang berkomitmen pada pengembangan komunitas melalui inovasi dan kerja tim. Dia memiliki pengalaman dalam memimpin berbagai proyek teknologi.",
    requirements: "1. Bersedia bekerja dalam tim.\n2. Memiliki kemampuan komunikasi yang baik.\n3. Berdedikasi penuh selama periode kegiatan.",
    profilePicture: "/assets/profile-picture.png",
  };

  const handleDaftar = () => {
    alert("Anda telah mendaftar untuk KaJasep!");
  };

  const handleBack = () => {
    alert("Kembali ke halaman sebelumnya.");
  };

  return <ProfilePage data={hardcodedData} />;
};

export default HardcodedProfile;
