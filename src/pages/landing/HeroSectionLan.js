import React from 'react';
import menu from '../../assests/menu1.png'
const HeroSectionLan = () => {
  return (
    <section className="pt-9">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center">
        <div className="w-full lg:w-1/2">
          <h1 className="text-4xl md:text-6xl md:px-6 font-extrabold text-gray-900 mb-2 md:mb-4">
            The fastest way to create a digital menu
          </h1>
          <p className="text-base sm:text-xl sm:px-6 text-gray-600 mb-3 sm:mb-6">
            Create and manage your digital QR menu with our easy and user-friendly platform.
          </p>
          <a
            href="https://emenu-sandy.vercel.app/late-cafe-ae"
            className="inline-block md:mx-6 underline cloud-menu-bg text-base md:text-lg text-white px-4 sm:px-6 py-3 rounded-lg text-lg font-bold hover:bg-green-600"
          >
            Demo Cloud Menu
          </a>
        </div>
        <div className="w-full lg:w-1/2 mt-5 lg:mt-0 pt-3 flex justify-center">
          <img width={259} src={menu} alt="Digital menu example" />
        </div>
      </div>
    </section>
  );
};

export default HeroSectionLan;
