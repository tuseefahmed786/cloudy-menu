import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Isloading from '../../../components/Isloading';
import { setRestaurantData } from '../../../redux/slice/infoSlice';
import { useDispatch, useSelector } from 'react-redux';
const Info = () => {
    const [isValidName, setIsValidName] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isUploading, setUploading] = useState(false)
    const dispatch = useDispatch();
    const restaurantData = useSelector((state) => state.info.data);
    const token = localStorage.getItem('token');

    const [formData, setFormData] = useState({
        restaurantName: '',
        country: '',
        currency: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsValidName(false);
    
        if (/[^a-zA-Z0-9 ]/g.test(formData.restaurantName)) {
            return alert('Special characters are not allowed');
        }
    
        try {
            setUploading(true);
            const res = await axios.post("https://menuserver-eight.vercel.app/restaurant", { formData }, {
                headers: { 'Content-Type': 'application/json', 'Authorization': token }
            });
            setIsLoading(true);
            dispatch(setRestaurantData(res.data.restaurant));
        } catch (error) {
            if (error.response?.status === 409) {
                setIsValidName(true);
            }
        } finally {
            setUploading(false);
            setTimeout(() => setIsLoading(false), 5000);
        }
    };
    

    useEffect(() => {
        if (restaurantData) {
            setFormData({
                restaurantName: restaurantData?.name,
                country: restaurantData?.country,
                currency: restaurantData?.currency,
            })
        }
    }, [restaurantData])


    return (
        <div className="max-w-md mx-auto flex justify-center h-full flex-col pt-2 px-4 sm:p-6 bg-white sm:shadow-md sm:rounded-lg">
            <h2 className="text-2xl font-semibold mb-3 sn:mb-6">Business Info</h2>

            <form onSubmit={handleSubmit}>
                {/* Restaurant Name */}
                <div className="mb-3 sm:mb-4">
                    <label htmlFor="restaurantName" className="block text-sm font-medium mb-1">
                        Restaurant name *
                    </label>
                    <input
                        type="text"
                        name="restaurantName"
                        id="restaurantName"
                        value={formData.restaurantName}
                        onChange={handleChange}
                        className={`${isValidName ? "border-red-500 border-1  ring-red-500 text-red-500" : "border-0 ring-gray-300 text-gray-900"} block px-3 w-full rounded-md py-[14px] shadow-sm ring-1 ring-inset  placeholder:text-gray-400 sm:text-sm sm:leading-6`}

                        // className="w-full p-2 sm:p-3 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter restaurant name"
                        required
                    />
                    {isValidName && <p className="font-medium text-red-500 text-xs pt-1">Please use other name! It's already used</p>}

                </div>

                {/* Country */}
                <div className="mb-3 sm:mb-4">
                    <label htmlFor="country" className="block text-sm font-medium mb-1">
                        Country
                    </label>
                    <select
                        name="country"
                        id="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full p-2 sm:p-3 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="UAE">UAE</option>
                        <option value="Saudi Arabia">Saudia Arabia</option>
                        <option value="Qatar">Qatar</option>
                        <option value="Kuwait">Kuwait</option>
                        <option value="Bahrain">Bahrain</option>
                        <option value="Oman">Oman</option>
                    </select>
                </div>

                {/* timeZone */}
                <div className="mb-4">
                    <label htmlFor="Currency" className="block text-sm font-medium mb-1">
                        Currency
                    </label>
                    <select
                        name="currency"
                        id="currency"
                        value={formData.currency}
                        onChange={handleChange}
                        className="w-full p-2 sm:p-3border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="AED">UAE - AED</option>
                        <option value="OMR">Oman - OMR</option>
                        <option value="KWT">Kuwait - KWT</option>
                        <option value="SAR">Saudi Arabia - SAR</option>
                        <option value="QAR">Qatar - QAR</option>
                    </select>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-[#2cb75f] p-3  text-white font-semibold rounded-lg hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {isUploading ? <Isloading width="w-7" height="w-7" /> : "Submit"}

                </button>

            </form>
            {
                isLoading && <div className="relative bottom-0 mt-3 max-w-lg w-full p-4 items-center bg-green-50 border border-green-200 rounded-lg flex space-x-4">
                    <div className="flex-shrink-0">
                        <svg
                            className="h-6 w-6 text-green-500"
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
                        <p className="text-sm font-medium text-green-800">we have updated your info</p>
                    </div>
                </div>
            }
        </div>
    );
};

export default Info;
