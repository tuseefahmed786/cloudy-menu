import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "../../api/api";
import Isloading from "../../components/Isloading";
import { setProductDetails } from "../../redux/slice/selectedProductSlice";
import { useDispatch, useSelector } from "react-redux";
import { setMenuData } from "../../redux/slice/menuSlice";

function FetchMenu() {
  const menuData = useSelector((state) => state.menuSlice.menuData);
  const findrestaurant
    = useSelector((state) => state.menuSlice.restaurantData);
  const { restaurant } = useParams();
  const dispatch = useDispatch();
  const [getResponse, setGetResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCateg, setselectedCateg] = useState([]);
  const [logo, setLogo] = useState(null);
  const navigate = useNavigate();

  const scrollContainerRef = useRef(null);

  const restaurantName = restaurant.replace(/-/g, " ");
  useEffect(() => {
    const fetchMenuData = async () => {
      // setIsLoading(true); // Set loading to true at the start
      try {
        if (menuData.length === 0) {
          const responseMenu = await axios.get(`/menu/${restaurantName}`);
          setLogo(responseMenu.data.findrestaurant.logo);
          dispatch(setMenuData(responseMenu.data)); // Save to Redux
          setGetResponse(responseMenu.data.getcatandProducts);
          setselectedCateg(responseMenu?.data.getcatandProducts[0]);
        } else {
          setGetResponse(menuData);
          setLogo(findrestaurant.logo);
        }
      } catch (error) {
        console.log("Error fetching menu data", error);
      } finally {
        setIsLoading(false); // Set loading to false after the operation completes
      }
    };
    fetchMenuData();
  }, []);

  const selectedCatShowProducts = (category) => {
    setselectedCateg(category);
    const categorySlug = category.title.replace(/\s+/g, "-").toLowerCase();
    navigate(`/${restaurant}/${categorySlug}`); // Navigate to the category URL
  };
  useEffect(() => {
    if (menuData) {
      const categorySlug = window.location.pathname.split("/")[2] || null;
      const foundCategory = menuData.find(
        (cat) => cat.title.replace(/\s+/g, "-").toLowerCase() === categorySlug
      );
      if (foundCategory) {
        setselectedCateg(foundCategory);
      } else {
        setselectedCateg(menuData[0]); // Default to the first category
      }
    }
  }, [menuData]);

  const selectPerProduct = (product) => {
    dispatch(setProductDetails(product));
    const categorySlug = selectedCateg.title.replace(/\s+/g, "-").toLowerCase();
    const productSlug = product.product.name.replace(/\s+/g, "-").toLowerCase();
    navigate(`/${restaurant}/${categorySlug}/${productSlug}`);
  };
  const getCurrentScrollValue = () => {
    if (scrollContainerRef.current) {
      console.log(scrollContainerRef.current.scrollLeft); // Log the current horizontal scroll position
    }
  };
  useEffect(() => {
    // Set the scroll position to 250 pixels horizontally
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 410;
    }
  }, []);


  return (
    <>
      <div className="h-screen overflow-hidden max-w-[25rem] mx-auto bg-white  shadow-xl top-0 left-0 right-0">
        {isLoading && <>
          <Isloading width="w-14" height="h-14" />
        </>}

        <div className="group-home">
          <div className="restaurantName py-3 px-4 flex justify-between items-center">
            <Link to={`/${restaurant}/info`}>
              <img
                width={20}
                src="https://res.cloudinary.com/dlefxmkgz/image/upload/v1734311748/ls5pjxxjddw3lco3zugo.svg"
                alt="account's"
              />
            </Link>
            {logo ? (
              <img
                className="max-w-11 max-h-11 object-cover"
                src={logo}
                alt="Put Logo"
              />
            ) : (
              <p className="text-xs font-medium">Put Your Logo</p>
            )}

            <img
              width={30}
              src="https://res.cloudinary.com/dlefxmkgz/image/upload/v1734311748/gigfy9wzsfjbmqsifmfk.svg"
              alt="account's"
            />
          </div>
          <div ref={scrollContainerRef} className="flex scroll-hidden  scrollx items-center gap-[1.7rem] mb-3 py-4 pl-4 pr-4 pb-4 overflow-x-auto">
            {getResponse?.map((e) => (
              <Category
                activeCat={selectedCateg}
                key={e._id}
                id={e}
                selectedCateg={selectedCatShowProducts}
              />
            ))}
          </div>

          {selectedCateg &&
            selectedCateg.products &&
            selectedCateg.products.length > 0 ? (
            <h1 className="px-4 text-[1.2rem]">{selectedCateg.title}</h1>
          ) : (
            ""
          )}
          <div className="scrollx flex-col h-[calc(100vh-220px)] pb-5 overflow-y-auto flex">
            {selectedCateg &&
              selectedCateg.products &&
              selectedCateg.products.length > 0
              ? selectedCateg.products.map((p) => (
                <DishCard
                  name={p}
                  key={p._id}
                  currency={findrestaurant.currency}
                  selectPerProduct={selectPerProduct}
                />
              ))
              : <p className="text-center">You don't have product in this category</p>}
          </div>
        </div>
      </div>
    </>
  );
}

const Category = ({ activeCat, selectedCateg, id }) => (
  <div
    className="flex cursor-pointer flex-col gap-3 items-center"
    onClick={() => selectedCateg(id)}
  >
    <div
      className={`w-16 h-16 ${id.title === activeCat.title ? "bg-yellow-400" : ""
        } rounded-xl flex items-center justify-center text-2xl shadow-sm`}
    >
      <img src={`${id.icon}`} width={40} height={40} alt="icons image" />
    </div>
    <div className="flex gap-4 justify-center items-baseline">
      <span className="whitespace-nowrap text-sm">{id.title}</span>
    </div>
  </div>
);

const DishCard = ({ name, selectPerProduct, currency }) => (
  <div
    className="flex w-full px-4 pt-4 pb-2 border-b hover:cursor-pointer border-b-[#80808057]"
    onClick={() => selectPerProduct({ product: name, currency: currency })}
  >
    <div className="w-[75%] flex-col flex gap-1">
      <h1>{name.name}</h1>
      <p className="text-xs text-gray-600">{name.description}</p>
      <div className="flex gap-1">
        <p className="text-sm">{currency || "usd"}</p>
        <p className="text-sm">{name.price}</p>
      </div>
    </div>
  

    {name.imageUrl && (
       <div className="w-[25%] h-[90px]">
       <img
         className="object-cover w-full h-full p-[2px] rounded-md border border-[#d5d5d5]"
         src={name.imageUrl}
         alt="pic here product"
       />
     </div>
        )}
  </div>
);

export default FetchMenu;
