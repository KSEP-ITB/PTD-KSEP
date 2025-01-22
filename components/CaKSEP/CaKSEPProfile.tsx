import Image from "next/image";
import { Button } from "@/components/ui/button";

interface ProfilePageProps {
  data: {
    name: string;
    nickname: string;
    description: string;
    requirements: string;
    profilePicture: string;
  };
  onDaftar: () => void;
  onBack: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ onDaftar, data, onBack }) => {
  return (
    <div className="bg-gradient-to-b from-[#FFF5E4] to-[#FFBD59] h-screen p-8 text-[#3E1E68] flex justify-center items-center">
      <div className="relative bg-gradient-to-r from-[#FF9F43] to-[#FF6F3C] p-6 rounded-lg shadow-lg flex items-center">
        <div className="relative w-[40vw] h-[20vw]">
          {/* Background Frame */}
          <Image
            src="/FrameKajasep.png"
            alt="Frame Background"
            layout="fill"
            objectFit="contain"
            className="z-0"
          />
          {/* Profile Picture */}
          <div className="absolute inset-0 flex justify-center items-center">
            <Image
              src={data.profilePicture}
              alt="Profile Picture"
              width={160}
              height={160}
              className="rounded-lg z-10 border-2 border-white"
            />
          </div>
        </div>

        <button
          className="absolute top-4 left-4 flex items-center text-white font-bold hover:text-[#FF9F43]"
          onClick={onBack}
        >
          <Image src="/assets/StarShining.png" alt="Back Icon" width={24} height={24} />
          <span className="ml-2">Back</span>
        </button>

        {/* Description */}
        <div className="ml-4 w-[25vw]">
          <h1 className="text-white font-bold text-2xl">{data.name}</h1>
          <h2 className="text-[#FFBD59] font-semibold text-xl">{data.nickname}</h2>
          <div className="mt-4">
            <h3 className="font-bold text-white">Deskripsi</h3>
            <p className="text-white mt-2">{data.description}</p>
          </div>
          <div className="mt-4">
            <h3 className="font-bold text-white">Syarat</h3>
            <p className="text-white">{data.requirements}</p>
          </div>

          {/* Register Button */}
          <div className="mt-6">
            <Button
              className="bg-white text-[#FF6F3C] px-4 py-2 rounded font-bold shadow-md hover:bg-[#FF6F3C] hover:text-white"
              onClick={onDaftar}
            >
              Daftar
            </Button>
          </div>
        </div>

        {/* Dice Decorations */}
        <div className="absolute bottom-4 right-16 w-[100px] h-[100px]">
          <Image
            src="/assets/Dice3.png"
            alt="Dice Decoration"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className="absolute bottom-12 right-8 w-[100px] h-[100px]">
          <Image
            src="/assets/Dice4.png"
            alt="Dice Decoration"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;