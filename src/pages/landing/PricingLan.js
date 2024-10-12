import React from 'react';

const PricingLan = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
          How much does Cloud Menu cost?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-50 p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold text-gray-900">Simple & cost-effective pricing</h3>
            <p className="text-4xl font-bold text-green-500 mt-4">AED 75/month</p>
            <a
              href="https://emenu-sandy.vercel.app/late-cafe-ae"
              className="inline-block bg-green-500 text-white px-6 py-3 rounded-lg text-lg font-bold hover:bg-green-600 mt-4"
            >
              Demo Now
            </a>
          </div>
          <div className="bg-green-500 text-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold">Simple & cost-effective pricing 20% Off</h3>
            <p className="text-4xl font-bold mt-4">AED 720/Yearly</p>
            <a
              href="https://emenu-sandy.vercel.app/late-cafe-ae"
              className="inline-block bg-white text-green-500 px-6 py-3 rounded-lg text-lg font-bold hover:bg-green-100 mt-4"
            >
              Demo Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingLan;
