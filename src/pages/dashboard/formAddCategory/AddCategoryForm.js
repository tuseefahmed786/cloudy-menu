import React, { useState, useEffect } from "react";
import axios from "../../../axios";
import Isloading from "../../../components/Isloading";
import { useDispatch, useSelector } from "react-redux";
import { fetchIcons } from "../../../redux/slice/fetchIconsCategory";
import {
  addCategory,
  deleteCategory,
  editCategories,
} from "../../../redux/slice/fetchMenuForEdit";
import {
  deleteCategoryMenu,
  setMenuCategory,
  setMenuEditCategory,
} from "../../../redux/slice/menuSlice";
const AddCategoryForm = ({ setShow, editCategory }) => {
  const [title, setTitle] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [isloading, setIsLoading] = useState(true);
  const [isLoadingAddBtn, setIsLoadingAddBtn] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const dispatch = useDispatch();
  const fetchAllIcons = useSelector((state) => state.fetchAllIcons.icons);

  useEffect(() => {
    if (!fetchAllIcons || fetchAllIcons.length === 0) {
      dispatch(fetchIcons("/icons")).finally(() => {
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, [fetchAllIcons]);

  useEffect(() => {
    if (editCategory) {
      setTitle(editCategory.title);
      setSelectedIcon(editCategory.icon);
    }
  }, [editCategory]);

  const handleAddCategory = async () => {
    const token = localStorage.getItem("token");
    if (title.length == 0 || selectedIcon == null) {
      alert("You can't save empty field");
      return;
    }
    if (editCategory && editCategory._id) { 
      setIsLoadingAddBtn(true);
      try {
        const updatedCategory = await axios.put(
          `/updatedCategory/${editCategory._id}`,
          {
            title,
            selectedIcon,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          }
        );
        dispatch(editCategories(updatedCategory.data.category));
        dispatch(setMenuEditCategory(updatedCategory.data.category));
        setShow("edit");
      } catch (error) {
        if (
          error.response.data.message ==
          "category with this title already exists for this user"
        ) {
          alert("This category name already exists in your category.");
        }
      } finally {
        setIsLoadingAddBtn(false);
      }
    } else {
        setIsLoadingAddBtn(true);
        try {
          const createCategory = await axios.post(
            "/addCategory",
            {
              title,
              selectedIcon,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `${token}`,
              },
            }
          );
          const create = createCategory.data.category;
          dispatch(addCategory(create));
          dispatch(setMenuCategory(create));
          setShow("edit");
        } catch (error) {
          if (error.response.data.message == "Category already exists") {
            alert("This category name already exists in your category.");
          }
        } finally {
          setIsLoadingAddBtn(false);
        }
      }
  };

  const deleteTheCategory = async () => {
    setIsLoadingDelete(true);
    try {
      const deletedCategory = await axios.delete(
        `/categories/${editCategory._id}/deleteCategory`
      );
      dispatch(deleteCategory(deletedCategory.data.deletedCategory._id));
      dispatch(deleteCategoryMenu(deletedCategory.data.deletedCategory._id));
      setShow("edit");
    } catch (error) {
      console.log("error in deleteTheCategory", error);
    } finally {
      setIsLoadingDelete(false);
    }
  };

  const deleteButton = editCategory && (
    <button
      onClick={deleteTheCategory}
      className="w-full bg-red-500 mb-1 text-white p-2 rounded-full"
    >
      {isLoadingDelete ? (
        <Isloading width="w-6" height="h-6" />
      ) : (
        "Delete Category"
      )}
    </button>
  )

  const updateOrDelete =  isLoadingAddBtn ? (
    <Isloading width="w-6" height="h-6" />
  ) : (
    "Add Category"
  )
  return (
    <div className="flex p-2 sm:p-3 justify-center h-full items-center">
      <div className="w-full flex items-start flex-col h-full">
        <button
          onClick={() => setShow("edit")}
          className="text-gray-500 text-xl mb-1 sm:mb-4"
        >
          &times;
        </button>

        {/* Title Input */}
        <div className="mb-2 sm:mb-4 w-full">
          <label className="block text-gray-700 mb-2">Title</label>
          <input
            type="text"
            required
            value={title || ""}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter category title"
          />
        </div>

        {/* Icon Selection */}
        {isloading ? (
          <Isloading width="w-14" height="h-14" />
        ) : (
          <div className="mb-4 overflow-y-scroll w-full">
            <label className="block text-gray-700 mb-2">
              Choose icon (Optional)
            </label>
            <div className="flex items-center py-3 sm:py-5 justify-center flex-wrap  gap-2 sm:gap-4">
              {fetchAllIcons?.map((icon, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedIcon(icon.url)}
                  className={`p-2 rounded-full w-16 sm:w-20 flex items-center justify-center border ${
                    selectedIcon === icon.url
                      ? "border-blue-500 border-2 "
                      : "border-gray-300"
                  }`}
                >
                  <img
                    className="text-2xl"
                    width={40}
                    height={40}
                    alt="here is icons"
                    src={`${icon.url}`}
                  />
                </button>
              ))}
            </div>
          </div>
        )}

{deleteButton}
       
        <button
          onClick={handleAddCategory}
          className="w-full bg-blue-500 text-white p-2 rounded-full"
        >
       {updateOrDelete}
        </button>
      </div>
    </div>
  );
};

export default AddCategoryForm;
