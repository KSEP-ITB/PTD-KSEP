// Components Import
import HeaderLayout from '../HeaderLayout';

// Assets Import
import Dice from '@/public/assets/Dice2.png';
import Sparkle from '@/public/assets/StarShining.png';

const CaKSEPHeader = () => {
  return (
    <HeaderLayout
      background="bg-gradient-to-r from-[#FDC830] to-[#FF9F43]"
      title="KAJASEP"
      titleColor="text-transparent bg-clip-text bg-gradient-to-r from-[#FDC830] to-white"
      images={[
        {
          src: Dice,
          alt: 'Dice',
          className: 'absolute -left-[200px] top-[60px] md:-left-[150px] md:top-[40px]',
          width: 368,
          height: 368,
        },
        {
          src: Sparkle,
          alt: 'Sparkle',
          className: 'absolute -top-[150px] -right-[120px] md:-top-[100px] md:-right-[80px]',
          width: 350,
          height: 350,
        },
      ]}
    />
  );
};

export default CaKSEPHeader;