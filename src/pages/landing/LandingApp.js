import React, { useEffect } from "react";
import PricingPlan from "./PricingPlan";
import FooterLanding from "./FooterLanding";
import Hero from "./Hero";
import Testimonials from "./Testimonials";

function LandingApp() {
  return (
    <>
      <Hero />
      <PricingPlan />
      <Testimonials />
      <FooterLanding />
    </>
  );
}

export default LandingApp;
