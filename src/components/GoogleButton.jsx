import React from 'react'
import { FcGoogle } from "react-icons/fc";

function googleButton({handleButton, buttonText}) {
  return (
    <>
      <button
          onClick={handleButton}
          className="flex items-center justify-center w-full px-6 py-2 mt-3 text-gray-700 border border-black rounded-full bg-white hover:bg-gray-100 transition-all duration-200"
        >
          <FcGoogle className="text-2xl mr-3" />
          <span className="text-base font-medium">{buttonText} with Google</span>
        </button>
    </>
  )
}

export default googleButton