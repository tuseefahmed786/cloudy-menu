import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Isloading from '../../components/Isloading';
import account from "../../assests/account.svg"
import logo from "../../assests/logo.svg"
import cart from "../../assests/cart.svg"

function FetchMenu() {
    const { restaurant } = useParams()
    const [getResponse, setGetResponse] = useState([])
    const [isloading, setIsLoading] = useState(true)
    const [selectedCateg, setselectedCateg] = useState([])


    // Decode the slug to get the original name (replace '-' with ' ').
    const restaurantName = restaurant.replace(/-/g, ' ');

    useEffect(() => {
        const fetchMenuData = async (req, res) => {
            const responseMenu = await axios.get(`https://menuserver-eight.vercel.app/menu/${restaurantName}`)
            setGetResponse(responseMenu.data)
            setselectedCateg(responseMenu?.data[0])            
            console.log(responseMenu.data)
            setIsLoading(false)
        }
        fetchMenuData()
    }, [])

    const selectedCatShowProducts = (id) => {
        setselectedCateg(id)
        console.log(id)
    }
    return (
        <>
            <div className="h-screen overflow-hidden max-w-[25rem] mx-auto bg-white  h-full shadow-xl top-0 left-0 right-0">
                {isloading ? <Isloading width="w-14" height="h-14" /> :
                    <>

                        <>
                            <div className="restaurantName py-3 px-4 flex justify-between">
                                <img width={20} src={account} alt="account's" />
                                <img width={70} src={logo} alt="logo's" />
                                <img width={30} src={cart} alt="account's" />
                            </div>
                            <div className="flex cursor-pointer scrollx items-center gap-[2.9rem] mb-3 py-4 pl-4 pb-4 overflow-x-auto">
                                {
                                getResponse.map((e) => {
                                        return <Category activeCat={selectedCateg} id={e} selectedCateg={selectedCatShowProducts} />
                                    })
                                }
                            </div>
                        
                            {selectedCateg && (
                                    <>{selectedCateg.products.length > 0 ?
                                        <h1 className='px-4 pb-4 text-[1.2rem]'>{selectedCateg.title}</h1>
                                        : ""
                                    }</>
                                )}
                            <div className="scrollx flex-col px-4 h-[calc(100vh-220px)] pb-5 overflow-y-auto gap-5 flex flex-wrap">

                                {selectedCateg && (
                                    <>{selectedCateg.products.length > 0 ?
                                        selectedCateg.products.map((p) => {
                                            return <DishCard name={p} />
                                        })
                                        : ""
                                    }</>
                                )}

{/* {selectedCateg && selectedCateg.products && selectedCateg.products.length > 0 ? (
  selectedCateg.products.map((p) => (
    <DishCard key={p.id} name={p} />
  ))
) : (
  <p>No products available</p>
)} */}
                            </div> </>

                    </>}
            </div>
        </>
    )
}
const Category = ({ activeCat, selectedCateg, id }) => {
    return (
        <div className="flex flex-col gap-3 items-center" onClick={() => selectedCateg(id)}>
            <div className={`w-16 h-16 ${` ${id.title == activeCat.title ? "bg-yellow-400" : ""}`} rounded-xl flex items-center justify-center text-2xl shadow-sm`}>
                <img src={`${id.icon}`} width={40} height={40} alt="icons image" />
            </div>
            <div className="flex gap-4 justify-center items-baseline">
                <span className="whitespace-nowrap text-sm">{id.title}</span>
            </div>
        </div>
    );
}; // Category Component


const DishCard = ({ name }) => {
    return (
        <>
            <div className="box w-[40%] h-fit">
                <img src={`${name.imageUrl}`} className="rounded-2xl w-[100%] object-cover h-[140px]" alt="product image" />
                <div className="flex justify-center shadow-xl rounded-b-2xl rounded-bl-2xl items-center flex-col bg-slate-white">
                    <div className="text-[#40484e] py-3 text-sm">{name.name}</div>

                    <div className="flex gap-1">
                        <div className="text-[9px] mb-3">KWD</div>
                        <div className="text-[#206786] font-bold">{name.price}</div>
                    </div>
                </div>
            </div>
        </>
    );
};  // DishCard Component

export default FetchMenu
