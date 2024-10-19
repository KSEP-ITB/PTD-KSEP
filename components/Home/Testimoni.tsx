import Image from "next/image"
import Title from "@/public/What Those Who Have Joined Say To Pendidikan Tingkat Dasar KSEP_.png"
import Star from "@/public/STAR 3.svg"

const Testimoni = () => {
  return (
    <section>
        <div className='h-full bg-gradient-to-br from-[#A958A7] to-[#3E205A] flex flex-col items-center justify-center py-20 relative'>
            <Image 
                src={Star}
                alt="Star"
                className="absolute top-10 md:top-0 left-0 z-0 w-[20vw]"
            />
            <Image 
                src={Title}
                alt="Title"
                className="pb-10 w-[90%] md:w-[70%] z-10"
            />
            <div className="grid md:grid-cols-3 xl:gap-10 xl:px-20 z-10 px-10 gap-5">
                <div className="bg-gradient-to-b from-[#F5C3EE] to-[#A74899] border-[3px] rounded-2xl overflow-hidden py-10 px-2">
                    <p className="font-[700] text-3xl text-[#C72F11] white-stroke-text-title pl-[20px] pr-[20px]">Yakob</p>
                    <p className="font-[700] text-[#FFF2B0] text-lg px-[18px] mt-2">Teknik Telekomunikasi ‘23</p>
                    <p className="text-white font-[500] px-[18px] md:text-sm lg:text-base mt-4">"Awalnya si masuk karena fomo wkwk. Tapi setelah dapet ilmu tentang mengelola keuangan, investasi, dan masih banyak lagi, jujur bersyukur bisa masuk unit ini karena ilmu yang didapatkan disini itu berguna banget. Koneksinya yang aku dapet juga banyak dan kualitasnya beneran gak main-main sih. Worth it lah pokoknya!"</p>
                </div>
                <div className="bg-gradient-to-b from-[#F5C3EE] to-[#A74899] border-[3px] rounded-2xl overflow-hidden py-10 px-2">
                    <p className="font-[700] text-3xl text-[#C72F11] white-stroke-text-title pl-[20px] pr-[20px]">Anthony Alden</p>
                    <p className="font-[700] text-[#FFF2B0] text-lg px-[18px] mt-2">Teknik Elektro ‘23</p>
                    <p className="text-white font-[500] px-[18px] md:text-sm lg:text-base mt-4">"Sebenarnya di KSEP awalnya aku mikir isinya bakalan sangat kaku dan pada pendiem karena salah satu poin utamanya adalah profesionalitas. Tapi abis aku jalanin, berasa kekeluargaannya itu kuat dan ternyata poin profesionalitasnya itu terlaksana dalam bentuk kekeluargaan. Aku juga berterima kasih karena dengan masuk KSEP, aku lebih terbantu dalam belajar lebih banyak tentang ekonomi, pasar modal, dan bahkan hal-hal lebih general seperti public speaking."</p>
                </div>
                <div className="bg-gradient-to-b from-[#F5C3EE] to-[#A74899] border-[3px] rounded-2xl overflow-hidden py-10 px-2">
                    <p className="font-[700] text-3xl text-[#C72F11] white-stroke-text-title pl-[20px] pr-[20px]">Valerine</p>
                    <p className="font-[700] text-[#FFF2B0] text-lg px-[18px] mt-2">Teknik Elektro ‘23</p>
                    <p className="text-white font-[500] px-[18px] md:text-sm lg:text-base mt-4">“Aku sama temen-temen lain awalnya tertarik buat daftar abis ngeliat booth KSEP di OHU, dan pas ikut PTD ternyata seru banget, belajarnya dapet, kekeluargaannya dapet juga. Setelah masuk KSEP, aku yang awalnya gatau apa-apa soal investasi jadi bisa belajar banyak, plus dapet banyak relasi juga.”</p>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Testimoni
