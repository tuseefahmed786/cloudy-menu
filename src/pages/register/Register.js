import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assests/favicon.png'
import menuImage from '../../assests/register.png'
import Isloading from '../../components/Isloading'
function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isloading, setIsLoading] = useState(false)

   const navigate = useNavigate()
    const registerInDb = async (e) =>{
        e.preventDefault()
        setIsLoading(true)
        console.log(email,password)
       try {// https://menuserver-eight.vercel.app
        const registered = await axios.post("hhttps://menuserver-eight.vercel.app/signup",{
            email,
            password
        },{
            headers:{
                'Content-Type':'application/json'
            }
        })
        console.log('you are registered',registered.data)
        navigate("/login")
        //  here nagivate missing

       } catch (error) {
        console.log("error in register page",error)
       }
    }

  return (
    <>
<div className='flex h-screen flex-row-reverse'>
<div className='bg-[#B3C7FA] flex-1 flex justify-center items-center shadow-lg'>
  <img src={menuImage} width={300} alt='image here'/>
</div>

<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
<div className="sm:mx-auto sm:w-full sm:max-w-sm">
 <div className='flex justify-center items-center gap-5'>
 <img src={logo} width={45} alt='logo here'/>
 <h1 className="text-2xl font-bold text-center cloud-menu-color pt-1">Cloud Menu</h1>
 </div>

 <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
   Sign up as Cloud Menu
 </h2>
</div>

<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
 <form className="space-y-6" 
           onSubmit={registerInDb}
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
         onChange={(e)=>setEmail(e.target.value)}
         autoComplete="email"
         className="block px-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
       />
     </div>
   </div>

   <div>
     <div className="flex items-center justify-between">
       <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
         Password
       </label>
       <div className="text-sm">
         <a href="#" className="font-semibold cloud-menu-text">
           Forgot password?
         </a>
       </div>
     </div>
     <div className="mt-2">
       <input
         id="password"
         name="password"
         type="password"
         required
         value={password}
         onChange={(e)=>setPassword(e.target.value)}
         autoComplete="current-password"
         className="block px-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
       />
     </div>
   </div>

   <div>
     <button
       type="submit"
       className="flex w-full justify-center rounded-md cloud-menu-bg px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#31ad5f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
     >
       {isloading?<Isloading width="w-6" height="h-6"/>:'Sign up'}
     </button>
   </div>
 </form>

 <p className="mt-10 text-center text-sm text-gray-500">
   Already Register?{' '}
   <Link to="/login" className="font-semibold leading-6 cloud-menu-color hover:text-[#31ad5f]">
     Login In
   </Link>
 </p>
</div>
</div>
</div>
    </>
  )
}

export default Register
