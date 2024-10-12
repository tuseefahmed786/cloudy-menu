import React from 'react';
import menu from '../../assests/menu.png'
const HeroSectionLan = () => {
  return (
    <section className="bg-gray-50 pt-9">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center">
        <div className="w-full lg:w-1/2">
          <h1 className="text-6xl px-6 font-extrabold text-gray-900 mb-4">
            The fastest way to create a digital menu
          </h1>
          <p className="text-xl px-6 text-gray-600 mb-6">
            Create and manage your digital QR menu with our easy and user-friendly platform.
          </p>
          <a
            href="https://emenu-sandy.vercel.app/late-cafe-ae"
            className="inline-block mx-6 underline bg-green-500 text-white px-6 py-3 rounded-lg text-lg font-bold hover:bg-green-600"
          >
            Demo Cloud Menu
          </a>
        </div>
        <div className="w-full lg:w-1/2 mt-10 lg:mt-0 pt-3 flex justify-center">
          <img width={259} src={menu} alt="Digital menu example" />
        </div>
      </div>
    </section>
  );
};

export default HeroSectionLan;
