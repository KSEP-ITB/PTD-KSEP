import Image from "next/image";
import Star from "@/public/STAR TEXTURES 1.svg"
import Title from "@/public/Pendidikan Tingkat Dasar KSEP 2024.png"
import Dadu from "@/public/DADU alt 1 1.svg"
import Pawn from "@/public/PAWN 4 1.svg"
import Rail1 from "@/public/Uler tangga tp straight 1.svg"
import Rail2 from "@/public/Uler tangga tp straight 2.svg"

const Hero = () => {
  return (
    <section>
      <div className='min-h-screen h-full bg-gradient-to-br from-[#ED422E] to-[#FE9110] relative overflow-hidden flex flex-col items-center justify-center'>
        <p className="hidden w-full md:block text-white text-base md:text-xl z-20 pb-10 text-center"> ITB’s Kelompok Studi Ekonomi dan Pasar Modal Present </p>
        <Image src={Title} alt="Title" className="z-20 w-[90%] md:w-[60%]"/>
        <p className="bg-white px-4 py-2 lg:px-8 lg:py-4 rounded-full text-[#B91A19] mt-10 md:text-lg z-20 text-center"> Boarding Journey to Riches! </p>
        
        {/* Star Texture */}
        <div className="absolute bottom-0 flex z-0">
            <Image
            src={Star}
            alt="Star"
            />
            <Image
            src={Star}
            alt="Star"
            />
        </div>

        <Image 
        src={Rail1}
        alt="Rail"
        className="z-10 absolute left-0 top-0 w-[300px] md:w-[500px]"
        />
        <Image 
        src={Rail2}
        alt="Rail"
        className="z-10 absolute right-0 bottom-0 w-[500px] md:w-[700px]"
        />
        <Image 
        src={Dadu}
        alt="Dadu"
        className="z-10 absolute left-0 bottom-0 w-[200px] md:w-[300px]"
        />
        <Image 
        src={Pawn}
        alt="Pawn"
        className="z-10 absolute top-20 right-0 w-[150px] md:w-[200px]"
        />

      </div>
    </section>
  )
}

export default Hero
