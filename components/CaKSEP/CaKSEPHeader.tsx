// Components Import
import HeaderLayout from '../HeaderLayout';

// Assets Import
import Dice from '@/public/assets/Dice4.png';
import Pawn from '@/public/assets/Pawn1.png'

const CaKSEPHeader = () => {
  return (
    <HeaderLayout
      background="bg-gradient-to-tr from-[#FF5F6D] to-[#FFC371]"
      title="KAJASEP"
      titleColor="text-white"
      images={[
        {
          src: Pawn,
          alt: '',
          className: 'absolute left-[200px] top-[60px] md:-left-[70px] md:top-[80px]',
          width: 200,
          height: 200,
        },
        {
          src: Dice,
          alt: 'Dice',
          className: 'absolute -bottom-[150px] -right-[120px] md:top-[50px] md:-right-[80px]',
          width: 300,
          height: 300,
        },
      ]}
    />
  );
};

export default CaKSEPHeader;