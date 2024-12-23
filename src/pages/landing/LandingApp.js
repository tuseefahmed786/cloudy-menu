import React, {  } from "react";
import PricingPlan from "./PricingPlan";
import FooterLanding from "./FooterLanding";
import Hero from "./Hero";
import Testimonials from "./Testimonials";
import QRMenu from "./QRMenu";

function LandingApp() {
  return (
    <>
      <Hero />
      <PricingPlan />
      {/* <QRMenu /> */}
      <Testimonials />
      <FooterLanding />
    </>
  );
}

export default LandingApp;
 
