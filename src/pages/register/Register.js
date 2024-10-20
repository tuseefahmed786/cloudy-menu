import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assests/favicon.png'
import menuImage from '../../assests/register.png'
import Isloading from '../../components/Isloading'
function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [restaurantName, setRestaurantName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isEmailValidate, setIsEmailValidate] = useState(false)
  const [isValidName, setIsValidName] = useState(false)

  const navigate = useNavigate()
  const registerInDb = async (e) => {
    setIsLoading(true)
    setIsEmailValidate(false)
    setIsValidName(false)


    e.preventDefault()
    try {// https://menuserver-eight.vercel.app
      const registered = await axios.post("http://localhost:3002/signup", {
        email,
        password,
        restaurantName
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      console.log('you are registered', registered.data)
      navigate("/login")

    } catch (error) {
      if (error.response.status == 409 && error.response.data == "Email already exists") {
        setIsEmailValidate(true)
        setIsLoading(false)
      }
      if (error.response.status == 409 && error.response.data == "Restaurant name already exists") {
        setIsValidName(true)
        setIsLoading(false)
      }
    }
  }

  return (
    <>
      <div className='flex sm:h-screen flex-col-reverse sm:flex-row-reverse'>
        <div className=' bg-[#B3C7FA] flex-1 hidden sm:flex justify-center items-center shadow-lg'>
          <img src={menuImage} width={300} alt='image here' />
        </div>

        <div className="flex min-h-full flex-1 flex-col justify-center px-3 sm:px-6 py-5 sm:py-8 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <div className='flex justify-center items-center  gap-3 sm:gap-5'>
              <img src={logo} width={45} alt='logo here' />
              <h1 className="text-2xl font-bold text-center cloud-menu-color pt-1">Cloud Menu</h1>
            </div>

            <h2 className="pt-6 sm:pt-7 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign up as Cloud Menu
            </h2>
          </div>

          <div className="pt-5 sm:pt-7 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              onSubmit={registerInDb}
            >
              <div>
                <label htmlFor="restaurantName" className="block text-sm font-medium leading-6 text-gray-900">
                  Restaurant Name     </label>
                <div className="mb-3 mt-2">
                  <input
                    id="restaurantName"
                    name="restaurantName"
                    type="text"
                    placeholder='Enter Your Restaurant Name'
                    required
                    value={restaurantName}
                    onChange={(e) => setRestaurantName(e.target.value)}
                    className={`${isValidName ? "border-red-500 border-1  ring-red-500 text-red-500" : "border-0 ring-gray-300 text-gray-900"} block px-3 w-full rounded-md py-2 sm:py-[10px] shadow-sm ring-1 ring-inset  placeholder:text-gray-400 sm:text-sm sm:leading-6`}
                  />
                  {isValidName &&<p className="font-medium text-red-500 text-xs pt-1">Please use other Name! It's already used</p>}
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder='Enter Your Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    className={`${isEmailValidate ? "border-red-500 border-1  ring-red-500 text-red-500" : "border-0 ring-gray-300 text-gray-900"} block px-3 w-full rounded-md py-2 sm:py-[10px] shadow-sm ring-1 ring-inset  placeholder:text-gray-400 sm:text-sm sm:leading-6`}
                  />
                  {isEmailValidate && <p className="font-medium text-red-500 text-xs pt-1">Please use another email! It's already used</p>}
                </div>
              </div>

              <div className='pt-3 sm:pt-3'>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>

                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    placeholder='Enter Your Password'
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    className="block px-3 w-full rounded-md border-0 py-2 sm:py-[10px] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md cloud-menu-bg mt-3 sm:mt-5 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#31ad5f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {isLoading ? <Isloading width="w-6" height="h-6" /> : 'Sign up'}
                </button>
              </div>
            </form>

            <p className="pt-4 sm:pt-6 text-center text-xs sm:text-sm text-gray-500">
              Already Register?{' '}
              <Link to="/login" className="font-semibold leading-6 cloud-menu-color hover:text-[#31ad5f]">
                Login In
              </Link>
            </p>
            {/* {
              isEmailValidate &&
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
                  <p className="text-sm font-medium text-red-700">your email or password are incorrect. Please Try Again!</p>
                </div>
              </div>
            } */}
          </div>

        </div>

      </div>
    </>
  )
}

export default Register
