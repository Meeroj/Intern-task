import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Router from "next/router";
import Image from "next/image";
import { Star } from "@mui/icons-material";
import FavoriteSharpIcon from "@mui/icons-material/FavoriteSharp";
import { Typography } from "@mui/material";
import { deleteFavourites, addCartItem, removeCartItem } from '@/redux/cart.slice';
import { useDispatch } from 'react-redux';


export default function CategoryPage() {
  const [products, setProducts] = useState([]);
  const categoryName = useSelector((state) => state.categoryName.category);

  useEffect(() => {
    if (categoryName) {
      axios
        .get(`https://fakestoreapi.com/products/category/${categoryName}`)
        .then((res) => {
          console.log(res)
          setProducts(res.data);
        });
    }
  }, [categoryName]);
  const {items, favourites} = useSelector(state => state.cart);
    const dispatch = useDispatch();

    const onAdd = (product) => {
        dispatch(addCartItem(product));
      };
    
      const onDel = (id) => {
        dispatch(removeCartItem(id));
      };

  return (
    <div className="max-w-[1320px] m-auto mt-[32px]">
      <div>
       
        <p className="font-semibold text-[40px] capitalize">{categoryName}</p>
      </div>

      <div className="flex flex-wrap mt-[32px] gap-y-[24px]">
        {products.map((product) => (
          <div
          className="w-[312px] min-h-[468px] rounded-[12px] bg-white"
          key={product.id}
        >
          <div className="w-[312px] h-[284px] flex items-center justify-center relative">
            <div
              onClick={() => Router.push(`/products/${product.title}`)}
              className="relative w-[220px] h-[220px] cursor-pointer"
            >
              <Image
                src={product.image}
                layout="fill"
                quality={100}
                alt={product.title}
              />
            </div>
            <div className="absolute top-5 right-5 cursor-pointer">
              
                <FavoriteSharpIcon
                  className="text-red-500"
                  onClick={() => dispatch(deleteFavourites(product.id))}
                />

            </div>
          </div>
          <div className="px-[16px]">
            <p className="text-[#7E7E83] leading-[24px] text-[16px]">
              {product.category}
            </p>
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', mb: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
               {product.title}
              </Typography>
            <div className="h-[20px] w-[123px] flex items-center">
              {[...Array(4)].map((_, index) => (
                <Star key={index} sx={{ color: "#F8C51B", width: "14.26px" }} />
              ))}
              <Star sx={{ color: "#c8c8ce", width: "14.26px" }} />
              <p className="font-medium text-[12px] ml-[8px] mt-1">52</p>
            </div>
            <div className="flex items-center gap-[5px]">
              <div className="w-[102px] rounded-[12px] px-[8px] text-[12px] font-medium text-[#FFFFFF] my-[10px] bg-[#FF9910]">
                <p>1 000 000 сум</p>
              </div>
              <p className="text-[12px] font-medium text-[#7E7E83]">x 12 мес</p>
            </div>
           <div className="flex justify-between"> 
            <p className="text-[20px] text-[#0D0D0D] font-semibold">
              {product.price} $
            </p>
            <div>
              {items.some((item) => item.id === product.id) ? (
                <div className="flex items-center w-[120px] p-1 rounded-md justify-between border">
                  <button
                    onClick={() => onDel(product.id)}
                    className="text-4xl font-bold"
                  >
                    -
                  </button>
                  <p className="text-2xl">
                    {items.find((item) => item.id === product.id)?.quantity || 0}
                  </p>
                  <button
                    onClick={() => onAdd(product)}
                    className="text-4xl font-bold"
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => onAdd(product)}
                  className="p-2 rounded-md bg-yellow-400"
                >
                  <i className="fa-solid fa-cart-arrow-down"></i> To Cart
                </button>
              )}
            </div>
            </div>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
}
