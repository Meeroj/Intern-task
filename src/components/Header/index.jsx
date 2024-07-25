import { Button } from "@mui/material";
import React from "react";
import SearchInput from "./SearchInput";
import CatagoriesList from "../Catagories";
import Router from "next/router";
import Link from "next/link";


export default function Header() {

  return (
    <>
    <div className="w-full bg-white sticky top-0 z-50">
      <div className="w-full h-[72px] m-auto flex justify-between items-center px-[60px]">
        <Link href={'/'}><p className="text-3xl font-bold ">InterntTask</p></Link>
        <CatagoriesList />
        <SearchInput />
        <div className="flex">
          <div className="w-[80px] h-[46px] flex-row items-center cursor-pointer">
            
          </div>
          <div className="w-[80px] h-[46px] flex-row items-center cursor-pointer" onClick={() => Router.push(`/favourites`)}>
            <span className="w-[24px] h-[24px] m-[28px]">
              <i className="fa-regular fa-heart"></i>
            </span>
            <p className="text-[12px] text-center">Favourites</p>
          </div>
          <div className="w-[80px] h-[46px] flex-row items-center cursor-pointer" onClick={() => Router.push(`/cart`)}>
            <span className="w-[24px] h-[24px] m-[28px]">
              <i className="fa-solid fa-cart-arrow-down"></i>
            </span>
            <p className="text-[12px] text-center">Cart</p>
          </div>
        </div>
        <div className={`flex`}>
          {/* <Login />
          <Register /> */}
        </div>
        <div className={`flex`}>
          <Button
            className="text-gray-800 text-[22px]"
            variant="text"
            sx={{
              color: "black",
              fontSize: "22px",
              width: "30px",
              height: "46px",
            }}
          >
            <i className="fa-solid fa-user-tie"></i>
          </Button>
          <Button
            className="text-gray-800 text-[22px]"
            variant="text"
            sx={{
              color: "black",
              fontSize: "22px",
              width: "30px",
              height: "46px",
            }}
          >
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
          </Button>
        </div>
      </div>
    </div>
    </>
  );
}
