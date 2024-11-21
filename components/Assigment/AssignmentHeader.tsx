// Components Import
import HeaderLayout from '../HeaderLayout'

// Assets Import
import Card1 from '@/public/assets/Card1.png'
import Dice1 from '@/public/assets/Dice1.png'
import UlarTangga from '@/public/assets/UlarTangga.png'

const AssignmentHeader = () => {
  return (
    <HeaderLayout
      background="bg-gradient-to-r from-[#FFCDE6] to-[#FFEFC7]"
      title="ASSIGNMENTS"
      titleColor="bg-gradient-to-r from-[#FF6B6B] to-[#FFB56B] text-transparent bg-clip-text"
      images={[
        { 
          src: UlarTangga, 
          alt: 'Snake and Ladder', 
          className: 'absolute -top-2 -right-4 w-[150px] md:w-[250px]', 
          width: 150, 
          height: 150 
        },
        { 
          src: Card1, 
          alt: 'Card', 
          className: 'absolute -left-12 w-[100px] md:w-[200px]', 
          width: 150, 
          height: 150 
        },
      ]}
    />
  )
}

export default AssignmentHeader
