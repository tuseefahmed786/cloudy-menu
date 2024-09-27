import axios from 'axios'
import React, { useState } from 'react'

function AddProduct({ setShow, selectedC, addProductToSelectedCategory }) {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState(null)

    const handleAddProduct = async () => {
        const selectedCateg = selectedC._id
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('image', image);

            // Log FormData entries
    for (let [key, value] of formData.entries()) {
        console.log(key, value);
    }
        
        const createProduct = await axios.post(`https://menuserver-eight.vercel.app/categories/${selectedCateg}/products`, formData, {
            headers: {
                'Content-Type':'multipart/form-data'
            }
        })
        addProductToSelectedCategory(createProduct.data.product)
        setShow("edit")
    };
    return (
        <>
            <div className="flex justify-center h-full items-center">

                <div className="w-full flex items-start flex-col h-full">
                    <button
                        onClick={() => setShow("edit")}
                        className="text-gray-500 text-xl mb-4"
                    >
                        &times;
                    </button>

                    {/* Title Input */}
                    <div className="mb-4 w-full">
                        <label className="block text-gray-700 mb-2">Product Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded"
                            placeholder="Enter category title"
                        />
                        <label className="block text-gray-700 mb-2">Product Price</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded"
                            placeholder="Enter category title"
                        />
                        <label className="block text-gray-700 mb-2">Product description</label>
                        <input
                            type='text'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded"
                            placeholder="Enter category title"
                        />

                        <label className="block text-gray-700 mb-2">Product Image</label>
                        <input
                            type="file"
                            onChange={(e) => setImage(e.target.files[0])} // Handle file selection
                            className="w-full border border-gray-300 p-2 rounded"
                        />

                    </div>



                    {/* Add Button */}
                    <button
                        onClick={handleAddProduct}
                        className="w-full bg-blue-500 text-white p-2 rounded-full"
                    >
                        Add
                    </button>
                </div>
            </div>
        </>)
}

export default AddProduct
