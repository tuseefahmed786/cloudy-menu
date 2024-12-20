// Import necessary dependencies
import React, { useState } from 'react';

// TestimonialCard Component
const TestimonialCard = ({ logo, review, name }) => (
  <div className="bg-gray-100 shadow-md rounded-lg p-6 w-80 flex-shrink-0">
    {/* <img src={logo} alt={name} className="h-16 mx-auto mb-4" /> */}
    <p className="text-gray-700 text-center mb-4">{review}</p>
    <h4 className="text-center font-semibold text-lg">{name}</h4>
  </div>
);

// Main Component
const Testimonials = () => {
  // Testimonial data
  const testimonials = [
    {
      logo: 'https://via.placeholder.com/64',
      review: 'Our Customers Love Using QR Code Menu. They Can See Pictures, Descriptions, And Business Details In One Page. The Backend Website Is Super User Friendly.',
      name: 'Jack Somara',
    },
    {
      logo: 'https://via.placeholder.com/64',
      review: 'Good Service In This Country Is Hard To Come By And This Platform Is Everything Needed. It Is Simple To Use And Cost Effective. You Definitely Have My Recommendation!',
      name: 'Cena Loma',
    },
    {
      logo: 'https://via.placeholder.com/64',
      review: 'Delivery On Time As We Deal, Good Quality, My Customers Are Satisfied. From UAE To Brazil.',
      name: 'Ali Ahmed',
    },
    {
      logo: 'https://via.placeholder.com/64',
      review: 'Amazing Platform! Helped Us Streamline Our Menu Management And Increased Customer Satisfaction.',
      name: 'Maria Smith',
    },
    {
      logo: 'https://via.placeholder.com/64',
      review: 'The UI Is Clean, And The Functionality Is Just Perfect For Our Business Needs.',
      name: 'John Doe',
    },
    {
      logo: 'https://via.placeholder.com/64',
      review: 'We Have Been Using This Platform For Months, And It Has Transformed Our Operations.',
      name: 'Sarah Lee',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Navigation handlers
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-3 sm:pt-10">
  <div className='flex justify-between items-center px-'>
  <div>
  <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">What Our Client's Say</h2>
  <p className="text-center text-gray-600 mb-6">Excellent ⭐⭐⭐⭐⭐ 110+ Review On Trustpilot</p>
  </div>
      <div className='flex gap-2 p-4'>
    <button
          className="flex justify-center items-center border border-gray-100 bg-gray-200 rounded-full w-12 h-12 hover:bg-gray-300"
          onClick={handlePrev}
        >
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="24" viewBox="0 0 14 24" fill="none">
<path d="M3.12503 12.1588L2.77356 11.8032L3.12914 11.4517L12.7775 1.91448L13.1286 2.2697L12.7775 1.91447C12.9919 1.70254 13.0171 1.37054 12.8509 1.1311L12.7714 1.03786C12.5591 0.833624 12.2344 0.812121 11.9991 0.9754L11.9039 1.05669L1.47713 11.3628C1.26272 11.5747 1.23752 11.9067 1.40368 12.1462L1.48498 12.2415L11.7911 22.6682C12.0287 22.9086 12.4163 22.9109 12.6567 22.6732C12.8711 22.4613 12.8963 22.1293 12.7302 21.8899L12.6489 21.7946L3.12503 12.1588Z" fill="black" stroke="black"/>
</svg>
        </button>
        <button
          className=" flex justify-center items-center border border-gray-100 bg-gray-200 rounded-full w-12 h-12 hover:bg-gray-300"
          onClick={handleNext}
        >
       <svg xmlns="http://www.w3.org/2000/svg" width="14" height="24" viewBox="0 0 14 24" fill="none">
<path d="M1.15965 23.3041C0.767131 22.907 0.734833 22.289 1.06039 21.8555L1.16879 21.7314L10.8171 12.1942L1.28041 2.54534C0.887891 2.14824 0.855593 1.53021 1.18115 1.09673L1.28955 0.972632C1.68666 0.580117 2.30469 0.547819 2.73817 0.873378L2.86227 0.981781L13.1813 11.4215C13.5738 11.8186 13.6061 12.4367 13.2805 12.8702L13.1721 12.9943L2.73236 23.3133C2.29554 23.745 1.59141 23.7409 1.15965 23.3041Z" fill="black"/>
</svg>
        </button>
    </div>
  </div>
      <div className="flex justify-center items-center space-x-4 ">
       
        <div className="overflow-hidden w-full">
          <div
            className="flex gap-5 transition-transform duration-500"
            style={{ transform: `translateX(-${currentIndex * 320}px)` }}
          >
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                logo={testimonial.logo}
                review={testimonial.review}
                name={testimonial.name}
              />
            ))}
          </div>
        </div>
      
      </div>
    </div>
  );
};

export default Testimonials;
