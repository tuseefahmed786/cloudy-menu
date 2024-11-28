import React, { useState, useEffect } from "react";
import axios from '../../../axios'
import Isloading from "../../../components/Isloading";
import { useDispatch, useSelector } from "react-redux";
import { fetchIcons } from "../../../redux/slice/fetchIconsCategory";
const AddCategoryForm = (
  { setShow,
    addNewCategoryInExistingArray,
    editCategory,
    editCategoryFunction,
    deleteCategory
  }
) => {
  const [title, setTitle] = useState('');
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [icons, seIcons] = useState([])
  const [isloading, setIsLoading] = useState(true)
  const [isLoadingAddBtn, setIsLoadingAddBtn] = useState(false)
  const [isLoadingDelete, setIsLoadingDelete] = useState(false)

  const dispatch = useDispatch()
  const fetchAllIcons = useSelector((state) => state.fetchAllIcons.icons)

  useEffect(() => {
    if (!fetchAllIcons || fetchAllIcons.length === 0) {
      dispatch(fetchIcons("/icons")).finally(() => {
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, [dispatch, fetchAllIcons]);

  useEffect(() => {
    if (editCategory) {
      setTitle(editCategory.title);
      setSelectedIcon(editCategory.icon);
    }
  }, [editCategory]);

  const handleAddCategory = async () => {
    const token = localStorage.getItem('token');
    if (editCategory && editCategory._id) {
      setIsLoadingAddBtn(true)
      const updatedCategory = await axios.put(`/updatedCategory/${editCategory._id}`, {
        title,
        selectedIcon
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      editCategoryFunction(updatedCategory.data.category)
      setShow("edit")
    } else { //https://menuserver-eight.vercel.app

      if (title.length == 0) {
        alert("empty")
      } else {
        setIsLoadingAddBtn(true)
        const createCategory = await axios.post("/addCategory", {
          title,
          selectedIcon
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
          }
        })
        addNewCategoryInExistingArray(createCategory.data.category)
        setShow("edit")
      }

    }
  };

  const deleteTheCategory = async () => {
    setIsLoadingDelete(true)
    try {
      const deletedCategory = await axios.delete(`/categories/${editCategory._id}/deleteCategory`)
      console.log(deletedCategory.data)
      deleteCategory(editCategory._id)
      setShow("edit")
    } catch (error) {
      console.log("error in deleteTheCategory", error)
    } finally {
      setIsLoadingDelete(false)
    }
  }

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
            value={title || ''}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter category title"
          />
        </div>

        {/* Icon Selection */}
        {isloading ? <Isloading width="w-14" height="h-14" /> : <div className="mb-4 overflow-y-scroll flex-1 w-full">
          <label className="block text-gray-700 mb-2">Choose icon (Optional)</label>
          <div className="flex items-center py-3 sm:py-5 justify-center flex-wrap h-[100%] gap-2 sm:gap-4">
            {fetchAllIcons?.map((icon, index) => (
              <button
                key={index}
                onClick={() => setSelectedIcon(icon.url)}
                className={`p-2 rounded-full w-16 sm:w-20 flex items-center justify-center border ${selectedIcon === icon.url ? "border-blue-500" : "border-gray-300"
                  }`}
              >
                <img className="text-2xl" width={40} height={40} alt="here is icons" src={`${icon.url}`} />
              </button>
            ))}
          </div>
        </div>}

        {/* Add Button */}


        {editCategory &&
          <button
            onClick={deleteTheCategory}
            className="w-full bg-red-500 mb-1 text-white p-2 rounded-full"
          >

            {isLoadingDelete ? <Isloading width="w-6" height="h-6" /> : "Delete Category"}

          </button>
        }
        <button
          onClick={handleAddCategory}
          className="w-full bg-blue-500 text-white p-2 rounded-full"
        >
          {isLoadingAddBtn ? <Isloading width="w-6" height="h-6" /> : "Add Category"}
        </button>
      </div>
    </div>
  );
};

export default AddCategoryForm;
