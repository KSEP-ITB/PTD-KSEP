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
}

const ProfilePage: React.FC<ProfilePageProps> = ({ data }) => {
  return (
    <div className="bg-gray-900 h-screen p-8 text-white flex justify-center items-center">
      <div className="relative bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-lg shadow-lg flex items-center">
        {/* Back Button */}
        <button className="absolute top-4 left-4 flex items-center text-red-500 font-bold">
          <Image src="/StarShining.png" alt="Back Icon" width={24} height={24} />
          <span className="ml-2">Back</span>
        </button>

        {/* Profile Image Stack */}
        <div className="relative w-[200px] h-[200px]">
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
              className="rounded-lg z-10"
            />
          </div>
        </div>

        {/* Description */}
        <div className="ml-6">
          <h1 className="text-red-600 font-bold text-2xl">{data.name}</h1>
          <h2 className="text-yellow-500 font-semibold text-xl">{data.nickname}</h2>
          <div className="mt-4">
            <h3 className="font-bold">Deskripsi</h3>
            <p className="text-gray-700 mt-2">{data.description}</p>
          </div>
          <div className="mt-4">
            <h3 className="font-bold">Syarat</h3>
            <p className="text-gray-700">{data.requirements}</p>
          </div>

          {/* Register Button */}
          <div className="mt-6">
            <Button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
              Daftar
            </Button>
          </div>
        </div>

        {/* Dice Decorations */}
        <div className="absolute bottom-4 right-16 w-[100px] h-[100px]">
          <Image
            src="/Dice3.png"
            alt="Dice Decoration"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className="absolute bottom-12 right-8 w-[100px] h-[100px]">
          <Image
            src="/Dice4.png"
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
