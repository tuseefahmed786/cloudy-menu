import axios from "../../../axios";
import React, { useState } from "react";
import upload from "../../../assests/upload.png";
import { useDispatch, useSelector } from "react-redux";
import Isloading from "../../../components/Isloading";
import { updateRestaurantLogo } from "../../../redux/slice/infoSlice";

function UploadLogo() {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null); // Default null
  const [uploadLoading, setUploadLoading] = useState(false)
  const [successMessgaeLogo, setSuccessMessgaeLogo] = useState(false)
  const token = localStorage.getItem("token");
  const dispatch = useDispatch()
  const restaurantData = useSelector((state) => state.info.data);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      const imageURL = URL.createObjectURL(selectedFile);
      setImageUrl(imageURL);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }
    setUploadLoading(true)
    const formData = new FormData();
    formData.append("logo", file);

    try {
      const response = await axios.post("/api/uploadLogo", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `${token}`,
        },
      });
      console.log( response.data.logoUrl);
      setUploadLoading(false)
      dispatch(updateRestaurantLogo({ id: restaurantData._id, logo: response.data.logoUrl }))
      alert("File uploaded successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to upload file.");
    }
  };

  // Fallback to restaurantData.logo if imageUrl is not available
  const logoToDisplay = imageUrl || (restaurantData.logo && restaurantData.logo.startsWith("http") ? restaurantData.logo : null);

  return (
    <div className="px-3 sm:px-5 mt-3">
      <div className="md:w-2/3 gap-3 w-full bg-white sm:px-5 py-3 rounded-md flex flex-col">
        <h1>Upload Logo</h1>
        {logoToDisplay ? (
          <div className="flex justify-center items-center py-5">
            <img src={logoToDisplay} alt="Logo Preview" className="w-auto max-w-36"  />
          </div>

        ) : (
          <div className="relative h-60 w-full flex justify-center rounded-lg flex-col items-center border-[1.4px] border-dotted border-gray-400">
            <input
              className="opacity-0 absolute w-full h-full"
              type="file"
              onChange={handleFileChange}
            />
            <img src={upload} alt="Upload your logo" />
            <h1>Click or drag file to this area to upload</h1>
            <p className="text-xs">Only jpeg, jpg, png, webp files are supported.</p>
          </div>
        )}

        <div className="flex gap-2">
          {logoToDisplay && (
            <div className="relative flex-1 flex flex-col justify-center items-center border border-dashed border-gray-400 rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
              <p className="text-sm text-gray-600 font-medium">Change the Logo</p>
              <input
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                type="file"
                onChange={handleFileChange}
              />
            </div>
          )}
          <button className="flex-1 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition duration-200" onClick={handleUpload}>
            {uploadLoading ? <Isloading width="w-8" height="h-8" /> : "Upload"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default UploadLogo;
