// Import React
import React from 'react';
import { useTranslation } from 'react-i18next';

// Reusable PlanCard Component
const PlanCard = ({ title, subtitle, price, details, buttonText, buttonLink, isHighlighted, saveInfo }) => {
  return (
    <div className={`border ${isHighlighted ? 'border-2 border-[#00FF75]' : 'border-gray-300'} rounded-lg p-6`}>
      <h3 className="text-xl font-bold text-gray-800 mb-1">{title}</h3>
      {subtitle && <p className="text-sm text-gray-500 mb-2">{subtitle}</p>}
      <div className="flex items-center gap-2">
        <p className="text-2xl font-bold text-gray-800 mb-2">{price}</p>
        {/* {saveInfo && <p className="text-sm text-green-500 font-semibold mb-2">{saveInfo}</p>} */}
      </div>
      <a
        href={buttonLink}
        className="w-full flex bg-[#00FF75] text-black font-medium py-2 px-2 rounded-lg justify-center"
      >
        {buttonText}
      </a>
      <ul className="mt-6 space-y-2 text-gray-600">
        {details.map((detail, index) => (
          <li key={index}>&#10003; {detail}</li>
        ))}
      </ul>
    </div>
  );
};

// PricingPlan Component
const PricingPlan = () => {
  const plans = [
    {
      title: 'Free Trial',
      subtitle: 'For 7 days',
      price: 'Free',
      buttonText: 'Free Trial',
      buttonLink: 'https://www.qr.cloudymenu.com/register',
      details: [
        'Easy to use menu editor',
        'Design customization',
        'Shareable menu link',
        'QR code menu',
        'Tablet menu',
        'No setup fee',
        'No hidden cost',
      ],
    },
    {
      title: 'Pro /month',
      price: 'AED 49',
      subtitle: 'every month',
      buttonText: 'Go Pro /month',
      buttonLink: 'https://www.qr.cloudymenu.com/register',
      isHighlighted: true,
      details: [
        'Easy to use menu editor',
        'Design customization',
        'Shareable menu link',
        'QR code menu',
        'Tablet menu',
        'No setup fee',
        'No hidden cost',
      ],
    },
    {
      title: 'Pro /Yearly',
      price: 'AED 588',
      saveInfo: 'SAVE 19%',
      subtitle: 'one time, billed annually',
      buttonText: 'Go Pro /Yearly',
      buttonLink: 'https://www.qr.cloudymenu.com/register',
      details: [
        'Easy to use menu editor',
        'Design customization',
        'Shareable menu link',
        'QR code menu',
        'Tablet menu',
        'No setup fee',
        'No hidden cost',
      ],
    },
  ];
  const { t } = useTranslation();  // Get translation function
  const plansTranslation = t('plans', { returnObjects: true }); // Load plans from translation file

  return (
    
    <div className="bg-white py-10 px-5 sm:px-10">
      <h2 id="plan" className="text-2xl sm:text-6xl font-bold text-center mb-4">{t('choose_plan_title')}</h2>
      <p className="text-center text-gray-600 mb-10">
      {t('pricing_description')}
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {plansTranslation.map((plan, index) => (
          <PlanCard key={index} {...plan} />
        ))}
      </div>
    </div>
  );
};

export default PricingPlan;
