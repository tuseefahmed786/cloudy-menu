import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
const HeaderLan = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <header>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex justify-between items-center w-full">
              <div className="flex-shrink-0 flex gap-3 items-center">
                <img src="https://res.cloudinary.com/dlefxmkgz/image/upload/v1734308759/a7q5yuen7emg6aiv0duo.png" alt='logo' width={45} />
                <h1 className="text-xl sm:text-2xl font-bold cloud-menu-color">Cloud Menu </h1>
              </div>
              <div className="hidden justify-center gap-7 sm:-my-px sm:ml-6 md:flex">
                <Link to="/" className="ml-4 font-semibold text-gray-700 hover:text-green-500">
                  Home
                </Link>

                <a href="#plan" className="ml-4 font-semibold text-gray-700 hover:text-green-500">
                  Pricing
                </a>
                <a href="#about" className="ml-4 font-semibold text-gray-700 hover:text-green-500">
                  About
                </a>
                <a href="https://www.linkedin.com/company/cloud-menu-ae" className="ml-4 font-semibold text-gray-700 hover:text-green-500">
                  Contact Us
                </a>
              </div>
              <div className='hidden md:flex'>
              <div className='flex justify-center items-center gap-2'>
              <Link
                  to="https://www.qr.cloudymenu.com/register"
                  className=" cloud-menu-bg text-white px-3 py-2 rounded-md text-base font-medium hover:bg-green-600"
                >
                  Sign Up
                </Link>

                <Link
                  to="https://www.qr.cloudymenu.com/login"
                  className=" cloud-menu-bg text-white px-3 py-2 rounded-md text-base font-medium hover:bg-green-600"
                >
                  Login In                </Link>
              </div>
              </div>
              <div className="md:hidden flex justify-between items-center p-4">
                <button onClick={toggleNavbar} className="focus:outline-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-8 h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div>

        {/* Mobile Navbar */}
        {isOpen && (
          <div className="fixed inset-0 bg-black cloud-menu-bg z-50 flex flex-col justify-center items-center">
            <button
              onClick={toggleNavbar}
              className="absolute top-4 right-4 text-white text-2xl"
            >
              &times;
            </button>
            <nav className="flex flex-col space-y-6 text-white text-3xl">
              <a href="/#home" onClick={toggleNavbar}>Home</a>
              <a href="#plan" onClick={toggleNavbar}>Pricing</a>
              <a href="#about" onClick={toggleNavbar}>About</a>
              <a href="https://www.linkedin.com/company/cloud-menu-ae" onClick={toggleNavbar}>Contact</a>
              <Link to="https://www.qr.cloudymenu.com/login" onClick={toggleNavbar}>Login</Link>
              <Link to="https://www.qr.cloudymenu.com/register" onClick={toggleNavbar}>Sign Up</Link>
            </nav>
          </div>
        )}
      </div>
      <Outlet/>
    </>
  );
};

export default HeaderLan;
