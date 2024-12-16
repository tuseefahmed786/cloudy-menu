import React from 'react';
const PricingLan = () => {
  return (
    <section className="py-5 sm:py-16 bg-white" >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl sm:text-6xl max-w-[600px] font-medium text-gray-900 my-4">
          How much does Cloud Menu cost?
        </h2>
        <div className="flex flex-col-reverse bg-[#c8ffdd] md:flex-row py-4 sm:py-7 px-4 sm:px-6 shadow flex-wrap gap-8 rounded-2xl sm:rounded-3xl w-full justify-between">
            <div className=''>
            <h3 className="text-2xl sm:text-4xl font-normal text-gray-900">Simple & cost-effective pricing</h3>
            <ul id="pricing" className='list-decimal ml-5 sm:ml-7 py-5 text-sm'>
              <li>Unlimited access to digital menu creation</li>
              <li>Customer ordering through the platform</li>
              <li>Real-time updates and menu management</li>
              <li>Basic support (email or chat)</li>
            </ul>
            <p className="text-3xl font-medium cloud-menu-color sm:mt-4">AED 50/month</p>
            <a
              href="https://emenu-sandy.vercel.app/late-cafe-ae"
              className="inline-block cloud-menu-bg text-white w-full sm:w-fit text-center px-6 py-3 rounded-lg text-base font-medium hover:bg-green-600 mt-4"
            >
             Get Your Demo Now
            </a>
            </div>
            <div className=''>
              <img src="https://res.cloudinary.com/dlefxmkgz/image/upload/v1734310001/urjnacbklq8mntb9856j.png" width={370} alt='pricing here'/>
            </div>
          {/* </div> */}
        
        </div>
      </div>
    </section>
  );
};

export default PricingLan;
