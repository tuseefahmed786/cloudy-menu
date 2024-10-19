import React from 'react';
import pricingImage from '../../assests/pricing.png'
const PricingLan = () => {
  return (
    <section className="py-5 sm:py-16 bg-white" >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl sm:text-6xl max-w-[600px] font-extrabold text-gray-900 my-4">
          How much does Cloud Menu cost?
        </h2>
        <div className="flex bg-gray-50 flex-col-reverse md:flex-row py-4 sm:py-7 px-4 sm:px-6 shadow flex-wrap gap-8 rounded-3xl w-full justify-between">
            <div className=''>
            <h3 className="text-2xl sm:text-4xl font-bold text-gray-900">Simple & cost-effective pricing</h3>
            <ul id="pricing" className='list-decimal ml-5 sm:ml-7 py-5 text-sm'>
              <li>Unlimited access to digital menu creation</li>
              <li>Customer ordering through the platform</li>
              <li>Real-time updates and menu management</li>
              <li>Basic support (email or chat)</li>
            </ul>
            <p className="text-4xl font-bold cloud-menu-color sm:mt-4">AED 80/month</p>
            <a
              href="https://emenu-sandy.vercel.app/late-cafe-ae"
              className="inline-block cloud-menu-bg text-white px-6 py-3 rounded-lg text-lg font-bold hover:bg-green-600 mt-4"
            >
              Demo Now
            </a>
            </div>
            <div className=''>
              <img src={pricingImage} width={370} alt='pricing here'/>
            </div>
          {/* </div> */}
        
        </div>
      </div>
    </section>
  );
};

export default PricingLan;
