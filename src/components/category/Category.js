import React from 'react'

function Category() {
    return (
        <>
            <form
                // onSubmit={createRestaurant}
                className="mb-4">
                <div className="mb-4">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                        Restaurant Name
                    </label>
                    <input
                        type="text"
                        id="category"
                        // value={restaurantName}
                        // onChange={(e) => setRestaurantName(e.target.value)}
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

export default Category