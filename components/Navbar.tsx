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
import {
  decreaseQuantity,
  increaseQuantity,
  removeToCart,
} from "@/app/reduxconfig/reducer/cartSlice.js";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { urlFor } from "@/sanity/lib/image";

interface Product {
  _id: number;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image?: string;
  isNew?: boolean;
  quantity: number;
  quantityprice: number;
  selectedSize?:string;
  selectedColor?:string
}

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  // const [heartCount, setHeartCount] = useState(0);
  // const [cartCount, setcartCount] = useState(0);

  const dispatch = useDispatch();
  const cartItems: Product[] = useSelector(
    (state: { cart: { cartItems: Product[] } }) => state.cart.cartItems
  );
  const wishItems: Product[] = useSelector(
    (state: { wish: { wishItems: Product[] } }) => state.wish.wishItems
  );
  // setcartCount(cartItems.length)
  const totalItems = cartItems.reduce(
    (total: number, item: Product) => total + item.quantity,
    0
  );
  const totalPrice = cartItems.reduce(
    (total: number, item: Product) => total + item.quantityprice,
    0
  );

  console.log(totalPrice);

  const deleteToCart = (_id: number) => {
    dispatch(removeToCart({ _id }));
  };

  const increasQuantity = (_id: number) => {
    dispatch(increaseQuantity({ _id }));
    console.log(_id);
  };
  const decreasQuantity = (_id: number) => {
    dispatch(decreaseQuantity({ _id }));
    console.log(_id);
  };

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
            <Link href="/wishlist">
            <button>

            <Image
              src={hearticon}
              className="cursor-pointer hover:scale-105"
              width={25}
              height={30}
              alt="favorites"
              // onClick={() => setHeartCount((prev) => prev + 1)}
              />
            {wishItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {wishItems.length}
              </span>
            )}
            </button>
            </Link>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <div className="relative">
                <Image
                  src={carticon}
                  className="cursor-pointer hover:scale-105"
                  width={25}
                  height={30}
                  alt="cart"
                  // onClick={() => setHeartCount((prev) => prev + 1)}

                />
               {cartItems.length > 0 && (
              <span className="absolute cursor-pointer -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartItems.length}
              </span>
            )}
              </div>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="text-xl font-semibold border-b pb-2 mb-4">
                  Shopping Cart
                </SheetTitle>
              </SheetHeader>
              <div className=" h-screen overflow-auto pb-20 scroll-smooth ">
                {cartItems.length > 0 ? (
                  cartItems.map((item: Product) => (
                    <div
                      key={item._id}
                      className=" items-center justify-between bg-white shadow-sm rounded-lg p-4 mb-4"
                    >
                      <div className="flex items-center space-x-4">
                        <div>
                          <Image
                            src={urlFor(item.image).url() || "/path/to/default-image.png"}
                            width={50}
                            height={50}
                            alt={item.title || "Product"}
                            className="border bg-cover rounded-md"
                          />
                        </div>
                        <div>
                          <p className="text-lg font-medium">{item.title.slice(0,15)}...</p>
                          <p className="text-gray-500 text-sm">
                            {item.description.slice(0,30) || "Product description"}...
                          </p>
                        </div>
                          <span
            className="inline-block w-6 h-6 rounded-full"
            style={{ backgroundColor: item.selectedColor }}
          ></span>
          <p className="text-lg font-medium">{item.selectedSize}</p>
                      </div>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => decreasQuantity(item._id)}
                            className="px-2 py-1 bg-gray-200 text-gray-600 rounded hover:bg-gray-300"
                          >
                            -
                          </button>
                          <span className="text-lg font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => increasQuantity(item._id)}
                            className="px-2 py-1 bg-gray-200 text-gray-600 rounded hover:bg-gray-300"
                          >
                            +
                          </button>
                        </div>
                        <div className="w-full items-center">
                          <h1 className="font-bold">Rs : {item.price}</h1>
                        </div>
                        <FaTrash
                          onClick={() => deleteToCart(item._id)}
                          className="text-3xl text-red-500 cursor-pointer"
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="mt-4 text-center">
                    <p>Your cart is empty</p>
                  </div>
                )}

                {cartItems.length > 0 && (
                  <div className="flex flex-col w-full justify-end   bg--500">
                    <div className="mt-20  flex flex-col gap-5 bg--300 ">
                      <div className="flex w-full justify-between ">
                        <h1>Total Quantity</h1>
                        <h1>{totalItems}</h1>
                      </div>

                      <div className="flex w-full justify-between ">
                        <h1>Total Amount</h1>
                        <h1>RS : {totalPrice}</h1>
                      </div>

                      <Link href="/cart">

                      <button className="bg-red-500  w-full py-2 rounded-xl ">
                        CheckOut
                      </button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
