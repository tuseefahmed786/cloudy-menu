import axios from "../../../axios";
import React, { useState, useEffect } from "react";
import Isloading from "../../../components/Isloading";
import { useDispatch } from "react-redux";
import {
  addProduct,
  deleteProduct,
  editProducts,
} from "../../../redux/slice/fetchMenuForEdit";
import {
  addProductMenu,
  deleteProductMenu,
  editProductsMenu,
} from "../../../redux/slice/menuSlice";
function AddProduct({ setShow, selectedCategory, editProduct }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [isloading, setIsLoading] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (editProduct) {
      setName(editProduct.name || "");
      setPrice(editProduct.price || "");
      setDescription(editProduct.description || "");
      setImage(editProduct.imageUrl || null);
    }
  }, [editProduct]);

  const handleAddProduct = async () => {
    if (/[^a-zA-Z0-9 ]/g.test(name)) {
      return alert("Special characters are not allowed");
    }
    if (name.length === 0 || price.length === 0 || description.length === 0) {
      alert("You can't save empty fields");
      return;
    }
  
    setIsLoading(true);
    const selectedCategoryId = selectedCategory._id;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
  
    // Append the image only if it's provided
    if (image) {
      formData.append("image", image);
    }
  
    try {
      if (editProduct && editProduct._id) {
        formData.append("id", editProduct._id);
  
        const createProduct = await axios.put(
          `/categories/${selectedCategoryId}/editProducts`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
  
        dispatch(editProducts(createProduct.data.updated));
        dispatch(
          editProductsMenu({
            product: createProduct.data.updated,
            id: selectedCategoryId,
          })
        );
      } else {
        const createProduct = await axios.post(
          `/categories/${selectedCategoryId}/products`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
  
        dispatch(addProduct(createProduct.data.product));
        dispatch(
          addProductMenu({
            product: createProduct.data.product,
            id: selectedCategoryId,
          })
        );
      }
  
      setShow("edit");
    } catch (error) {
      console.error("Error saving product:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const deleteTheProduct = async () => {
    setIsLoadingDelete(true);
    try {
      const deletedInDb = await axios.delete(
        `/api/${editProduct._id}/deletedProduct`
      );
      dispatch(deleteProduct(deletedInDb.data.deletedProduct._id));
      dispatch(
        deleteProductMenu({
          productId: deletedInDb.data.deletedProduct._id,
          categoryId: selectedCategory._id,
        })
      );

      setShow("edit");
    } catch (error) {
      console.error("Error deleting the product:", error);
    } finally {
      setIsLoadingDelete(false); // Reset loading state to false
    }
  };

  const buttonLabel = isloading ? (
    <Isloading width="w-6" height="h-6" />
  ) : editProduct ? (
    "Update Product"
  ) : (
    "Add Product"
  );

  const deleteButton = editProduct && (
    <button
      onClick={deleteTheProduct}
      className="w-full bg-red-500 text-white p-2 mb-1  rounded-full"
    >
      {isLoadingDelete ? (
        <Isloading width="w-6" height="h-6" />
      ) : (
        "Delete The Product"
      )}
    </button>
  )
  return (
    <>
      <div className="flex px-3 justify-center h-full items-center">
        <div className="w-full flex items-start flex-col h-full">
          <button
            onClick={() => setShow("edit")}
            className="text-gray-500 text-xl mb-4"
          >
            &times;
          </button>

          {/* Title Input */}
          <div className="flex flex-col gap-2 mb-4 w-full">
            <label className="block text-gray-700">Product Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              placeholder="Enter Dish Name"
              required
            />
            <label className="block text-gray-700 ">Product Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              placeholder="Enter Your Price"
              required
            />
            <label className="block text-gray-700 ">Product description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              placeholder="Enter Product description"
              required
            />

            <label className="block text-gray-700">Product Image</label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          {deleteButton}
          <button
            onClick={handleAddProduct}
            className="w-full bg-blue-500 text-white p-2  rounded-full"
          >

            {buttonLabel}          </button>
        </div>
      </div>
    </>
  );
}

export default AddProduct;
