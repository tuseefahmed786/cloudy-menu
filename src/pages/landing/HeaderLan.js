import React from 'react';
import { Link } from 'react-router-dom';

const HeaderLan = () => {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex justify-between items-center w-full">
            <div className="flex-shrink-0">
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
