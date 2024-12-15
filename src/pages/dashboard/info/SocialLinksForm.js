import React, { useEffect, useState } from "react";
import axios from "../../../axios";
import { useDispatch, useSelector } from "react-redux";
import { setSocialLinks } from "../../../redux/slice/infoSlice";
import Isloading from "../../../components/Isloading";

const SocialLinksForm = () => {
    const [isUploading, setUploading] = useState(false);
      const [isLoading, setIsLoading] = useState(false);
    
  const dispatch = useDispatch();
  const socialLinks = useSelector((state) => state.info.socialLinks);
  const [formData, setFormData] = useState({
    googleMapLink: "",
    facebookLink: "",
    instagramLink: "",
    whatsappLink: "",
  });
  useEffect(() => {
    if (socialLinks) {
      setFormData({
        facebookLink: socialLinks.facebookLink,
        instagramLink: socialLinks.instagramLink,
        googleMapLink: socialLinks.googleMapLink,
        whatsappLink: socialLinks.whatsappLink,
      });
    }
  }, [socialLinks]);

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    setUploading(true)
    e.preventDefault();
    try {
      const response = await axios.post("/api/socialLink", formData, {
        headers: {
          Authorization: `${token}`,
        },
      });
      dispatch(setSocialLinks(response.data.socialLinks));
      setIsLoading(true)
      console.log(response.data.socialLinks);
    } catch (error) {
      console.error("Error saving links:", error);
      alert("Failed to save links. Please try again.");
    }finally {
      setUploading(false);
      // setTimeout(() => setIsLoading(false), 3000);
    }
  };

  return (
    <div className="p-3 w-full sm:w-3/5">
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white rounded-lg shadow-md"
      >
        {/* Google Maps Link */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Google map link
          </label>
          <div className="flex items-center border border-gray-300 rounded-md">
            <span className="px-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 text-blue-600"
              >
                <path d="M12 2a9.77 9.77 0 00-7 3.18A10.21 10.21 0 002 12a9.77 9.77 0 003.18 7A10.24 10.24 0 0012 22a9.77 9.77 0 007-3.18A10.21 10.21 0 0022 12a9.77 9.77 0 00-3.18-7A10.21 10.21 0 0012 2zm0 18c-2.66 0-4.82-1.72-5.8-4.2a6.88 6.88 0 0111.6 0C16.82 18.28 14.66 20 12 20zm0-6a1.8 1.8 0 110-3.6 1.8 1.8 0 010 3.6z" />
              </svg>
            </span>
            <input
              type="text"
              name="googleMapLink"
              value={formData.googleMapLink}
              onChange={handleChange}
              required
              className="flex-1 p-2 outline-none"
              placeholder="https://www.google.com/maps"
            />
          </div>
        </div>

        {/* Social Media Links */}
        {[
          {
            name: "facebookLink",
            label: "Facebook",
            placeholder: "https://www.facebook.com",
            color: "text-blue-500",
          },
          {
            name: "instagramLink",
            label: "Instagram",
            placeholder: "https://www.instagram.com",
            color: "text-pink-500",
          },
          {
            name: "whatsappLink",
            label: "WhatsApp profile link",
            placeholder: "https://wa.me/97100000000",
            color: "text-green-500",
          },
        ].map((field, index) => (
          <div className="mb-4" key={index}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
            </label>
            <div className="flex items-center border border-gray-300 rounded-md">
              <span className="px-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className={`w-6 h-6 ${field.color}`}
                >
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </span>
              <input
                type="text"
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                required
                className="flex-1 p-2 outline-none"
                placeholder={field.placeholder}
              />
            </div>
          </div>
        ))}

        {/* Buttons */}
        <div className="flex justify-between items-center">
      <div>
      {isLoading && (
            <div className="relative bottom-0 max-w-lg p-4 items-center bg-green-50 border border-green-200 rounded-lg flex space-x-4">
              <div className="flex-shrink-0">
                <svg
                  className="h-6 w-6 text-green-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m0-6a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-green-800">
                  We Saved your Social Links.
                </p>
              </div>
            </div>
          )}
      </div>
      <div className="py-3">
      <button
            type="submit"
            className="px-4 py-2 items-end bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            {isUploading ? <Isloading width="w-7" height="w-7" /> : "Submit"}
          </button>
      </div>
        </div>
      </form>
    </div>
  );
};

export default SocialLinksForm;
