import React, { useEffect } from 'react';
import HeroSectionLan from './HeroSectionLan';
import HeaderLan from './HeaderLan';
import PricingLan from './PricingLan';
import FooterLanding from './FooterLanding';

function LandingApp() {
    useEffect(() => {
    if (window.location.hostname === 'www.qr.cloudymenu.com') {
      // Redirect to 'https://www.cloudymenu.com'
      window.location.href = 'https://www.cloudymenu.com';
    }
  }, []);
  return (
    <div className='bg-[#c8ffdd]'>
      <HeroSectionLan />
      <PricingLan />
      <FooterLanding />
    </div>
  );
}

export default LandingApp;
