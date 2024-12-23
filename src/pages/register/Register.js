import axios from "../../axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Isloading from "../../components/Isloading";
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailValidate, setIsEmailValidate] = useState(false);
  const [isValidName, setIsValidName] = useState(false);

  const navigate = useNavigate();

  const registerInDb = async (e) => {
    e.preventDefault();
    try {
      // https://menuserver-eight.vercel.app
      setIsEmailValidate(false);
      setIsValidName(false);
      setIsLoading(true);
      const registered = await axios.post(
        "/signup",
        {
          email,
          password,
          restaurantName,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      navigate("/login");
    } catch (error) {
      if (
        error.status == 409 &&
        error.response.data == "Email already exists"
      ) {
        setIsEmailValidate(true);
        setIsLoading(false);
      } else if (
        error.status == 409 &&
        error.response.data == "Restaurant name already exists"
      ) {
        setIsValidName(true);
        setIsLoading(false);
      } else {
        console.log(error);
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <div className="flex sm:h-screen flex-col-reverse sm:flex-row">
        <div className="flex min-h-full flex-col sm:w-2/4 justify-start px-3 sm:px-6 py-5 sm:py-3 lg:px-8">
          <div className="flex gap-3 items-center">
            <img
              src="https://res.cloudinary.com/dlefxmkgz/image/upload/v1734308759/a7q5yuen7emg6aiv0duo.png"
              alt="logo"
              width={45}
            />
         <a href="https://www.cloudymenu.com/">
         <h1 className="text-xl sm:text-2xl font-bold cloud-menu-color">
              Cloudy Menu
            </h1>
         </a>
          </div>
          <div className="flex flex-col justify-center h-full">
            <div className="sm:mx-auto flex gap-2 flex-col items-center sm:w-full sm:max-w-sm">
              <h2 className="pt-6 sm:pt-3  text-2xl font-bold leading-1 tracking-tight text-gray-900">
                Create your account
              </h2>
              <p className="text-sm">Sign up for a free account.</p>
            </div>

            <div className="pt-5 sm:pt-7 sm:mx-auto sm:w-full sm:max-w-sm">
              <form onSubmit={registerInDb}>
                <div>
                  <label
                    htmlFor="restaurantName"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Restaurant Name{" "}
                  </label>
                  <div className="mb-3 mt-1">
                    <input
                      id="restaurantName"
                      name="restaurantName"
                      type="text"
                      placeholder="Enter Your Restaurant Name"
                      required
                      value={restaurantName}
                      onChange={(e) => setRestaurantName(e.target.value)}
                      className={`${
                        isValidName
                          ? "border-red-500 border-1  ring-red-500 text-red-500"
                          : "border-0 ring-gray-300 text-gray-900"
                      } block px-3 w-full rounded-md py-[9px] shadow-sm ring-1 ring-inset  placeholder:text-gray-400 sm:text-sm sm:leading-6`}
                    />
                    {isValidName && (
                      <p className="font-medium text-red-500 text-xs pt-1">
                        Please use other Name! It's already used
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="Enter Your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      className={`${
                        isEmailValidate
                          ? "border-red-500 border-1  ring-red-500 text-red-500"
                          : "border-0 ring-gray-300 text-gray-900"
                      } block px-3 w-full rounded-md py-[9px]  shadow-sm ring-1 ring-inset  placeholder:text-gray-400 sm:text-sm sm:leading-6`}
                    />
                    {isEmailValidate && (
                      <p className="font-medium text-red-500 text-xs pt-1">
                        Please use another email! It's already used
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-3 sm:pt-3">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                  </div>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      placeholder="Enter Your Password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                      className="block px-3 w-full rounded-md border-0 py-[9px]  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md cloud-menu-bg mt-3 sm:mt-5 px-3 py-[9px]  text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#31ad5f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    {isLoading ? (
                      <Isloading width="w-6" height="h-6" />
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </div>
              </form>

              <p
                className="pt-2 flex gap-1 justify-center items-center
             sm:pt-3 text-xs sm:text-sm text-gray-500"
              >
                Already have an account?
                <Link
                  to="/login"
                  className="font-semibold leading-6 cloud-menu-color hover:text-[#31ad5f]"
                >
                  Login In
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="hidden sm:flex sm:w-2/4 justify-center items-center shadow-lg">
          <img
            src="https://res.cloudinary.com/dlefxmkgz/image/upload/v1734309718/flalaoqnzrhenpbvmebh.jpg"
            className="w-full h-full object-cover"
            alt="image here"
          />
        </div>
      </div>
    </>
  );
}

export default Register;
