import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";


function Restaurant() {
    const [restaurantName, setRestaurantName] = useState('')
    const [userName,setUserName] = useState('')
    const Navigate = useNavigate()
    
    const createRestaurant = async (e) => {
        e.preventDefault();
        setRestaurantName('')
        setUserName('')
    try {
        const response = await axios.post("http://localhost:3002/restaurants", {
            restaurantName,
            userName,
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        
        console.log("Response from backend that Restaurant is created in database:",response.data)
        Navigate('menu')
    } catch (error) {
        console.log("error in restaurant compo", error)
    }

    }

    return (
        <>
            <form
                onSubmit={createRestaurant}
                className="mb-4">
                <div className="mb-4">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                        Restaurant Name
                    </label>
                    <input
                        type="text"
                        id="category"
                        value={restaurantName}
                        onChange={(e) => setRestaurantName(e.target.value)}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                        User Name
                    </label>
                    <input
                        type="text"
                        id="category"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                >
                    Start The menu
                </button>
            </form>

        </>
    )
}

export default Restaurant