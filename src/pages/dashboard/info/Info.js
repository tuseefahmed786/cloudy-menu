import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Info = () => {
    const Navigate = useNavigate()
    const [formData, setFormData] = useState({
        restaurantName: '',
        country: 'UAE',
        timeZone: 'Asia/Karachi',
    });
    const token = localStorage.getItem('token'); 

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post("http://localhost:3002/restaurant", {
            formData
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization':`${token}`
            }
        })
        console.log(res.data.restaurant)

        localStorage.setItem('resData',JSON.stringify(res.data.restaurant))
        // Navigate("/dashboard/edit")
    };

useEffect(() => {
    const storedRes = localStorage.getItem('resData');
    const resObject = JSON.parse(storedRes);
    console.log(resObject)
    setFormData({
        restaurantName: resObject?.name,
        country: resObject?.country,
        timeZone: resObject?.timeZone,
    })
}, [])


    return (
        <div className="max-w-md mx-auto flex justify-center h-full flex-col p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-6">Business Info</h2>
         
            <form onSubmit={handleSubmit}>
                {/* Restaurant Name */}
                <div className="mb-4">
                    <label htmlFor="restaurantName" className="block text-sm font-medium mb-1">
                        Restaurant name *
                    </label>
                    <input
                        type="text"
                        name="restaurantName"
                        id="restaurantName"
                        value={formData.restaurantName}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter restaurant name"
                        required
                    />
                </div>

                {/* Country */}
                <div className="mb-4">
                    <label htmlFor="country" className="block text-sm font-medium mb-1">
                        Country
                    </label>
                    <select
                        name="country"
                        id="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="UAE">UAE</option>
                        <option value="Saudia Arabia">Saudia Arabia</option>
                        <option value="Qatar">Qatar</option>
                        <option value="Bahiran">Bahiran</option>
                    </select>
                </div>

                {/* timeZone */}
                <div className="mb-4">
                    <label htmlFor="timeZone" className="block text-sm font-medium mb-1">
                        timeZone
                    </label>
                    <select
                        name="timeZone"
                        id="timeZone"
                        value={formData.timeZone}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="Asia/Karachi">Asia/Karachi</option>
                        <option value="Asia/UAE">Asia/UAE</option>
                        <option value="America/New_York">America/New_York</option>
                        <option value="Europe/London">Europe/London</option>
                    </select>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Info;
