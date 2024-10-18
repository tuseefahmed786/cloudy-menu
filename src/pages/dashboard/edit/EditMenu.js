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
  const [selectedCategory, setSelectedCategory] = useState([])
  const [editCategory, setEditCategory] = useState([])
  const [isloading, setIsLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState([])

  const createNewCategory = () => {
    setShow("category") // show Category Form for creating Category
    setEditCategory('')  // it will remove selected Category data if we have selected because here we want create new Category.
  }

  const editExistingCategory = (id) => {
    setEditCategory(id) // this edit function is on available on every category when we will click on this edit button it will return selected id 
    setShow("category") //  it will show category form for editing existing category based on id which we have get from edit button
  }

  const createNewProduct = () => {
    setShow("product") //  it will show product form for creating new product
    setSelectedProduct("") // Remove if The Selected Product for [editing] because we are re-using component
  }

  const editExistingProduct = (id) => {
    setShow("product") // show the product form for editing the old product.
    setSelectedProduct(id) // selected the click product useState > product > getByID
  }

  const selectedCategoryForProducts = (id) => {
    setSelectedCategory(id)
  }


  useEffect(() => {
    const fetchCategories = async () => {
      const UserId = localStorage.getItem('token')
      try {//https://menuserver-eight.vercel.app
        const response = await axios.get('https://menuserver-eight.vercel.app/categories', {
          headers: {
            'Authorization': `${UserId}`
          }
        });
        setAllCategories(response.data)
        setSelectedCategory(response?.data[0])
        setIsLoading(false)
      } catch (err) {
        console.log(err)
      }
    };
    fetchCategories()
  }, [])

  const addNewCategoryIntoArray = (newCategory) => {
    setAllCategories((prev) => [
      ...prev,
      newCategory
    ])
    setSelectedCategory(newCategory)
  }

  const editCategoryIntoArray = (newCategory) => {
    setAllCategories((prev) => {
      return prev.map((category) => {
        if (category._id == newCategory._id) {
          return {
            ...newCategory,
            products: [...category.products]
          }
        }
        return category
      }
      )
    })
    setSelectedCategory(newCategory)

  }

  const addNewProductToSelectedCategory = (newProduct) => {
    if (selectedCategory) {
      setSelectedCategory((prev) => ({
        ...prev,
        products: [...prev.products, newProduct],
      })); // this function add new products in selected category and we don't need to query in backend

      setAllCategories((prevCategories) => {
        return prevCategories.map((foundCategory) => {
          if (foundCategory._id == selectedCategory._id) {
            return {
              ...foundCategory,
              products: [...foundCategory.products, newProduct],
            }
          }
          return foundCategory
        })
      }) // this function add updated cat/products in original api and here is also we dont need to fetch again in db
    }

  }; // 

  const updatedProductIntoSelectedCategory = (updatedProduct) => {
    setSelectedCategory((prevCategory) => {
      // Map through the products in the selected category to update the one with the matching _id
      const updatedProducts = prevCategory.products.map((product) =>
        product._id === updatedProduct._id ? updatedProduct : product
      );
      // Return the category with the updated products array
      return {
        ...prevCategory,
        products: updatedProducts,
      };
    }); // here we are adding updated/edit product into selected category

    setAllCategories((prev) => {
      return prev.map((category) => {
        if (category._id === selectedCategory._id) {
          const updatedProducts = category.products.map((product) => {
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
    }); // here we are adding updated/edited product into original array
  };
  return (
    <>

      {/* absolute */}
      <div className="w-full max-w-[25rem] mx-auto bg-white  h-full sm:shadow-xl top-0 left-0 right-0">
        {isloading ? <Isloading width="w-14" height="h-14" /> :
          <>
            {
              show == "edit" &&
              <>
                <div className="hidden restaurantName px-3 py-3 sm:flex justify-between">
                  <img width={20} src={account} alt="account's" />
                  <img width={70} src={logo} alt="logo's" />
                  <img width={30} src={cart} alt="account's" />
                </div>
                <div className="flex cursor-pointer scrollx items-center gap-7 sm:gap-[2.9rem] sm:mb-6 py-2 sm:py-6 pl-3 sm:pl-5 pb-5 overflow-x-auto">
                  <div className="flex-shrink-0 flex cursor-pointer flex-col items-center" onClick={createNewCategory}>
                    <img src={addIcon} className="w-10 sm:w-[52px]" width={52} alt="addicon" />
                    <span className="mt-4 text-sm">Add</span>
                  </div>
                  {
                    allCategories?.map((e) => {
                      return <Category key={e._id} editCategory={editExistingCategory} activeCat={selectedCategory} id={e} selectedCategory={selectedCategoryForProducts} />
                    })
                  }
                </div>

                <div className="scrollx h-[calc(100vh-220px)] pb-8 overflow-y-auto flex flex-wrap">
                 
                  {allCategories.length > 0 &&
                    <div onClick={createNewProduct} className="cursor-pointer mx-2 sm:mx-3 flex gap-2 sm:gap-4 w-full items-center justify-center border border-dashed h-12 sm:h-14 border-black rounded-lg p-2 sm:p-4">
                      <img src={addDish} width={30} className="w-6 sm:w-8" alt="add dish" />
                      <span className="text-[#5d5d5d]">Add new dish</span>
                    </div>
                  }

                  {selectedCategory && (
                    <>{selectedCategory.products.length > 0 ?
                      selectedCategory.products.map((product) => {
                        return <DishCard key={product._id} productInfo={product} selectProduct={editExistingProduct} />
                      })
                      : "You don't have any products in this category"
                    }</>
                  )}
                </div> </>
            }
          </>}

        {show == "category" && <AddCategoryForm
          setShow={setShow} // setShow for remove this form
          editCategoryFunction={editCategoryIntoArray} // It will get updated edit category data. and then it will be add data in original array
          editCategory={editCategory} // it will pass selected category id for editing the category
          addNewCategoryInExistingArray={addNewCategoryIntoArray} // It will get new category data. and then it will be added data in original array
          />}

        {show == "product" && <AddProduct
          setShow={setShow}
          selectedCategory={selectedCategory}
          editProduct={selectedProduct}
          addUpdatedProductsToArray={updatedProductIntoSelectedCategory}
          addProductToSelectedCategory={addNewProductToSelectedCategory} />}

      </div>


    </>
  );
};

const Category = ({ activeCat, selectedCategory, id, editCategory }) => {
  return (
    <div className="flex flex-col gap-3 items-center" onClick={() => selectedCategory(id)}>
      <div className={`w-12 sm:w-16 h-12 sm:h-16 ${` ${id.title == activeCat.title ? "bg-yellow-400" : ""}`} rounded-xl flex items-center justify-center text-2xl shadow-md`}>
        <img src={`${id.icon}`} className="w-8 sm:w-10 h-8 sm:h-10" alt="icons image" />
      </div>
      <div className="flex gap-2 sm:gap-4 justify-center items-baseline">
        <span className="whitespace-nowrap text-xs sm:text-sm">{id.title}</span>
        <img className="cursor-pointer w-3 sm:w-[14px]" src={editIcon} alt="edit" onClick={() => editCategory(id)} />
      </div>
    </div>
  );
}; // Category Component

const DishCard = ({ productInfo, selectProduct }) => {
  return (
    <>
      <div className='flex w-full px-4 pt-4 pb-2 border-b border-b-[#80808057]' >
        <div className='w-[75%] flex-col flex gap-1'>
          <div className="flex items-center gap-2">
            <h1>{productInfo.name}</h1>

            <img className="cursor-pointer" width={14} src={editIcon} alt="edit" onClick={() => selectProduct(productInfo)} />
          </div>
          <p className='text-xs  text-gray-600'>{productInfo.description}</p>

          <p className='text-xs'>AED {productInfo.price}</p>
        </div>
        <div className='w-[25%] h-[90px]'>
          <img className='object-cover w-full h-full p-[2px] rounded-md border border-[#d5d5d5] ' src={productInfo.imageUrl} alt='pic here product' />
        </div>
      </div>
    </>
  );
};  // DishCard Component

export default EditMenu;