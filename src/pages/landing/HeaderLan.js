import React from 'react';
import { Link } from 'react-router-dom';

const HeaderLan = () => {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex justify-between items-center w-full">
            <div className="flex-shrink-0 flex gap-3">
            {/* <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 0H32V32H0V0Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M24.1254 20.2956L13.3692 20.6512L14.0498 24.0195L24.806 23.6639L24.1254 20.2956Z" fill="#2BEC72"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M21.3663 17.8789L11.8325 18.2831L11.4484 14.9825L20.9822 14.5783L21.3663 17.8789Z" fill="black"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.3009 8.72777L5.61815 9.47536L6.43164 12.8223L17.1144 12.0747L16.3009 8.72777Z" fill="#2BEC72"/>
</svg> */}
<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 0H32V32H0V0Z" fill="#2BEC72"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M24.1254 20.2956L13.3692 20.6512L14.0498 24.0195L24.806 23.6639L24.1254 20.2956Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M21.3663 17.8789L11.8325 18.2831L11.4484 14.9825L20.9822 14.5783L21.3663 17.8789Z" fill="black"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.3009 8.72777L5.61815 9.47536L6.43164 12.8223L17.1144 12.0747L16.3009 8.72777Z" fill="white"/>
</svg>

              <h1 className="text-2xl font-bold text-green-500">Cloud Menu</h1>
            </div>
            <div className="hidden justify-center gap-7 sm:-my-px sm:ml-6 sm:flex">
              <a href="#" className="ml-4  text-gray-700 hover:text-green-500">
                Home
              </a>
              <a href="#" className="ml-4 text-gray-700 hover:text-green-500">
                Services
              </a>
              <a href="#" className="ml-4 text-gray-700 hover:text-green-500">
                Partners
              </a>
              <a href="#" className="ml-4 text-gray-700 hover:text-green-500">
                About Us
              </a>
            </div>
            <div>
            <Link
            to="/register"
            className="underline bg-green-500 text-white px-6 py-3 rounded-lg text-lg font-bold hover:bg-green-600"
          >
           Sign Up
          </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderLan;
