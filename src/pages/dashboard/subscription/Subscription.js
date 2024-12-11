import React, { useState } from 'react';
import axios from '../../../axios';

const Subscription = () => {
    // Separate loading states for each button
    const [loadingMonthly, setLoadingMonthly] = useState(false);
    const [loadingYearly, setLoadingYearly] = useState(false);

    const handleSubscription = async (priceId, type) => {
        const token = localStorage.getItem('token');
        // Set the appropriate loading state based on the button clicked
        if (type === 'monthly') setLoadingMonthly(true);
        if (type === 'yearly') setLoadingYearly(true);
console.log( type)
        try {
            const response = await axios.post('/create-checkout-session', {
                priceId,
                type
            },
                {
                    headers: { 'Authorization': token }
                });

            // Redirect to Stripe Checkout
            window.location.href = response.data.url;
        } catch (error) {
            console.error('Error creating subscription:', error);
        } finally {
            // Reset the loading state after the operation
            if (type === 'monthly') setLoadingMonthly(false);
            if (type === 'yearly') setLoadingYearly(false);
        }
    };

    return (
        <div className=" flex flex-col items-center justify-start bg-gray-50 p-6">
            {/* Header */}
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-gray-800">Choose Your Plan</h1>
                <p className="text-gray-500 mt-2">
                    Select a subscription plan that suits your needs.
                </p>
            </div>

            {/* Subscription Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
                {/* Monthly Plan */}
                <div className="bg-white border rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                    <h2 className="text-2xl font-semibold text-gray-800">Monthly Plan</h2>
                    <h2 className="text-2xl pt-3 font-semibold text-gray-800">AED 49</h2>
                    <span className="">monthly / restaurant
                    </span>
                    <button
                        onClick={() => handleSubscription('price_1QPVWRBqMEKqDL9cTsdXuohX', 'monthly')} // Replace with actual Price ID
                        disabled={loadingMonthly}
                        className={`mt-4 w-full py-2 px-4 rounded-lg text-white ${loadingMonthly
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-[#22c55e] hover:bg-[#33a85e]'
                            } transition-colors duration-300`}
                    >
                        {loadingMonthly ? 'Processing...' : 'Subscribe Now'}
                    </button>
                </div>

                {/* Yearly Plan */}
                <div className="bg-white border rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                    <h2 className="text-2xl font-semibold text-gray-800">Yearly Plan</h2>
                    <p className="text-gray-500 mt-2">
                        Billed annually at <span className="font-bold text-gray-600">AED 588/year</span>.
                    </p>
                    <p>QR Code Menu
                    </p>
                    <p>QR Code Menu
                    </p>
                    <button
                        onClick={() => handleSubscription('price_1QPVgTBqMEKqDL9cBQ3DaNky', 'yearly')} // Replace with actual Price ID
                        disabled={loadingYearly}
                        className={`mt-4 w-full py-2 px-4 rounded-lg text-white ${loadingYearly
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-[#22c55e] hover:bg-[#33a85e]'
                            } transition-colors duration-300`}
                    >
                        {loadingYearly ? 'Processing...' : 'Subscribe Now'}
                    </button>
                </div>
            </div>

            {/* Footer */}
            <div className="text-gray-500 text-sm mt-10">
                Secure payments powered by <span className="font-bold">Stripe</span>.
            </div>
        </div>
    );
};

export default Subscription;
