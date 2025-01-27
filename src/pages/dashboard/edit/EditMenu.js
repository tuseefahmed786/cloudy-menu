import React, { useEffect, useState } from "react";
import AddCategoryForm from "../formAddCategory/AddCategoryForm";
import AddProduct from "../formAddProduct/AddProduct";
import Isloading from "../../../components/Isloading";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMenuApi,
  selectCategory,
} from "../../../redux/slice/fetchMenuForEdit";
import { fetchMenuUser, setMenuData } from "../../../redux/slice/menuSlice";

const EditMenu = () => {
  const [show, setShow] = useState("edit");
  const [allCategories, setAllCategories] = useState([]);
  const [editCategory, setEditCategory] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const {
    categories: menuData,
    fetched,
    selectedCategory,
    loading,
  } = useSelector((state) => state.fetchMenuForEdit);
  const restaurantInfo = useSelector((state) => state.info);
  const menuUSer = useSelector((state) => state.menuSlice);

  useEffect(() => {
    // Fetch categories if data are not already in the state
    if (menuData.length == 0 && fetched == false) {
      dispatch(fetchMenuApi("/categories"));
    } else {
      // Update local states when Data is available
      setAllCategories(menuData);
      setIsLoading(false);
    }

    if (menuUSer.menuData.length == 0) {
      dispatch(setMenuData({
        findrestaurant: restaurantInfo.data,
        getcatandProducts: menuData,
        socialLink: restaurantInfo.socialLinks,
      }));
    }
  }, [dispatch, menuData]);

  const createNewCategory = () => {
    setShow("category");
    setEditCategory("");
  };

  const editExistingCategory = (id) => {
    setEditCategory(id);
    setShow("category");
  };

  const createNewProduct = () => {
    setShow("product");
    setSelectedProduct("");
  };

  const editExistingProduct = (id) => {
    setShow("product");
    setSelectedProduct(id);
  };

  const selectedCategoryForProducts = (id) => {
    dispatch(selectCategory(id));
  };


  if (loading || isLoading) {
    return <Isloading width="w-14" height="h-14" />;
  }

  const allCategory = allCategories.length > 0 && (
    allCategories.map((e) => (
      <Category
        key={e._id}
        editCategory={editExistingCategory}
        activeCat={selectedCategory}
        id={e}
        selectedCategory={selectedCategoryForProducts}
      />
    ))
  )

  const isProductHave = allCategories.length > 0 && (
    <div className="px-2">
      <div
        onClick={createNewProduct}
        className="cursor-pointer flex gap-2 sm:gap-4 w-full sm:w-fit items-center justify-center border border-dashed h-12 sm:h-14 border-black rounded-lg p-2 sm:p-4"
      >
        <img
          src="https://res.cloudinary.com/dlefxmkgz/image/upload/v1734308567/aodakvadj2xiybtw6v7t.png"
          width={30}
          className="w-6 sm:w-8"
          alt="add dish"
        />
        <span className="text-black">Add new dish</span>
      </div>
    </div>
  )

  const allProducts = selectedCategory &&
    selectedCategory.products &&
    Array.isArray(selectedCategory.products) ? (
    selectedCategory.products.length > 0 ? (
      selectedCategory.products.map((product) => (
        <DishCard
          key={product._id}
          productInfo={product}
          selectProduct={editExistingProduct}
          currency={restaurantInfo.data.currency}
        />
      ))
    ) : (
      <p className="p-5">
        You don't have any product in this category
      </p>
    )
  ) : (
    <p className="p-5">You have need to create category</p>
  )

  const categoryForm = show == "category" && <AddCategoryForm setShow={setShow} editCategory={editCategory} />
  const ProductForm = show == "product" && <AddProduct setShow={setShow} selectedCategory={selectedCategory} editProduct={selectedProduct}
  />

  return (
    <>
      <div className="w-full bg-white flex flex-col h-full sm:shadow-xl">
        {show == "edit" && (
          <>
            <div className="flex scrollx pb-2 mb-1 items-center gap-7 sm:gap-[2.5rem] sm:pt-5 sm:pb-3 sm:mb-2 pl-3 sm:pl-5 overflow-x-auto">
              <div
                className="flex-shrink-0 flex cursor-pointer flex-col items-center"
                onClick={createNewCategory}
              >
                <img
                  src="https://res.cloudinary.com/dlefxmkgz/image/upload/v1734308567/ap8txd7cf811nfevs2oe.png"
                  className="w-10 sm:w-[52px]"
                  alt="addicon"
                />
                <span className="mt-4 text-sm">Add Category</span>
              </div>
              {allCategory}
            </div>
            <div className="scrollx flex-1 overflow-y-auto flex flex-col">
              {isProductHave}
              <div className="w-full flex-wrap flex items-start gap-8 flex-grow">
                {allProducts}
              </div>
            </div>
          </>
        )}

        {categoryForm}
        {ProductForm}
      </div>
    </>
  );
};

const Category = ({ activeCat, selectedCategory, id, editCategory }) => {
  return (
    <div
      className="flex hover:cursor-pointer flex-col gap-3 items-center"
      onClick={() => selectedCategory(id)}
    >
      <div
        className={`w-12 sm:w-16 h-12 sm:h-16 ${` ${id.title == activeCat.title ? "bg-yellow-400" : ""
          }`} rounded-xl flex items-center justify-center text-2xl shadow-md`}
      >
        <img
          src={`${id.icon}`}
          className="w-8 sm:w-10 h-8 sm:h-10"
          alt="icons image"
        />
      </div>
      <div className="flex gap-2 sm:gap-4 justify-center items-baseline">
        <span className="whitespace-nowrap text-xs sm:text-sm">{id.title}</span>
        <img
          className="cursor-pointer w-3 sm:w-[14px]"
          src="https://res.cloudinary.com/dlefxmkgz/image/upload/v1734308684/bvvy66p6dul6y0ryawzr.png"
          alt="edit"
          onClick={() => editCategory(id)}
        />
      </div>
    </div>
  );
}; 

const DishCard = ({ productInfo, selectProduct, currency }) => {
  return (
    <>
      <div className="flex flex-col-reverse gap-1 w-48 px-4 pt-4 pb-2 border-b-[#80808057]">
        <div className=" flex-col flex gap-1">
          <div className="flex flex-col items-start gap-1 px-1">
            <div className="flex items-center gap-2">
              <h1>{productInfo.name}</h1>

              <img
                className="cursor-pointer"
                width={14}
                src="https://res.cloudinary.com/dlefxmkgz/image/upload/v1734308684/bvvy66p6dul6y0ryawzr.png"
                alt="edit"
                onClick={() => selectProduct(productInfo)}
              />
            </div>
            <p className="text-xs  text-gray-600">{productInfo.description.slice(0, 33) + ".."}</p>
            <p className="text-xs">
            {currency || "Aed"} {productInfo.price}
          </p>
          </div>

         
        </div>
        <div className="w-48 h-48">
          <img
            className="object-cover w-full h-full p-[2px] rounded-md border border-[#d5d5d5] "
            src={productInfo.imageUrl}
            alt="pic here product"
          />
        </div>
      </div>
    </>
  );
}; 

export default EditMenu;