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
import addDish from "../../../assests/add-alert.png"
import food from "../../../assests/food.jpg"


// import icon from './coffee-cup.png'
const EditMenu = () => {
  const [show, setShow] = useState("edit")
  const [allCategories, setAllCategories] = useState([])
  const [selectedCateg, setselectedCateg] = useState([])
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
        const response = await axios.get('https://emenu-sandy.vercel.app/categories', {
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
      <div className="p-4 w-full max-w-[25rem] mx-auto bg-white  h-full shadow-xl top-0 left-0 right-0">
        {isloading ? <Isloading width="w-14" height="h-14" /> :
          <>
            {
              show == "edit" &&
              <>
                <div className="restaurantName py-3 flex justify-between">
                  <img width={20} src={account} alt="account's" />
                  <img width={70} src={logo} alt="logo's" />
                  <img width={30} src={cart} alt="account's" />
                </div>
                <div className="flex cursor-pointer scrollx items-center gap-[2.9rem] mb-6 py-6 pl-5 pb-5 overflow-x-auto">
                  <div className="flex-shrink-0 flex cursor-pointer flex-col items-center" onClick={showCategory}>
                    <img src={addIcon} width={52} alt="addicon" />
                    <span className="mt-4 text-sm">Add</span>
                  </div>
                  {
                    allCategories.map((e) => {
                      return <Category editFunction={editFunction} activeCat={selectedCateg} id={e} selectedCateg={selectedCatShowProducts} />
                    })
                  }
                </div>

                <div className="scrollx h-full px-3 overflow-y-auto gap-6 flex flex-wrap">
                  <div onClick={() => setShow("product")} className="cursor-pointer flex gap-4 w-[calc(50%-1rem)] flex-col items-center justify-center border border-dashed h-40 border-black rounded-2xl p-4">
                    <img src={addDish} width={40} alt="add dish" />
                    <span className="text-[#5d5d5d]">Add new dish</span>
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
    <div className="flex flex-col gap-3 items-center" onClick={() => selectedCateg(id)}>
      <div className={`w-16 h-16 ${` ${id.title == activeCat.title ? "bg-yellow-400" : ""}`} rounded-xl flex items-center justify-center text-2xl shadow-sm`}>
        <img src={`${id.icon}`} width={40} height={40} alt="icons image" />
      </div>
      <div className="flex gap-4 justify-center items-baseline">
        <span className="whitespace-nowrap text-sm">{id.title}</span>
        <img className="cursor-pointer" width={14} src={editIcon} alt="edit" onClick={() => editFunction(id)} />
      </div>
    </div>
  );
}; // Category Component


const DishCard = ({ name }) => {
  return (
    <>
      <div className="box w-[150px] h-fit">
        <img src={`${name.imageUrl}`} className="rounded-2xl w-[150px] object-cover h-[140px]" alt="product image" />
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

export default EditMenu;
