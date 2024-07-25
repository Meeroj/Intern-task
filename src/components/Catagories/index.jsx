// import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { productsCategories } from "@/services/productsService";
import axios from "axios";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { changeCategory } from "@/redux/category.slice";
import { Router } from "next/router";
import { useEffect, useState } from "react";

function CatagoriesList(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredcatalog, setHoveredCatalog] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoryType, setCategoryType] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = () => {
    productsCategories().then((res) => {
      console.log(res)
      setCategories(res);
    });
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
    setHoveredCatalog(null);
  };

  const handleCategoryChange = () => {
    dispatch(changeCategory(hoveredcatalog));
    setMobileOpen(false);
    setHoveredCatalog("");
  };

  useEffect(() => {
    if (hoveredcatalog) {
      axios
        .get(`https://fakestoreapi.com/products/categories`)
        .then((res) => {
          console.log(res)
          setCategoryType(res.data);
        });
    }
  }, [hoveredcatalog]);

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className="relative">
      <button
        className="h-[44px] text-white w-[143px] bg-[#FF9910] border-none rounded-md font-medium flex items-center justify-center gap-2 p-4"
        onClick={handleDrawerToggle}
      >
        {mobileOpen ? <CloseIcon /> : <MenuIcon />}
        Categories
      </button>
      <div
        className={`absolute top-[57px] left-0 w-[300px] h-[100vh] bg-[#F6F6F6] shadow-2xl z-40 overflow-y-auto transition-transform duration-300 transform ${
          mobileOpen ? "translate-x-[-350px]" : "-translate-x-[940px]"
        }`}
      >
        <div className="ml-[28px]">
        <Link
            className="h-[56px] flex rounded-l-[8px] text-black items-center cursor-pointer hover:bg-white pl-4 capitalize"
            href={`/`}
             onClick={handleCategoryChange}
        >
             All
        </Link>
          {categories.map((el, index) => (
              <Link
                key={index}
                className="h-[56px] flex rounded-l-[8px] text-black items-center cursor-pointer hover:bg-white pl-4 capitalize"
                onMouseEnter={() => setHoveredCatalog(el)}
                  href={`/categories/${hoveredcatalog}`}
                  onClick={handleCategoryChange}
                >
                  {el} 
                </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CatagoriesList;
