import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Isloading from '../../components/Isloading';
import account from "../../assests/account.svg"
import logo from "../../assests/logo.svg"
import cart from "../../assests/cart.svg"
import { setProductDetails } from '../../redux/slice/selectedProductSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setMenuData } from '../../redux/slice/menuSlice';

function FetchMenu() {
    const { restaurant } = useParams();
    const dispatch = useDispatch();
    const menuData = useSelector((state) => state.menuSlice.menuData); // Get menu data from Redux store
    const [getResponse, setGetResponse] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCateg, setselectedCateg] = useState([]);
    const navigate = useNavigate();

    // Decode the slug to get the original name (replace '-' with ' ').
    const restaurantName = restaurant.replace(/-/g, ' ');

    useEffect(() => {
        if (menuData.length === 0) { // Only fetch if data isn't already in Redux
            const fetchMenuData = async () => {
                try {
                    const responseMenu = await axios.get(`https://menuserver-eight.vercel.app/menu/${restaurantName}`);
                    dispatch(setMenuData(responseMenu.data)); // Save to Redux
                    setGetResponse(responseMenu.data);
                    setselectedCateg(responseMenu?.data[0]);
                } catch (error) {
                    console.log("Error fetching menu data", error);
                } finally {
                    setIsLoading(false); // Stop loading whether there's an error or not
                }
            };
            fetchMenuData();
        } else {
            setGetResponse(menuData);
            // setselectedCateg(menuData[0]);
            setIsLoading(false); // Stop loading if data is already in Redux
        }
    }, [restaurantName, menuData, dispatch]);

    const selectedCatShowProducts = (category) => {
        setselectedCateg(category);
        const categorySlug = category.title.replace(/\s+/g, '-').toLowerCase();
        navigate(`/${restaurant}/${categorySlug}`); // Navigate to the category URL
    }

    useEffect(() => {
        const categorySlug = window.location.pathname.split('/')[2]; // Extract the category from the URL
        const foundCategory = menuData.find(
            (cat) => cat.title.replace(/\s+/g, '-').toLowerCase() === categorySlug
        );
        if (foundCategory) {
            setselectedCateg(foundCategory);
        } else {
            setselectedCateg(menuData[0]); // Default to the first category
        }
        setIsLoading(false);
    }, [menuData]);


    const selectPerProduct = (product) => {
        dispatch(setProductDetails(product));
        const categorySlug = selectedCateg.title.replace(/\s+/g, '-').toLowerCase();
        const productSlug = product.name.replace(/\s+/g, '-').toLowerCase();
        navigate(`/${restaurant}/${categorySlug}/${productSlug}`);
    };

    return (
        <>
            <div className="h-screen overflow-hidden max-w-[25rem] mx-auto bg-white h-full shadow-xl top-0 left-0 right-0">
                {!isLoading ? (
                    <div className='group-home'>
                        <div className="restaurantName py-3 px-4 flex justify-between">
                            <Link to={`/${restaurant}/info`}>
                                <img width={20} src={account} alt="account's" />
                            </Link>
                            <img width={70} src={logo} alt="logo's" />
                            <img width={30} src={cart} alt="account's" />
                        </div>
                        <div className="flex cursor-pointer scrollx items-center gap-[1.7rem] mb-3 py-4 pl-4 pr-4 pb-4 overflow-x-auto">
                            {getResponse.map((e) => (
                                <Category activeCat={selectedCateg} key={e._id} id={e} selectedCateg={selectedCatShowProducts} />
                            ))}
                        </div>

                        {selectedCateg && selectedCateg.products && selectedCateg.products.length > 0 ? (
                            <h1 className='px-4 text-[1.2rem]'>{selectedCateg.title}</h1>
                        ) : ""}
                        <div className="scrollx flex-col h-[calc(100vh-220px)] pb-5 overflow-y-auto flex">
                            {selectedCateg && selectedCateg.products && selectedCateg.products.length > 0 ? (
                                selectedCateg.products.map((p) => (
                                    <DishCard name={p} key={p._id} selectPerProduct={selectPerProduct} />
                                ))
                            ) : ""}
                        </div>
                    </div>
                ) : (
                    <Isloading width="w-14" height="h-14" optionaltext={`we are fetching ${restaurantName}`} />
                )}
            </div>
        </>
    );
}

const Category = ({ activeCat, selectedCateg, id }) => (
    <div className="flex flex-col gap-3 items-center" onClick={() => selectedCateg(id)}>
        <div className={`w-16 h-16 ${id.title === activeCat.title ? "bg-yellow-400" : ""} rounded-xl flex items-center justify-center text-2xl shadow-sm`}>
            <img src={`${id.icon}`} width={40} height={40} alt="icons image" />
        </div>
        <div className="flex gap-4 justify-center items-baseline">
            <span className="whitespace-nowrap text-sm">{id.title}</span>
        </div>
    </div>
);

const DishCard = ({ name, selectPerProduct }) => (
    <div className='flex w-full px-4 pt-4 pb-2 border-b hover:cursor-pointer border-b-[#80808057]' onClick={() => selectPerProduct(name)}>
        <div className='w-[75%] flex-col flex gap-1'>
            <h1>{name.name}</h1>
            <p className='text-xs text-gray-600'>{name.description}</p>
            <p className='text-sm'>AED {name.price}</p>
        </div>
        <div className='w-[25%] h-[90px]'>
            <img className='object-cover w-full h-full p-[2px] rounded-md border border-[#d5d5d5]' src={name.imageUrl} alt='pic here product' />
        </div>
    </div>
);



export default FetchMenu;
