import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
const RestaurantInfo = () => {
  const { restaurant } = useParams();
  const navigate = useNavigate();
  const menuData = useSelector((state) => state.menuSlice.menuData);
  console.log(menuData);
  return (
    <>
      <div className="flex p-1 max-w-[25rem] pt-10 mx-auto h-screen justify-center items-start">
        <div className="w-full bg-white pb-3 px-2 py-2 shadow-lg rounded-lg">
          <div className="flex flex-col">
            <div className="">
              <div className="rounded relative">
                <img
                  src={menuData?.findrestaurant?.cover || "https://res.cloudinary.com/dlefxmkgz/image/upload/v1734312370/omvgkg3qfgwh8hhyqzwv.avif"}
                  className="rounded-2xl max-h-28 object-cover w-full h-full"
                  alt="banner"
                />
                <img
                  className="absolute hover:cursor-pointer top-1 right-2"
                  onClick={() => navigate(-1)}
                  src="https://res.cloudinary.com/dlefxmkgz/image/upload/v1734310934/pi0mpa1yuptdqrjw4jo2.png"
                  alt="back"
                />
                <div className="absolute -bottom-6 left-3 rounded w-16 h-16">
                  <img
                    src={menuData?.findrestaurant?.logo || "https://res.cloudinary.com/dlefxmkgz/image/upload/v1734312370/omvgkg3qfgwh8hhyqzwv.avif"}
                    className="w-full h-full rounded-full object-cover"
                    alt="banner"
                  />
                </div>
              </div>
            </div>
            <div className="px-3 pt-6">
              <div>
                <h1 className="text-lg font-medium">
                  {menuData?.findrestaurant?.name || "Put Your Cafe Name"}
                </h1>
                <p className="text-xs pb-2">
                  {" "}
                  {menuData?.findrestaurant?.location ||
                    "Enter Your Cafe Location"}
                </p>
                <div>
                  <a
                    target="_blank"
                    href={
                      menuData?.socialLink?.whatsappLink ||
                      "https://wa.me/+971543286045"
                    }
                    className="border flex items-center w-fit gap-1 border-black rounded-2xl px-2 py-1 text-xs font-bold"
                  >
                    <img
                      className="w-4"
                      src="https://res.cloudinary.com/dlefxmkgz/image/upload/v1734308904/xrxxjzav5of9osintdiq.png"
                      alt=""
                    />
                    Chat to Shop
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="py-3 px-3">
              <h3 className="text-sm font-bold">About US</h3>
              <p className="text-sm">
                {menuData?.findrestaurant?.about ||
                  "Please Enter About Your Cafe"}
              </p>
            </div>
            <div className="px-3 flex flex-col gap-1">
              <div className="flex gap-1 items-center">
                <img
                  className="w-4"
                  src="https://res.cloudinary.com/dlefxmkgz/image/upload/v1734308902/coovxqffnlb8brcgkc2d.svg"
                  alt=""
                />
                <a
                  target="_blank"
                  className="text-xs underline"
                  href={
                    menuData?.socialLink?.googleMapLink ||
                    "https://www.linkedin.com/company/cloud-menu-ae"
                  }
                >
                  Our Location
                </a>
              </div>

              <div className="flex gap-1 items-center">
                <img
                  className="w-4"
                  src="https://res.cloudinary.com/dlefxmkgz/image/upload/v1734308903/zls0m1f5wk6dgxqhbwvo.png"
                  alt=""
                />
                <a
                  className="text-xs underline"
                  target="_blank"
                  href={
                    menuData?.socialLink?.facebookLink ||
                    "https://www.linkedin.com/company/cloud-menu-ae"
                  }
                >
                  Facebook
                </a>
              </div>

              <div className="flex gap-1 items-center">
                <img
                  className="w-4"
                  src="https://res.cloudinary.com/dlefxmkgz/image/upload/v1734308904/y8dskvvuppd5rilqiflu.png"
                  alt=""
                />

                <a
                  className="text-xs underline"
                  target="_blank"
                  href={
                    menuData?.socialLink?.instagramLink ||
                    "https://www.instagram.com/cloudmenuae"
                  }
                >
                  {" "}
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RestaurantInfo;
