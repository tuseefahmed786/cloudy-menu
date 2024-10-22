import React from 'react';
import menu from '../../assests/menu1.png'
import { Link } from 'react-router-dom';

const HeroSectionLan = () => {
  return (
    <section className="pt-10 sm:pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center">
        <div className="w-full lg:w-1/2">
          <h1 className="text-4xl text-center sm:text-left font-medium tracking-[-1px] md:text-6xl md:px-6 text-gray-900 mb-2 md:mb-4">
            The Fastest way to create a digital menu
          </h1>
          <p className="text-base text-center sm:text-left sm:text-lg sm:px-6 text-gray-600 mb-3 sm:mb-6">
            Create and manage your digital QR menu with our easy and user-friendly platform.
          </p>
          <Link
            to="register"
            className="inline-block w-full text-center  md:mx-6 cloud-menu-bg md:text-base text-white px-4 sm:px-6 py-3 rounded-sm sm:rounded-lg hover:bg-green-600"
          >
            Get Your Menu
          </Link>
        </div>
        <div className="w-full lg:w-1/2 mt-5 lg:mt-0 pt-6 sm:pt-3 flex justify-center">
          <img width={259} src={menu} alt="Digital menu example" />
        </div>
      </div>
    </section>
  );
};

export default HeroSectionLan;
