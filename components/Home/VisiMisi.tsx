import Image from "next/image"
import WhatIs from "@/public/What is Pendidikan Tingkat Dasar KSEP_.png"
import Logo from "@/public/LOGO.svg"
import Star from "@/public/Star 2.svg"
import Visi from "@/public/Visi.svg"
import Misi from "@/public/Misi.svg"
import Card from "@/public/CARD 4 1.svg"
import Dadu from "@/public/DADU 1 1.svg"

const VisiMisi = () => {
  return (
    <section>
        <div className='h-full bg-gradient-to-br from-[#F9AFB6] to-[#FFEFC7] flex flex-col items-center justify-center relative'>
            <Image 
                src={Card}
                alt="Card"
                className="absolute left-0 z-0 top-0"
            />
            <Image 
                src={Dadu}
                alt="Dadu"
                className="absolute right-0 z-0 bottom-0"
            />
            <div className='grid md:grid-cols-2 gap-5 pt-20 relative'>
                <div className="z-10 flex justify-center md:justify-end">
                    <Image 
                        src={Logo}
                        alt="Logo"
                    />
                </div>
                <div className="flex flex-col px-10 md:pr-16">
                    <Image 
                        src={WhatIs}
                        alt="Title"
                        className="z-10"
                    />
                    <Image 
                        src={Star}
                        alt="Star"
                        className="absolute z-0 md:left-[45%] md:top-0 top-[50%] left-0"
                    />
                    <p className="text-[#3E205A] p-5 bg-white/60 rounded-lg mt-5">Pendidikan Tingkat Dasar KSEP ITB is a place to learn about the world of economics and capital markets as well as a place for applicants to join and fulfill the profiles held by KSEP ITB</p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 pb-32 gap-10 px-10 pt-20">
                <div>
                    <div className="relative">
                        <p className="text-white font-[500] bg-gradient-to-b from-[#3E205A] to-[#E84756] p-5 pt-8 border-solid border-white border-[6px] rounded-3xl overflow-hidden shadow-2xl">Rorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus.</p>
                        <Image 
                            src={Visi}
                            alt="Visi"
                            className="absolute -top-10 right-0 w-[150px]"
                        />
                    </div>
                </div>
                <div>
                    <div className="relative">
                        <p className="text-white font-[500] bg-gradient-to-b from-[#3E205A] to-[#E84756] p-5 pt-8 border-solid border-white border-[6px] rounded-3xl overflow-hidden shadow-2xl">Rorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus.</p>
                        <Image 
                            src={Misi}
                            alt="Visi"
                            className="absolute -top-10 right-0 w-[150px]"
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default VisiMisi
