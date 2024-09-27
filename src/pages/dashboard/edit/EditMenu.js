import axios from "axios";
import React, { useEffect, useState } from "react";
import AddCategoryForm from "../formAddCategory/AddCategoryForm";
import AddProduct from "../formAddProduct/AddProduct";
// import icon from './coffee-cup.png'
const EditMenu = () => {
  const [show, setShow] = useState("edit")
  const [allCategories, setAllCategories] = useState([])
  const [selectedCateg, setselectedCateg] = useState(Number)
  const [editCategories, setEditCategories] = useState([])

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
        const response = await axios.get('https://menuserver-eight.vercel.app/categories', {
          headers: {
            'Authorization': `${UserId}`
          }
        });
        setAllCategories(response.data)
        setselectedCateg(response?.data[0])

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
      <div className="p-4 w-full max-w-md mx-auto bg-white absolute h-full shadow-xl top-0 left-0 right-0">
        {
          show == "edit" &&
          <>
            <div className="restaurantName">
              <h1>Emenu Pk</h1>
            </div>
            <div className="flex items-center gap-11 mb-6 p-2 pb-5 overflow-x-auto">
              <button className="flex flex-col items-center" onClick={showCategory}>
                <div className="w-14 h-14 bg-yellow-400 rounded-full flex items-center justify-center text-2xl shadow-md">+</div>
                <span className="mt-2 text-sm">Add</span>
              </button>
              {
                allCategories.map((e) => {
                  return <Category editFunction={editFunction} activeCat={selectedCateg} id={e} selectedCateg={selectedCatShowProducts} />
                })
              }
            </div>

            <div className="cursor-pointer overflow-y-auto gap-4 h-4/6 flex flex-wrap">
              <div onClick={() => setShow("product")} className="flex w-[calc(50%-1rem)] flex-col items-center justify-center border border-dashed h-40 border-gray-400 rounded-lg p-4">
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

        {show == "category" && <AddCategoryForm setShow={setShow} editCategroyFunction={editCategroyIntoArrray} editCategories={editCategories} newCateg={addNewCategroyIntoArrray} />}
        {show == "product" && <AddProduct setShow={setShow} selectedC={selectedCateg} addProductToSelectedCategory={addProductToSelectedCategory} />}
      </div>
    </>
  );
};

// Category Component
const Category = ({ activeCat, selectedCateg, id, editFunction }) => {
  return (
    <div className="flex flex-col items-center" onClick={() => selectedCateg(id)}>
      <div className={`w-16 h-16 ${` ${id.title == activeCat.title ? "bg-yellow-400" : ""}`} rounded-xl flex items-center justify-center text-2xl shadow-sm`}>

        <img src={`${id.icon}`} width={40} height={40} alt="icons image" />
      </div>
      <span className="whitespace-nowrap mt-2 text-sm">{id.title}</span>
      <span className="whitespace-nowrap mt-2 text-sm" onClick={() => editFunction(id)}>!</span>

    </div>
  );
};

// DishCard Component
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
};

export default EditMenu;
