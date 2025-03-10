import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import slugify from "slugify";
import axios from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
import {
  setFreeTrails,
  setRestaurantData,
  setSocialLinks,
} from "../../redux/slice/infoSlice";
import Isloading from "../../components/Isloading";
import { useTranslation } from "react-i18next";

const DashboardLayout = () => {
  const { data: restaurantData, freeTrails } = useSelector((state) => state.info);
  const [fetchMenuLink, setFetchMenuLink] = useState("");
  const [isActive, setIsActive] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const baseUrl = window.location.origin;

useEffect(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const tokenFromUrl = urlParams.get("token");
  if (tokenFromUrl) {
    console.log("Extracted Token:", tokenFromUrl);
    localStorage.setItem("token", tokenFromUrl); // Save token if found in URL
    window.history.replaceState({}, document.title, window.location.pathname);
  } 
}, [])


  useEffect(() => {
    setIsActive(location.pathname.split("/").pop());
    const token = localStorage.getItem("token");
    const verifyToken = async () => {
      setIsLoading(true);
      try {
        await axios.get("/verifytoken", {
          headers: { Authorization: token },
        });
      } catch (error) {
        console.log(error);
        navigate("/login");
      }
    };
    const getUserData = async () => {
      try {
        const response = await axios.get("/api/restaurantData", {
          headers: { Authorization: token },
        });
        console.log(response)
        dispatch(setFreeTrails(response.data));
        dispatch(setRestaurantData(response.data));
        dispatch(setSocialLinks(response.data.social));
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
      }
    };

    if (restaurantData.length == 0) {
      verifyToken();
      getUserData();
    }
    
  }, [location.pathname]);

  useEffect(() => {
    const name = restaurantData.name;
    if (name) {
      const restaurantSlug = slugify(name, { lower: true });
      setFetchMenuLink(`/${restaurantSlug}`);
    }
  }, [restaurantData?.name]);

  const logoutUser = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.clear();
    navigate("/login");
  };

  if (isloading) {
    return (
      <>
        <div className="h-screen flex justify-center items-center">
          <Isloading width="w-20" height="h-20" />
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-col sm:w-screen overflow-hidden sm:h-screen">
      {/* Header and navigation code */}
      <div className="flex justify-start gap-3 items-center bg-[#ffffff] border">
        <div className="flex justify-start gap-1 sm:gap-3 px-2 sm:px-3 py-1 sm:py-2 items-center border-r">
          <img
            src="https://res.cloudinary.com/dlefxmkgz/image/upload/v1734308759/a7q5yuen7emg6aiv0duo.png"
            alt="Logo"
            className="w-11 border rounded"
          />
          <h1 className="text-black hidden sm:block">Cloud Menu</h1>
        </div>
        <div className="flex justify-start flex-col">
          <h1 className="text-black text-base font-semibold">
            {fetchMenuLink.slice(1).replace(/-/g, " ")}
          </h1>
          <Link
            to={fetchMenuLink}
            className="text-[9px] sm:text-xs sm:block hover:underline text-[#616161]"
          >
            {baseUrl}
            {fetchMenuLink}
          </Link>
        </div>
        <div className="flex justify-end items-center flex-grow gap-2 sm:gap-3 px-2 sm:px-4">
          {/* <h1 className='text-black text-base font-semibold'>En / Ar</h1> */}
          <div className="hidden sm:flex bg-[#22c55e] px-2 rounded py-2">
            <p className="text-sm font-normal text-white ">
              {(freeTrails === "monthly" || freeTrails === "yearly") &&
                `Your ${freeTrails} subscription is active`}
              {!isNaN(Number(freeTrails)) &&
                `Your free trial ends in ${freeTrails} days`}
              {freeTrails === "expiry" && "Your free trial has expired"}{" "}
            </p>
          </div>
          <div className="hover:cursor-pointer bg-[#f8f9fa] hover:bg-[#e1e2e3] px-2 rounded py-2">
            <p className="text-sm" onClick={logoutUser}>
              Log Out
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center sm:hidden bg-[#22c55e] px-2 py-2">
        <p className="text-xs text-white ">
          {(freeTrails === "monthly" || freeTrails === "yearly") &&
            `Your ${freeTrails} subscription is active`}
          {!isNaN(Number(freeTrails)) &&
            `Your free trial ends in ${freeTrails} days`}
          {freeTrails === "expiry" && "Your free trial has expired"}
        </p>
      </div>
      <div className="flex h-[80%] flex-grow flex-col sm:flex-row">
        <aside className="sm:w-1/5 sm:bg-[#ffffff] text-white p-4 border-r">
          <div className="scrollx flex sm:flex-col overflow-scroll sm:overflow-hidden">
            {/* Navigation Links */}
            <Link to="home">
              <div
                id="home"
                onClick={(e) => setIsActive(e.target.id)}
                className={`${isActive === "home"
                    ? "border-b-2 border-b-black sm:text-white sm:bg-green-500"
                    : "sm:bg-[#f1f4f9]"
                  } gap-2 items-center sm:border-[white] sm:mb-2 whitespace-nowrap sm:w-full flex text-left mr-4 sm:mr-0 sm:px-4 sm:py-2 sm:border-2 text-[#000000] sm:rounded-lg`}
              >
                <img
                  src="https://res.cloudinary.com/dlefxmkgz/image/upload/v1734309431/wyel9inlwvwsosrj6fqv.png"
                  className="hidden sm:block w-4"
                  alt="home image"
                />
                Home
              </div>
            </Link>
            <Link to="edit">
              <div
                onClick={(e) => setIsActive(e.target.id)}
                id="edit"
                className={`${isActive === "edit"
                    ? "border-b-2 border-b-black sm:text-white sm:bg-green-500"
                    : "sm:bg-[#f1f4f9]"
                  } gap-2 items-center sm:border-[white] sm:mb-2 whitespace-nowrap sm:w-full flex text-left mr-4 sm:mr-0 sm:px-4 sm:py-2 sm:border-2 text-[#000000] sm:rounded-lg`}
              >
                <img
                  src="https://res.cloudinary.com/dlefxmkgz/image/upload/v1734309431/zgzn725rblci74b6zktj.png"
                  className="hidden sm:block w-4"
                  alt=""
                />
                Edit Your Menu
              </div>
            </Link>
            <Link to="info">
              <div
                id="info"
                onClick={(e) => setIsActive(e.target.id)}
                className={`${isActive === "info" ||
                    isActive === "logo" ||
                    isActive == "social"
                    ? "border-b-2 border-b-black sm:text-white sm:bg-green-500"
                    : "sm:bg-[#f1f4f9]"
                  } gap-2 items-center sm:border-[white] sm:mb-2 whitespace-nowrap sm:w-full flex text-left mr-4 sm:mr-0 sm:px-4 sm:py-2 sm:border-2 text-[#000000] sm:rounded-lg`}
              >
                <img
                  src="https://res.cloudinary.com/dlefxmkgz/image/upload/v1734309431/wyel9inlwvwsosrj6fqv.png"
                  className="hidden sm:block w-4"
                  alt=""
                />
                Information
              </div>
            </Link>
            <Link to={fetchMenuLink}>
              <div
                id="view"
                className="sm:mb-2 border-b border-b-transparent sm:bg-[#f1f4f9] whitespace-nowrap sm:w-full items-center gap-2 flex text-left mr-4 sm:px-4 sm:py-2 border-2 border-[white] text-[#000000] rounded-lg"
              >
                <img
                  src="https://res.cloudinary.com/dlefxmkgz/image/upload/v1734309432/zzm4ta9jpng1mgcsa79n.png"
                  className="hidden sm:block w-4"
                  alt=""
                />
                View Your Menus &#x2197;
              </div>
            </Link>
            <Link to="view">
              <div
                id="view"
                onClick={(e) => setIsActive(e.target.id)}
                className={`${isActive === "view"
                    ? "border-b-2 border-b-black sm:text-white sm:bg-green-500"
                    : "sm:bg-[#f1f4f9]"
                  } sm:border-[white] items-center gap-2 sm:mb-2 whitespace-nowrap sm:w-full flex text-left mr-4 sm:mr-0 sm:px-4 sm:py-2 sm:border-2 text-[#000000] sm:rounded-lg`}
              >
                <img
                  src="https://res.cloudinary.com/dlefxmkgz/image/upload/v1734309432/mmpxgmslsiui6j8srnxx.png"
                  className="hidden sm:block w-4"
                  alt="icon"
                />
                Download QR
              </div>
            </Link>
            <Link to="subscription">
              <div
                id="subscription"
                onClick={(e) => setIsActive(e.target.id)}
                className={`${isActive === "subscription" || isActive === "subscription"
                    ? "border-b-2 border-b-black sm:text-white sm:bg-green-500"
                    : "sm:bg-[#f1f4f9]"
                  } gap-2 items-center sm:border-[white] sm:mb-2 whitespace-nowrap sm:w-full flex text-left mr-4 sm:mr-0 sm:px-4 sm:py-2 sm:border-2 text-[#000000] sm:rounded-lg`}
              >
                <img
                  src="https://res.cloudinary.com/dlefxmkgz/image/upload/v1734309431/wyel9inlwvwsosrj6fqv.png"
                  className="hidden sm:block w-4"
                  alt=""
                />
                subscription
              </div>
            </Link>
            <Link to="billing">
              <div
                id="billing"
                onClick={(e) => setIsActive(e.target.id)}
                className={`${isActive === "billing" || isActive === "billing"
                    ? "border-b-2 border-b-black sm:text-white sm:bg-green-500"
                    : "sm:bg-[#f1f4f9]"
                  } gap-2 items-center sm:border-[white] sm:mb-2 whitespace-nowrap sm:w-full flex text-left mr-4 sm:mr-0 sm:px-4 sm:py-2 sm:border-2 text-[#000000] sm:rounded-lg`}
              >
                <img
                  src="https://res.cloudinary.com/dlefxmkgz/image/upload/v1734309431/wyel9inlwvwsosrj6fqv.png"
                  className="hidden sm:block w-4"
                  alt=""
                />
                Billing
              </div>
            </Link>
          </div>
        </aside>

        <main className="sm:w-[80%] h-full sm:overflow-y-scroll bg-white sm:bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
