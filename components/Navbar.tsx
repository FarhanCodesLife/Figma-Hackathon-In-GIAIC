"use client";

import React, { useState } from "react";
import acounticon from "@/public/assets/mdi_account-alert.png";
import searchicon from "@/public/assets/akar-icons_search.png";
import hearticon from "@/public/assets/akar-icons_heart.png";
import carticon from "@/public/assets/ant-design_shopping-cart-outlined.png";
import logo from "@/public/assets/Frame 168.png";
import { FiAlignRight } from "react-icons/fi";
import { FaTrash } from "react-icons/fa6";

import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {decreaseQuantity, increaseQuantity, removeToCart} from "@/app/reduxconfig/reducer/cartSlice.js"


import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [heartCount, setHeartCount] = useState(0);

  const dispatch = useDispatch();
  const cartItems = useSelector((state: any) => state.cart.cartItems);
  const totalItems = cartItems.reduce(
    (total: number, item: any) => total + item.quantity,
    0
  );

  console.log(cartItems);
  
const deleteToCart = (id:number)=>{

  dispatch(removeToCart({id}))
}


const increasQuantity = (id:number)=>{

   dispatch(increaseQuantity({id}))
  console.log(id);
  

}
const decreasQuantity =(id:number)=>{

  dispatch(decreaseQuantity({id}))
  console.log(id);
  

}



return (
    <nav>
      <div className="p-5 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-5">
        <div className="w-full  md:w-1/3 flex justify-between items-center md:justify-start px-4">
          <Image src={logo} width={150} height={200} alt="logo" />
          <button
            className="flex sm:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <FiAlignRight className="text-xl" />
          </button>
        </div>

        <div
          className={`${
            isMenuOpen
              ? "flex  bg-zinc-300 p-2  rounded-lg shadow-lg"
              : "hidden"
          } md:flex flex-col md:flex-row w-full md:w-2/3 justify-around px-10 gap-4 md:gap-0`}
        >
          <Link
            href="/"
            className="hover:underline-offset-4  hover:underline  hover:scale-105"
          >
            Home
          </Link>
          <Link
            href="/shop"
            className="hover:underline-offset-4  hover:underline hover:scale-105 "
          >
            Shop
          </Link>
          <Link
            href="/blog"
            className="hover:underline-offset-4  hover:underline hover:scale-105"
          >
            Blog
          </Link>
          <Link
            href="/contect"
            className="hover:underline-offset-4  hover:underline hover:scale-105"
          >
            Contact
          </Link>
        </div>

        <div className="flex justify-center md:justify-between w-full md:w-1/3 px-4 md:px-10 gap-6 md:gap-0">
          <div>
            <Image
              src={acounticon}
              className="cursor-pointer hover:scale-105"
              width={25}
              height={30}
              alt="account"
            />
          </div>
          <div className="relative">
            <Image
              src={searchicon}
              className="cursor-pointer hover:scale-105"
              width={25}
              height={30}
              alt="search"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            />
            {isSearchOpen && (
              <div className="absolute z-10 right-0 mt-2 w-64">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full p-2 border rounded-md shadow-lg"
                />
              </div>
            )}
          </div>
          <div className="relative">
            <Image
              src={hearticon}
              className="cursor-pointer hover:scale-105"
              width={25}
              height={30}
              alt="favorites"
              onClick={() => setHeartCount((prev) => prev + 1)}
            />
            {heartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {heartCount}
              </span>
            )}
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <div>
                <Image
                  src={carticon}
                  className="cursor-pointer hover:scale-105"
                  width={25}
                  height={30}
                  alt="cart"
                />
              </div>
            </SheetTrigger>
            <SheetContent>
  <SheetHeader>
    <SheetTitle className="text-xl font-semibold border-b pb-2 mb-4">Shopping Cart</SheetTitle>
  </SheetHeader>
  <div className=" h-screen overflow-auto pb-20 scroll-smooth ">

  {cartItems.length > 0 ? (
    cartItems.map((item:any) => ( 

      <div key={item.id} className=" items-center justify-between bg-white shadow-sm rounded-lg p-4 mb-4">
        <div className="flex items-center space-x-4">
          <div>
            <Image src={item.image} width={80} height={50} alt={item.id} className="border"/>
          </div>
          <div>
            <p className="text-lg font-medium">{item.name}</p>
            <p className="text-gray-500 text-sm">{item.description || "Product description"}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4 mt-2">
        <div className="flex items-center space-x-4">

          <button
            onClick={() => decreasQuantity(item.id)}
            className="px-2 py-1 bg-gray-200 text-gray-600 rounded hover:bg-gray-300"
            >
            -
          </button>
          <span className="text-lg font-medium">{item.quantity}</span>
          <button
            onClick={() => increasQuantity(item.id)}
            className="px-2 py-1 bg-gray-200 text-gray-600 rounded hover:bg-gray-300"
            >
            +
          </button>
        </div>
        <div className="w-full items-center">

        <h1 className="font-bold">Rs : {item.price*item.quantity}</h1>
        </div>
        <FaTrash  onClick={() => deleteToCart(item.id)} className="text-3xl text-red-500 cursor-pointer"          />
       
            </div>
      </div>
      
          
    ))
  ) : (
    <div className="mt-4 text-center text-gray-100">
      <p>Your cart is empty</p>
    </div>
  )}
  {cartItems.length > 0 && 

<div className="flex flex-col w-full justify-end   bg--500">
       <div className="mt-20  flex flex-col gap-5 bg--300 ">
         <div className="flex w-full justify-between ">

          <h1>Total Amount</h1>
          <h1>RS : 250000</h1>
         </div>
          
         <button className="bg-red-500  w-full py-2 rounded-xl ">CheckOut</button>
        </div>

      </div>
}
      </div>
</SheetContent>

          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
