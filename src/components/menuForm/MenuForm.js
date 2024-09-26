import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MenuForm() {
    const [category, setCategory] = useState('');
    const [menuItem, setMenuItem] = useState('');
    const [price, setPrice] = useState('');
    const [upImage, setUpImage] = useState('')
    const [categories, setCategories] = useState([]);
    const [data, setData] = useState([]);
    const [addedInDB, setaddedInDB] = useState('')
    const handleAddCategory = (e) => {
        e.preventDefault();
        if (category) {
            setCategories([...categories, { name: category, items: [] }]);
            setCategory('');
        }
    };
    const handleAddMenuItem = async (e) => {
        e.preventDefault();
        const updatedCategories = categories.map((cat) => {
            if (cat.name === category) { // first need to be add cat then add items
                return { ...cat, items: [...cat.items, { name: menuItem, price, upImage }] };
            }
            return cat;
        });
        setCategories(updatedCategories);
        try {
            const response = await axios.post('http://localhost:3002/add-item ', {
                category,
                menuItem,
                price,
                upImage
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setaddedInDB(response.data)
            console.log('Response from backend:', response.data);
        } catch (error) {
            console.error('Error sending data to backend:', error.message);
        }
        setMenuItem('');
        setPrice('');
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axios.get('http://localhost:3002/items/all');
                setData(response);
                console.log(response)
            } catch (error) {
                console.error(error.message);
            }
        }

        fetchData();
    }, [addedInDB]);
    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Create Category & Menu Item</h2>
            <form onSubmit={handleAddCategory} className="mb-4">
                <div className="mb-4">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                        Category Name
                    </label>
                    <input
                        type="text"
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                >
                    Add Category
                </button>
            </form>

            <form onSubmit={handleAddMenuItem}>
                <div className="mb-4">
                    <label htmlFor="menuItem" className="block text-sm font-medium text-gray-700">
                        Menu Item Name
                    </label>
                    <input
                        type="text"
                        id="menuItem"
                        value={menuItem}
                        onChange={(e) => setMenuItem(e.target.value)}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                        Price
                    </label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div className='mb-4'>
                    <input type="file" onChange={(e) => setUpImage(URL.createObjectURL(e.target.files[0]))} className="filetype" />
                </div>
                <button
                    type="submit"
                    className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
                >
                    Add Menu Item
                </button>
            </form>

            <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Categories</h3>
                <ul className="list-disc list-inside">
                    {data?.map((data, idx) => (
                        <>
                            <li key={idx} className="ml-4">
                                Category | {data.category}<br></br> | Items Name: {data.menuItem}  | Price :${data.price} |
                            </li>
                            <button>Edit</button>
                            <button>Delete</button>
                        </>
                    ))}
                </ul>
            </div>
            {/* <img key={idx + 0} src={data.upImage} width={200}/> */}
        </div>
    );
}

export default MenuForm;
