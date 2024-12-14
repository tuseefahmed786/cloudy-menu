import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
const Info = () => {
  const [activeSection, setActiveSection] = useState(null);
  const location = useLocation();
  const getPath = location.pathname.split("/").pop();

  useEffect(() => {
    setActiveSection(getPath);
  }, [getPath]);

  return (
    //h-full bg-white sm:shadow-md sm:rounded-lg mx-auto

    <>
      <div className="px-4">
        <h1 className="text-2xl pt-3 sm:pt-6 pb-3 font-bold">
          Restaurant settings
        </h1>
        <ul className="flex scrollx sm:mt-2 whitespace-nowrap sm:overflow-hidden overflow-x-scroll w-full sm:w-fit rounded-t bg-white border  border-[#dadada]">
          <li
            className={`${
              activeSection == "info" ? "border-b-2 border-b-[#22c55e]" : ""
            } py-2 px-4 sm:py-3  sm:px-9 border-r hover:cursor-pointer`}
          >
            <Link to="/dashboard/info" className="text-sm">
              General
            </Link>
          </li>
          <li
            className={`${
              activeSection == "logo" ? "border-b-2 border-b-[#22c55e]" : ""
            }  py-2 px-4 sm:py-3 sm:px-9 border-r hover:cursor-pointer`}
          >
            <Link to="logo" className="text-sm">
              Appearance
            </Link>
          </li>
          <li
            className={`${
              activeSection == "social" ? "border-b-2 border-b-[#22c55e]" : ""
            }  py-2 px-4 sm:py-3 sm:px-9 border-r hover:cursor-pointer`}
          >
            <Link to="social" className="text-sm">
              Social Form
            </Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </>
  );
};

export default Info;
