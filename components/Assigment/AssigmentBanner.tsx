import Image from 'next/image'
import UlarTangga from '@/app/assets/UlarTangga.png'
import Card1 from '@/app/assets/Card1.png'
import Dice1 from '@/app/assets/Dice1.png'
import StarTexture from '@/app/assets/StarTexture.png'
const Banner = () => {
  return (
    <div className="relative h-48 w-full overflow-hidden">
      {/* Background Gradient and Texture */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#FFCDE6] to-[#FFEFC7]">
        <Image
          src={StarTexture}
          alt="Star Texture"
          className="h-full w-full object-cover opacity-100"
        />
      </div>
      {/* Decorative Images */}
      <div className="absolute inset-0">
        <div className="relative h-full w-full">
          <Image
            src={UlarTangga}
            alt="Snake and Ladder"
            className="absolute right-0 top-0 h-48 w-auto object-contain"
          />
          <Image
            src={Card1}
            alt="Card"
            className="absolute left-0 top-0 h-48 w-auto object-contain"
          />
          <Image
            src={Dice1}
            alt="Dice"
            className="absolute bottom-0 left-1/4 h-24 w-auto object-contain"
          />
        </div>
      </div>
      {/* Title */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <h1 className="text-5xl font-bold text-[#FF6B6B]">ASSIGNMENTS</h1>
      </div>
    </div>
  )
}
export default Banner