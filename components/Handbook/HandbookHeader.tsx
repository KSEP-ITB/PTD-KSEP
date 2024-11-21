// Components Import
import HeaderLayout from '../HeaderLayout'

// Assets Import
import Pawn from '@/public/assets/Pawn1.png'
import Dice from '@/public/assets/Dice5.png'
import Bubble1 from '@/public/assets/Bubble1.png'
import Bubble2 from '@/public/assets/Bubble2.png'

const HandbookHeader = () => {
  return (
    <HeaderLayout
      background="bg-gradient-to-br from-[#0F389B] to-[#8CAAF4]"
      title="HANDBOOK"
      titleColor="bg-gradient-to-br from-indigo-300 to-indigo-200"
      images={[
        { src: Bubble1, alt: 'Bubble 1', className: 'translate-y-[4vw] w-[35vw]', width: 550, height: 550 },
        { src: Pawn, alt: 'Pawn', className: '-translate-x-[1vw] translate-y-[5vw] w-[15vw]', width: 300, height: 300 },
        { src: Bubble2, alt: 'Bubble 2', className: 'translate-x-[70vw] -translate-y-[2vw]', width: 550, height: 550 },
        { src: Dice, alt: 'Dice', className: 'translate-x-[85vw] translate-y-[4vw] w-[27.5vw]', width: 400, height: 400 },
      ]}
    />
  )
}

export default HandbookHeader
