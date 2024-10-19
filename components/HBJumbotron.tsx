import React from 'react'
import Image from 'next/image'
import Pawn from '../app/assets/Pawn2.png'
import Dice from '../app/assets/Dice5.png'
import Bubble1 from '../app/assets/Bubble1.png'
import Bubble2 from '../app/assets/Bubble2.png'
import Title from '../app/assets/HBTitle.png'

const Jumbotron = () => {
  return (
    <section className="relative bg-gradient-to-br from-[#0F389B] to-[#8CAAF4] align-middle justify-center overflow-hidden flex flex-col py-[4vw]">
      <Image src={Bubble1} alt="" width={550} height={550} className="absolute translate-y-[4vw] xl:w-[500px] w-[35vw]"/>
      <Image src={Pawn} alt="" width={300} height={300} className="absolute -translate-x-[1vw] translate-y-[5vw] xl:w-[250px] w-[15vw]"/>
      <Image src={Bubble2} alt="" width={550} height={550} className="absolute translate-x-[70vw] -translate-y-[2vw]"/>
      <Image src={Dice} alt="" width={400} height={400} className="absolute translate-x-[85vw] translate-y-[4vw] xl:w-[400px] w-[27.5vw]"/>
      <Image src={Title} alt = "Handbook" width={700} height ={700} className="mx-auto translate-x-[1.5vw] -translate-y-[1vw] xl:w-[700px] w-[60vw]"/>
    </section>
  )
}

export default Jumbotron