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


// import icon from './coffee-cup.png'
const EditMenu = () => {
  const [show, setShow] = useState("edit")
  const [allCategories, setAllCategories] = useState([])
  const [selectedCateg, setselectedCateg] = useState([])
  const [editCategories, setEditCategories] = useState([])
  const [isloading, setIsLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState([])
  const productSelected = (id) => {
    setShow("product")
    setSelectedProduct(id)
  }
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
        console.log(response.data)
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
      })); // this function add new products in selected category and we don't need to query in backend

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

  const editProduct = (updatedProduct) => {
    setselectedCateg((prevCategory) => {
      // Map through the products in the selected category to update the one with the matching _id
      const updatedProducts = prevCategory.products.map((product) =>
        product._id === updatedProduct._id ? updatedProduct : product
      );
      // Return the category with the updated products array
      return {
        ...prevCategory,
        products: updatedProducts,
      };
    });

    setAllCategories((prev) => {
      return prev.map((category) => {
        // Check if the category matches the selected category
        if (category._id === selectedCateg._id) {
          // Update the products in the matched category
          const updatedProducts = category.products.map((product) => {
            // Replace the product if its _id matches the updatedProduct._id
            if (product._id === updatedProduct._id) {
              return { ...product, ...updatedProduct };
            }
            return product;
          });
          
          // Return the updated category with modified products
          return { ...category, products: updatedProducts };
        }
        return category;
      });
    });
  };
  return (
    <>

      {/* absolute */}
      <div className="w-full max-w-[25rem] mx-auto bg-white  h-full shadow-xl top-0 left-0 right-0">
        {isloading ? <Isloading width="w-14" height="h-14" /> :
          <>
            {
              show == "edit" &&
              <>
                <div className="restaurantName px-3 py-3 flex justify-between">
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
                    allCategories?.map((e) => {
                      return <Category key={e._id} editFunction={editFunction} activeCat={selectedCateg} id={e} selectedCateg={selectedCatShowProducts} />
                    })
                  }
                </div>

                <div className="scrollx h-[calc(100vh-220px)] pb-8 overflow-y-auto flex flex-wrap">
                  {allCategories.length > 0 &&
                    <div onClick={() => setShow("product")} className="cursor-pointer mx-3 flex gap-4 w-full items-center justify-center border border-dashed h-14 border-black rounded-lg p-4">
                    <img src={addDish} width={30} alt="add dish" />
                    <span className="text-[#5d5d5d]">Add new dish</span>
                  </div>
                  }
                  {selectedCateg && (
                    <>{selectedCateg.products.length > 0 ?
                      selectedCateg.products.map((p) => {
                        return <DishCard name={p} key={p._id} selectProduct={productSelected} />
                      })
                      : ""
                    }</>
                  )}
                </div> </>
            }
          </>}
        {show == "category" && <AddCategoryForm setShow={setShow} editCategroyFunction={editCategroyIntoArrray} editCategories={editCategories} newCateg={addNewCategroyIntoArrray} />}
        {show == "product" && <AddProduct setShow={setShow} editProduct={selectedProduct} addUpdatedProductsToArray={editProduct} selectedC={selectedCateg} addProductToSelectedCategory={addProductToSelectedCategory} />}
      </div>


    </>
  );
};

const Category = ({ activeCat, selectedCateg, id, editFunction }) => {
  return (
    <div className="flex flex-col gap-3 items-center" onClick={() => selectedCateg(id)}>
      <div className={`w-16 h-16 ${` ${id.title == activeCat.title ? "bg-yellow-400" : ""}`} rounded-xl flex items-center justify-center text-2xl shadow-md`}>
        <img src={`${id.icon}`} width={40} height={40} alt="icons image" />
      </div>
      <div className="flex gap-4 justify-center items-baseline">
        <span className="whitespace-nowrap text-sm">{id.title}</span>
        <img className="cursor-pointer" width={14} src={editIcon} alt="edit" onClick={() => editFunction(id)} />
      </div>
    </div>
  );
}; // Category Component


const DishCard = ({ name, selectProduct }) => {
  return (
    <>
      <div className='flex w-full px-4 pt-4 pb-2 border-b border-b-[#80808057]' >
        <div className='w-[75%] flex-col flex gap-1'>
       <div className="flex items-center gap-2">
       <h1>{name.name}</h1> 

       <img className="cursor-pointer" width={14} src={editIcon} alt="edit" onClick={() => selectProduct(name)} />
       </div>
       <p className='text-xs  text-gray-600'>{name.description}</p>

          {/* <p className='text-xs text-gray-600'>Handed crispy & cheese burger laoded with savory beef with extra spicily</p> */}
          <p className='text-xs'>AED {name.price}</p>
        </div>
        <div className='w-[25%] h-[90px]'>
          <img className='object-cover w-full h-full p-[2px] rounded-md border border-[#d5d5d5] ' src={name.imageUrl} alt='pic here product' />
        </div>
      </div>
    </>
  );
};  // DishCard Component

export default EditMenu;

// <div className="box w-[150px] h-fit">
// <img src={`${name.imageUrl}`} className="rounded-2xl w-[150px] object-cover h-[140px]" alt="product image" />
// <div className="flex justify-center shadow-xl rounded-b-2xl rounded-bl-2xl items-center flex-col bg-slate-white">
//   <div className="text-[#40484e] py-3 text-sm">{name.name}</div>

//   <div className="flex gap-1">
//     <div className="text-[9px] mb-3">KWD</div>
//     <div className="text-[#206786] font-bold">{name.price}</div>
//   </div>
// </div>
// </div>


{/* <div className="box w-[40%] h-fit">
<img src={`${name.imageUrl}`} className="rounded-2xl w-[100%] object-cover h-[140px]" alt="product image" />
<div className="flex justify-center shadow-xl rounded-b-2xl rounded-bl-2xl items-center flex-col bg-slate-white">
    <div className="text-[#40484e] py-3 text-sm">{name.name}</div>

    <div className="flex gap-1">
        <div className="text-[9px] mb-3">KWD</div>
        <div className="text-[#206786] font-bold">{name.price}</div>
    </div>
</div>
</div> */}

