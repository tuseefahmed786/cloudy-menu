import axios from "axios";
import React, { useEffect, useState } from "react";
import AddCategoryForm from "../formAddCategory/AddCategoryForm";
import AddProduct from "../formAddProduct/AddProduct";
import Isloading from "../../../components/Isloading";
import editIcon from "../../../assests/edit-text.png"
import addIcon from "../../../assests/add-basket.png"
import logo from "../../../assests/logo.svg"
import account from "../../../assests/account.svg"
import cart from "../../../assests/cart.svg"


// import icon from './coffee-cup.png'
const EditMenu = () => {
  const [show, setShow] = useState("edit")
  const [allCategories, setAllCategories] = useState([])
  const [selectedCateg, setselectedCateg] = useState(Number)
  const [editCategories, setEditCategories] = useState([])
  const [isloading, setIsLoading] = useState(true)

  const selectedCatShowProducts = (id) => {
    setselectedCateg(id)
  }

  const showCategory = () => {
    setShow("category")
    setEditCategories('')
  }
  const editFunction = (id) => {
    setEditCategories(id)
    setShow("category")
  }

  useEffect(() => {
    const fetchCategories = async () => {
      const UserId = localStorage.getItem('token')
      try {
        const response = await axios.get('http://localhost:3002/categories', {
          headers: {
            'Authorization': `${UserId}`
          }
        });
        setAllCategories(response.data)
        setselectedCateg(response?.data[0])
        setIsLoading(false)
      } catch (err) {
        console.log(err)
      }
    };
    fetchCategories()
  }, [])

  const addProductToSelectedCategory = (newProduct) => {
    if (selectedCateg) {
      setselectedCateg((prev) => ({
        ...prev,
        products: [...prev.products, newProduct],
      })); // this function add new products in selected category and we dont need to query in backend

      setAllCategories((prevCategories) => {
        return prevCategories.map((foundCategory) => {
          if (foundCategory._id == selectedCateg._id) {
            return {
              ...foundCategory,
              products: [...foundCategory.products, newProduct],
            }
          }
          return foundCategory
        })
      }) // this function add updated cat/products in original api and here is also we dont need to fetch again in db

    }

  };

  const addNewCategroyIntoArrray = (newCategory) => {
    setAllCategories((prev) => [
      ...prev,
      newCategory
    ])
    setselectedCateg(newCategory)
  }
  const editCategroyIntoArrray = (newCategory) => {
    setAllCategories((prev) => {
      return prev.map((categ) => {
        if (categ._id == newCategory._id) {
          console.log(newCategory)
          return {
            ...newCategory,
            products: [...categ.products]
          }
        }
        return categ
      }
      )
    })
    setselectedCateg(newCategory)

  }

  return (
    <>

{/* absolute */}
      <div className="p-4 w-full max-w-md mx-auto bg-white  h-full shadow-xl top-0 left-0 right-0">
        {isloading ? <Isloading  width="w-14" height="h-14" /> :
          <>
            {
              show == "edit" &&
              <>
                <div className="restaurantName py-3 flex justify-between">
                <img width={20} src={account} alt="account's"/> 
                <img width={70} src={logo} alt="logo's"/> 
                <img width={30} src={cart} alt="account's"/> 
                </div>
                <div className="flex cursor-pointer scrollx items-center gap-[2.9rem] mb-6 py-6 pl-5 pb-5 overflow-x-auto">
                  <div className="flex cursor-pointer flex-col items-center" onClick={showCategory}>
                    {/* <div className="w-14 h-14 bg-yellow-400 rounded-full flex items-center justify-center text-2xl shadow-md">+</div> */}
                   <img src={addIcon} className="min-w-12" alt="addicon"/>
                    <span className="mt-4 text-sm">Add</span>
                  </div>
                  {
                    allCategories.map((e) => {
                      return <Category editFunction={editFunction} activeCat={selectedCateg} id={e} selectedCateg={selectedCatShowProducts} />
                    })
                  }
                </div>

                <div className=" scrollx overflow-y-auto gap-4 flex flex-wrap">
                  <div onClick={() => setShow("product")} className="cursor-pointer flex w-[calc(50%-1rem)] flex-col items-center justify-center border border-dashed h-40 border-gray-400 rounded-lg p-4">
                    <span className="text-gray-400">Add new dish</span>
                  </div>
                  {selectedCateg && (
                    <>{selectedCateg.products.length > 0 ?
                      selectedCateg.products.map((p) => {
                        return <DishCard name={p} />
                      })
                      : ""
                    }</>
                  )}
                </div> </>
            }
          </>}
        {show == "category" && <AddCategoryForm setShow={setShow} editCategroyFunction={editCategroyIntoArrray} editCategories={editCategories} newCateg={addNewCategroyIntoArrray} />}
        {show == "product" && <AddProduct setShow={setShow} selectedC={selectedCateg} addProductToSelectedCategory={addProductToSelectedCategory} />}
      </div>


    </>
  );
};

const Category = ({ activeCat, selectedCateg, id, editFunction }) => {
  return (
    <div className="flex flex-col items-center" onClick={() => selectedCateg(id)}>
      <div className={`w-16 h-16 ${` ${id.title == activeCat.title ? "bg-yellow-400" : ""}`} rounded-xl flex items-center justify-center text-2xl shadow-sm`}>

        <img src={`${id.icon}`} width={40} height={40} alt="icons image" />
      </div>
      <div className="flex gap-4 justify-center items-baseline">
      <span className="whitespace-nowrap mt-2 text-sm">{id.title}</span>
        <img className="cursor-pointer" width={14} src={editIcon} alt="edit" onClick={() => editFunction(id)}/>
      </div>

    </div>
  );
}; // Category Component


const DishCard = ({ name }) => {
  return (
    <div className="flex  w-[calc(50%-1rem)] flex-col items-center border border-gray-200 rounded-lg h-40">
      {/* Toggle Switch */}
      <div className="w-full h-3/4">
        <img className="w-full h-full object-cover rounded-t-lg" src={`${name.imageUrl}`} />
      </div>
      <div className="product-details h-1/4 rounded-b-lg rounded-bl-lg bg-[#fafafa] justify-between p-2 flex w-full">
        <span>{name.name}</span>
        <span>{name.price + "$"}</span>
      </div>
    </div>
  );
};  // DishCard Component

export default EditMenu;
