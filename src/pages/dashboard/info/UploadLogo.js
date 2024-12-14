import axios from "../../../axios";
import React, { useState } from "react";
import upload from "../../../assests/upload.png";
import { useDispatch, useSelector } from "react-redux";
import Isloading from "../../../components/Isloading";
import { updateRestaurantLogo } from "../../../redux/slice/infoSlice";

function UploadLogo() {
  const dispatch = useDispatch();
  const [logoFile, setLogoFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [uploadLoading, setUploadLoading] = useState(false);
  const restaurantData = useSelector((state) => state.info.data);
  const token = localStorage.getItem("token");
  console.log(restaurantData);
  const handleFileChange = (event, type) => {
    const selectedFile = event.target.files[0];
    if (type === "logo") {
      setLogoFile(selectedFile);
      if (selectedFile) {
        console.log(selectedFile);
        setLogoPreview(URL.createObjectURL(selectedFile));
      }
    } else if (type === "cover") {
      setCoverFile(selectedFile);
      if (selectedFile) {
        console.log(selectedFile);
        setCoverPreview(URL.createObjectURL(selectedFile));
      }
    }
  };

  const handleUpload = async () => {
    if (!logoFile && !coverFile) {
      alert("Please select files to upload.");
      return;
    }
 
console.log(logoFile)
console.log(coverFile)

    setUploadLoading(true);
    const formData = new FormData();

    if (logoFile) formData.append("logo", logoFile);
    if (coverFile) formData.append("cover", coverFile);
    console.log(formData);
    try {
      const response = await axios.post("/api/uploadLogo", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `${token}`,
        },
      });

      setUploadLoading(false);

      if (response.data.logoUrl) {
        dispatch(
          updateRestaurantLogo({
            logo: response.data.logoUrl,
            cover:response.data.coverUrl,
          })
        );
      }

      alert("Files uploaded successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to upload files.");
      setUploadLoading(false);
    }
  };

  return (
    <div className="p-3">
      <div className="w-full sm:w-3/5 gap-3 bg-white sm:px-5 py-3 rounded-md flex flex-col">
        <h1>Upload Logo</h1>
        {logoPreview || restaurantData.logo ? (
          <>
            <div className="flex justify-center items-center py-5">
              <img
                src={logoPreview || restaurantData.logo}
                alt="Logo Preview"
                className="w-auto max-w-36"
              />
            </div>

            <div className="relative flex-1 flex flex-col justify-center items-center border border-dashed border-gray-400 rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
              <p className="text-sm text-gray-600 font-medium">
                Change the Logo
              </p>
              <input
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                type="file"
                onChange={(e) => handleFileChange(e, "logo")}
              />
            </div>
          </>
        ) : (
          <div
            className="relative h-60 w-full flex justify-center rounded-lg 
    gap-2
     
     flex-col items-center border-[1.4px] border-dotted border-gray-400"
          >
            <input
              className="opacity-0
              hover:cursor-pointer
               absolute w-full h-full"
              type="file"
              onChange={(e) => handleFileChange(e, "logo")}
            />
            <img src={upload} alt="Upload your logo" />
            <h1>Click or drag file to this area to upload</h1>
            <p className="text-xs">
              Only jpeg, jpg, png, webp files are supported.
            </p>
          </div>
        )}
      </div>

      <div className="w-full sm:w-3/5 gap-3 bg-white sm:px-5 py-3 rounded-md flex flex-col">
        <h1>Upload Cover Photo</h1>
        {coverPreview || restaurantData.cover ? (
          <>
            <div className="flex justify-center items-center py-5">
              <img
                src={coverPreview || restaurantData.cover}
                alt="Cover Photo Preview"
                className="w-auto max-w-36"
              />
            </div>

            <div className="relative flex-1 flex flex-col justify-center items-center border border-dashed border-gray-400 rounded-lg p-4 hover:bg-gray-50   cursor-pointer">
              <p className="text-sm text-gray-600 font-medium">
                Change your Cover Photo
              </p>
              <input
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                type="file"
                onChange={(e) => handleFileChange(e, "cover")}
              />
            </div>
          </>
        ) : (
          <div
            className="relative h-60 w-full flex justify-center rounded-lg 
   gap-2
   hover:cursor-pointer
     flex-col items-center border-[1.4px] border-dotted border-gray-400"
          >
            <input
              className="opacity-0
              hover:cursor-pointer
               absolute w-full h-full"
              type="file"
              onChange={(e) => handleFileChange(e, "cover")}
            />
            <img src={upload} alt="Upload your cover photo" />
            <h1>Click or drag file to this area to upload</h1>
            <p className="text-xs">
              Only jpeg, jpg, png, webp files are supported.
            </p>
          </div>
        )}

        <div className="flex gap-2 mt-3">
          <button
            className="flex-1 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition duration-200"
            onClick={handleUpload}
          >
            {uploadLoading ? <Isloading width="w-8" height="h-8" /> : "Upload"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default UploadLogo;
