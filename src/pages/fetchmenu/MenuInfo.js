import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const RestaurantInfo = () => {
    const {restaurant} = useParams()
    const restaurants = {
        name: "Late Cafe AE",
        logo: "https://example.com/logo.png",
        address: "123 Main Dubai St, Dubai, UAE",
        location: "Late Cafe, City, Country", // used for Google Map
        phone: "+971-123-4567",
        email: "Demo@latecafe.com",
        socialMedia: [
            { platform: "Facebook", url: "https://facebook.com/latecafe" },
            { platform: "Instagram", url: "https://instagram.com/latecafe" },
            { platform: "Twitter", url: "https://twitter.com/latecafe" }
        ],
        openingHours: [
            { day: "Monday", hours: "9:00 AM - 9:00 PM" },
            { day: "Tuesday", hours: "9:00 AM - 9:00 PM" },
            { day: "Wednesday", hours: "9:00 AM - 9:00 PM" },
            { day: "Thursday", hours: "9:00 AM - 9:00 PM" },
            { day: "Friday", hours: "9:00 AM - 11:00 PM" },
            { day: "Saturday", hours: "10:00 AM - 11:00 PM" },
            { day: "Sunday", hours: "10:00 AM - 8:00 PM" }
        ],
    };
    return (
        <div className="restaurant-info-container p-4 bg-white shadow-lg rounded-md max-w-[400px] mx-auto">
            {/* Restaurant Name and Logo */}
            <div className="restaurant-header flex items-center gap-4 mb-4">
                {/* <img src={restaurant.logo} alt={`${restaurant.name} Logo`} className="w-16 h-16 object-cover rounded-full" /> */}
                <Link to={`/${restaurant}`}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg> </Link>
                <h1 className="text-2xl font-semibold">{restaurants.name}</h1>


            </div>

            {/* Contact Information */}
            <div className="contact-info mb-4">
                <h2 className="text-lg font-semibold">Contact Information</h2>
                <p className='text-sm'>Phone: {restaurants.phone}</p>
                {restaurants.email && <p className='text-sm'>Email: {restaurants.email}</p>}
            </div>

            {/* Opening Hours */}
            <div className="opening-hours mb-4">
                <h2 className="text-lg font-semibold">Opening Hours</h2>
                <ul>
                    {restaurants.openingHours.map((time, index) => (
                        <li className='text-sm' key={index}>{time.day}: {time.hours}</li>
                    ))}
                </ul>
            </div>
              {/* Address */}
              <div className="restaurant-address mb-4">
                <h2 className="text-lg font-semibold">Address</h2>
                <p>{restaurants.address}</p>
            </div>
            <div className="google-map mb-4">
                <h2 className="text-lg font-semibold">Location</h2>
                {/* Embed Google Maps using iframe or link */}
                {/* <iframe
                    title="Google Map"
                    className="w-full h-64 rounded-md"
                    src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${restaurant.location}`}
                    allowFullScreen
                /> */}
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.061103326229!2d55.23864090000003!3d25.201161800000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43a397e04977%3A0x34b5374b6e70d255!2sThe%20Salon%20%7C%20Dubai%20Ladies%20Club!5e0!3m2!1sen!2s!4v1729638725393!5m2!1sen!2s" className='w-full' height="220" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>

        </div>
    );
};

export default RestaurantInfo;
