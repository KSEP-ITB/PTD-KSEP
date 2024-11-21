// Components Import
import HeaderLayout from '../HeaderLayout'

// Assets Import
import Dice from '@/public/assets/Dice1.png'
import Sparkle from '@/public/assets/StarShining.png'

const AnnouncementHeader = () => {
  return (
    <HeaderLayout
      background="bg-gradient-to-r from-[#7E1E8E] to-[#4A176A]" 
      title="ANNOUNCEMENT"
      titleColor="bg-gradient-to-r from-fuchsia-500 to-fuchsia-100"
      images={[
        { 
          src: Dice, 
          alt: 'Dice', 
          className: '-left-[250px] md:-left-[130px] top-[60px]', 
          width: 368, 
          height: 368 
        },
        { 
          src: Sparkle, 
          alt: 'Sparkle', 
          className: '-top-[170px] -right-[140px] md:-top-[100px] md:-right-[100px]', 
          width: 350, 
          height: 350 
        },
      ]}
    />
  )
}

export default AnnouncementHeader
