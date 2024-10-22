import React from 'react';
import HeroSectionLan from './HeroSectionLan';
import HeaderLan from './HeaderLan';
import PricingLan from './PricingLan';
import FooterLanding from './FooterLanding';

function LandingApp() {
  return (
    <div className='bg-[#c8ffdd]'>
      <HeroSectionLan />
      <PricingLan />
      <FooterLanding />
    </div>
  );
}

export default LandingApp;
