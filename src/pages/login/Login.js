import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Isloading from "../../components/Isloading";
import { useTranslation } from "react-i18next";
import { loginUserApi } from "../../api/api";
import GoogleButton from "../../components/GoogleButton";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [inCorrectPass, setInCorrectPass] = useState(false);
  const { t, i18n } = useTranslation()
  
  useEffect(() => {
    const lng = i18n.language;
    document.documentElement.setAttribute('dir', lng === 'ar' ? 'rtl' : 'ltr');
  }, [i18n.changeLanguage])

  const loginUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = await loginUserApi(email, password);
      localStorage.setItem("token", data.token);
      navigate("/dashboard/home");
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 400) {
        setInCorrectPass(true);
      }
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setInCorrectPass(false);
      }, 4000);
    }
  };
  const handleGoogleLogin = async () => {
    window.location.href = "https://menuserver-eight.vercel.app/google";
};
  return (
    <>
      <div className="flex sm:h-screen flex-col-reverse sm:flex-row-reverse">
        <div className="hidden sm:flex sm:w-2/4 flex-grow justify-center items-center shadow-lg">
          <img
            src="https://res.cloudinary.com/dlefxmkgz/image/upload/v1734309718/flalaoqnzrhenpbvmebh.jpg"
            className="w-full h-full object-cover"
            alt="image here"
          />
        </div>

        <div className="flex min-h-full sm:w-2/4 flex-grow flex-col justify-start px-3 sm:px-6 py-5 sm:py-3 lg:px-8">
          <div className="flex gap-3 items-center">
            <img src="https://res.cloudinary.com/dlefxmkgz/image/upload/v1734308759/a7q5yuen7emg6aiv0duo.png" alt="logo" width={45} />
            <a href="https://www.cloudymenu.com/">
              <h1 className="text-xl sm:text-2xl font-bold cloud-menu-color">
                {t('logo')}
              </h1>
            </a>
          </div>
          <div className="flex flex-col h-full justify-center">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="pt-6 sm:pt-0 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                {t('login_title')}              </h2>
            </div>

            <div className="pt-5 sm:pt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form onSubmit={loginUser}>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    {t('email_label')}                   </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      className="block px-3 w-full rounded-md border-0 py-[10px] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="pt-3 sm:pt-3">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      {t('password_label')}                        </label>
                  </div>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                      className="block px-3 w-full rounded-md border-0 py-[10px] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md cloud-menu-bg mt-3 sm:mt-5 px-3 py-[10px] text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#31ad5f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    {isLoading ? (
                      <Isloading width="w-6" height="h-6" />
                    ) : (
                      t('login_button')
                    )}
                  </button>
                </div>
              </form>
              <GoogleButton handleButton={handleGoogleLogin} buttonText="Sign in" />

              <p className="pt-4 sm:pt-6 text-center text-xs sm:text-sm text-gray-500">
                 {t('not_member')} 
                <Link
                  to="/register"
                  className="font-semibold leading-6 cloud-menu-color hover:text-[#31ad5f]"
                >
                   {t('register_link')}
                </Link>
              </p>
              {inCorrectPass && (
                <div className="mt-3 max-w-lg w-full p-4 items-center bg-red-50 border border-red-200 rounded-lg flex space-x-4">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-6 w-6 text-red-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12l2 2 4-4m0-6a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-red-700">
                      {t('incorrect_pass')}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
