import axios from 'axios'
import React, { useState } from 'react'
import logo from '../../assests/favicon.png'
import menuImage from '../../assests/register.png'
import { Link, useNavigate } from 'react-router-dom'
import Isloading from '../../components/Isloading'
import { useDispatch } from 'react-redux'
import { setRestaurantData } from '../../redux/slice/infoSlice'
function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [inCorrectPass, setInCorrectPass] = useState(false)
  
  const loginUser = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try { // https://menuserver-eight.vercel.app
      const logined = await axios.post("https://menuserver-eight.vercel.app/login", {
        email,
        password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const token = logined.data.token;
      localStorage.setItem('token', token);
      navigate("/dashboard/info")
    } catch (error) {
      if (error.status == 401 || error.status == 400) {
        setInCorrectPass(true)
        setIsLoading(false)
      }
    }finally{
      setTimeout(() => {
        setInCorrectPass(false);
    }, 4000);
    }
  }
  return (
    <>

      <div className='flex sm:h-screen flex-col-reverse sm:flex-row-reverse'>
        <div className='hidden sm:flex bg-[#B3C7FA] flex-1 justify-center items-center shadow-lg'>
          <img src={menuImage} width={300} alt='image here' />
        </div>

        <div className="flex min-h-full flex-1 flex-col justify-center px-3 sm:px-6 py-5 sm:py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          

            <h2 className="pt-6 sm:pt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Login as Cloud Menu
            </h2>
          </div>

          <div className="pt-5 sm:pt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              onSubmit={loginUser}
            >
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    className="block px-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className='pt-3 sm:pt-5'>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
               
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    className="block px-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md cloud-menu-bg mt-3 sm:mt-5 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#31ad5f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {isLoading ? <Isloading width="w-6" height="h-6" /> : "Sign In"}
                </button>
              </div>
            </form>

            <p className="pt-4 sm:pt-6 text-center text-xs sm:text-sm text-gray-500">
              Not a member?{' '}
              <Link to="/register" className="font-semibold leading-6 cloud-menu-color hover:text-[#31ad5f]">
                Now Register
              </Link>
            </p>
            {
        inCorrectPass &&
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
      }
          </div>
        </div>
      </div>

     
    </>
  )
}

export default Login
