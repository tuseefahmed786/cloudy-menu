import axios from "axios";
import React, { useState, useEffect } from "react";
import Isloading from "../../../components/Isloading";
const AddCategoryForm = ({ setShow, newCateg, editCategories, editCategroyFunction }) => {
  const [title, setTitle] = useState();
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [icons, seIcons] = useState([])
  const [isloading, setIsLoading] = useState(true)
  const [isLoadingAddBtn, setIsLoadingAddBtn] = useState(false)

  useEffect(() => {
    const getIcons = async () => {
      const res = await axios.get("http://localhost:3002/icons")
      seIcons(res.data)
      setIsLoading(false)
    }
    getIcons()
  }, [])

  useEffect(() => {
    if (editCategories) {
      setTitle(editCategories.title);
      setSelectedIcon(editCategories.icon);
      console.log(editCategories + "dd")
    }
  }, [editCategories]);

  const handleAddCategory = async () => {
    const token = localStorage.getItem('token');
    if (editCategories && editCategories._id) {
      setIsLoadingAddBtn(true)
      const updatedCategory = await axios.put(`http://localhost:3002/updatedCategory/${editCategories._id}`, {
        title,
        selectedIcon
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      editCategroyFunction(updatedCategory.data.category)
      setShow("edit")
    } else {
      setIsLoadingAddBtn(true)
      const createCategory = await axios.post("http://localhost:3002/addCategory", {
        title,
        selectedIcon
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        }
      })
      newCateg(createCategory.data.category)
      setShow("edit")
    }
  };
  return (
    <div className="flex justify-center h-full items-center">

      <div className="w-full flex justify-between items-start flex-col h-full">
        <button
          onClick={() => setShow("edit")}
          className="text-gray-500 text-xl mb-4"
        >
          &times;
        </button>

        {/* Title Input */}
        <div className="mb-4 w-full">
          <label className="block text-gray-700 mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter category title"
          />
        </div>

        {/* Icon Selection */}
        {isloading?<Isloading  width="w-14" height="h-14"/>:<div className="mb-4 max-h-[50%] w-full">
          <label className="block text-gray-700 mb-2">Choose icon (Optional)</label>
          <div className="flex items-center py-5 justify-center flex-wrap h-[90%] gap-4 overflow-y-scroll">
            {icons.map((icon, index) => (
              <button
                key={index}
                onClick={() => setSelectedIcon(icon.url)}
                className={`p-2 rounded-full w-20 flex items-center justify-center border ${selectedIcon === icon.url ? "border-blue-500" : "border-gray-300"
                  }`}
              >
                <img className="text-2xl" width={40} height={40} alt="here is icons" src={`${icon.url}`} />
              </button>
            ))}
          </div>
        </div>}

        {/* Add Button */}
        <button
          onClick={handleAddCategory}
          className="w-full bg-blue-500 text-white p-2 rounded-full"
        >
          {isLoadingAddBtn?<Isloading/>:"Add Category" }
        </button>
      </div>
    </div>
  );
};

export default AddCategoryForm;
