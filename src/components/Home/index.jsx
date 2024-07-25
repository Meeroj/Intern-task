// src/pages/index.tsx
import { useState, useEffect } from "react";
import { Star } from "@mui/icons-material";
import FavoriteBorderSharpIcon from "@mui/icons-material/FavoriteBorderSharp";
import FavoriteSharpIcon from "@mui/icons-material/FavoriteSharp";
import Image from "next/image";
import Router from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem, addFavourites, deleteFavourites, removeCartItem } from "@/redux/cart.slice";
import { fetchProducts } from "@/services/productsService";
import { Typography } from "@mui/material";
import Filter from "@/components/Filter";
import Pagination from "@/components/Pagination";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const { items, favourites } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchProducts()
      .then((res) => {
        setProducts(res);
        setFilteredProducts(res);
      })
      .catch((err) => {
        console.error("Error fetching products: ", err);
      });
  }, []);

  const onAdd = (product) => {
    dispatch(addCartItem(product));
  };

  const onDel = (id) => {
    dispatch(removeCartItem(id));
  };

  const handleFilter = (filters) => {
    let filtered = products;
    if (filters.category) {
      filtered = filtered.filter((product) =>
        product.category.toLowerCase().includes(filters.category.toLowerCase())
      );
    }
    if (filters.priceRange) {
      filtered = filtered.filter(
        (product) =>
          product.price >= filters.priceRange[0] &&
          product.price <= filters.priceRange[1]
      );
    }
    if (filters.rating) {
      filtered = filtered.filter((product) => product.rating >= filters.rating);
    }
    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to the first page when filters are applied
  };



  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className="container mx-auto">
      <Filter onFilter={handleFilter} />
      <div className="flex flex-wrap gap-4">
        {currentProducts?.map((product) => (
          <div className="w-[312px] min-h-[468px] rounded-[12px] bg-white" key={product.id}>
            <div className="w-[312px] h-[284px] flex items-center justify-center relative">
              <div
                onClick={() => Router.push(`/products/${product.id}`)}
                className="relative w-[220px] h-[220px] cursor-pointer"
              >
                <Image
                  src={product.image}
                  layout="fill"
                  quality={100}
                  objectFit="contain"
                  alt={product.title}
                />
              </div>
              <div className="absolute top-5 right-5 cursor-pointer">
                {favourites?.some((item) => item.id === product.id) ? (
                  <FavoriteSharpIcon
                    className="text-red-500"
                    onClick={() => dispatch(deleteFavourites(product.id))}
                  />
                ) : (
                  <FavoriteBorderSharpIcon
                    className="text-gray-500"
                    onClick={() => dispatch(addFavourites(product))}
                  />
                )}
              </div>
            </div>
            <div className="px-[16px]">
              <p className="text-[#7E7E83] leading-[24px] text-[16px]">
                {product.category}
              </p>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontWeight: "bold",
                  mb: 1,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
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
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={filteredProducts.length}
        paginate={(pageNumber) => setCurrentPage(pageNumber)}
        currentPage={currentPage}
      />
    </div>
  );
}
