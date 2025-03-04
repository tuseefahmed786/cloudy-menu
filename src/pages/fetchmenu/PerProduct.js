import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Isloading from "../../components/Isloading";
import { useSelector } from "react-redux";

function PerProduct() {
  const { restaurant, productName } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const restaurantData = useSelector(
    (state) => state.perProductDetails.product
  );
  const product = restaurantData.product
  const currency = restaurantData.currency
  const navigate = useNavigate();
  if (isLoading)
    return (
      <Isloading
        width="w-14"
        height="h-14"
        optionaltext={`Loading ${productName}`}
      />
    );

  return (
    <div>
      <div className="h-screen overflow-hidden max-w-[25rem] mx-auto bg-white h-full shadow-xl top-0 left-0 right-0">
        <div className="flex w-full flex-col border-b border-b-[#80808057]">
         {product.imageUrl && (
          <div className="w-full h-64">
           <img
             className="object-cover w-full h-full"
             src={product.imageUrl}
             alt="pic here product"
           />
         </div>
         )
         }
          <div className="w-full px-3 pt-4 flex-col flex gap-1">
            <div className="flex justify-between items-center">
              <h1>{product.name}</h1>
              <h1 className="text-base">{currency} {product.price}</h1>
            </div>

            <p className="text-sm py-2 text-gray-600">
              {product.description}
            </p>
          </div>
        </div>
        <div className="px-3">
          <button
            onClick={() => navigate(-1)}
            className="flex w-full justify-center rounded-full cloud-menu-bg mt-3 sm:mt-5 px-3 py-[9px]  text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#31ad5f]"
          >
            Close the Product
          </button>
        </div>
      </div>
    </div>
  );
}

export default PerProduct;
