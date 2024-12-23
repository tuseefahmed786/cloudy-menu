import React from 'react';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation();
  return (
   <>
     <div className="pt-4 sm:pt-0 bg-gray-50 flex flex-col items-center">
      <main className="flex w-full flex-col lg:flex-row items-center ">
        <div className="lg:w-1/2 px-4 sm:px-6 lg:px-8 sm:p-9">
          <div className="sm:flex flex-wrap items-center space-x-2 mb-4 hidden">
            <span className="text-green-600 text-sm sm:text-lg">{t('excellent')}</span>
            <div className="flex">
              {/* Add stars */}
              <span>⭐⭐⭐⭐⭐</span>
            </div>
            <span className="text-gray-600">{t('reviews_on')}</span>
            <span className="text-green-500">{t('trustpilot')}</span>
          </div>
          <h1 className="text-5xl font-bold mb-4">
          {t('hero_title')}
          </h1>
          <p className="text-gray-700 mb-6">
          {t('hero_description')}
          </p>
          <div className="flex space-x-4">
            <a href='https://www.qr.cloudymenu.com/register' className="bg-[#00FF75] w-full text-center font-medium text-black text-sm px-6 py-3 rounded-lg">{t('create_menu_button')}</a>
          </div>
        </div>
        <div className="w-full sm:w-1/2 bg-transparent lg:bg-[#f4f4f4] flex justify-center px-6 pt-6">
          <img 
          className='w-60 sm:w-96 '
           src="https://res.cloudinary.com/dlefxmkgz/image/upload/v1734308301/yngeuxa2qvrwdhjpb9am.png" alt="Mobile App Screenshot" />
        </div>
      </main>
    </div>
    <div>
    <section className="bg-white pb-6 pt-6 sm:pt-24" id="about">
        <div className="px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">{t('how_it_works_title')}</h2>
          <p className="text-gray-700 mb-8">{t('how_it_works_description')}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a href="https://www.qr.cloudymenu.com/register">
            <div className="p-4 sm:py-8 bg-gray-100 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2">{t('steps.sign_up')}<span className="text-lg">➔</span></h3>
              <p className="text-gray-600">{t('steps.sign_up_description')}</p>
              
            </div>
            </a>
           <a href='https://www.qr.cloudymenu.com/register'>
           <div className="p-4 sm:py-8 bg-gray-100 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">{t('steps.prepare_menu')} <span className="text-lg">➔</span></h3>
              <p className="text-gray-600">{t('steps.prepare_menu_description')}</p>
            </div>
           </a>
          </div>
        
        </div>

        <div className="px-4 sm:px-6 lg:px-8 py-4">
     <a href="https://www.qr.cloudymenu.com/register">
     <div
          className="bg-black shadow-transparent sm:shadow-2xl gap-3 pt-4 md:gap-0 flex flex-col md:flex-row justify-around items-center rounded-2xl hover:cursor-pointer"
        >
          <div className="md:block hidden self-end pl-3">
            <img src="https://res.cloudinary.com/dlefxmkgz/image/upload/v1734308510/irtcdhwuueyc3f1cgdcz.png" alt="" width={200} />
          </div>
          <div>
            <h1 className="text-white text-center md:text-5xl text-4xl font-extrabold">
              {t('create_digital_menu')}
            </h1>
          </div>
          <div>
            <img
              src="https://res.cloudinary.com/dlefxmkgz/image/upload/v1734308301/yngeuxa2qvrwdhjpb9am.png"
              className="object-contain h-[250px] w-[250px]"
              alt=""
            />
          </div>
        </div>
     </a>
      </div>
      </section>
    </div>
   </>
  );
};

export default Hero;
