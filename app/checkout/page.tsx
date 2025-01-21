
"use client"
import React from "react";
import Allhero from "@/components/Allhero";
import Navbar from "@/components/Navbar";
import Banifits from "@/components/Banifits";
import Footer from "@/components/Footer";
import backgroundimage from "@/public/assets/Rectangle 1.png";
// import Image from "next/image";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   decreaseQuantity,
//   increaseQuantity,
//   removeToCart,
// } from "../reduxconfig/reducer/cartSlice";
// import { urlFor } from "@/sanity/lib/image";
// import { FaTrash } from "react-icons/fa6";

// interface Product {
//   _id: number;
//   title: string;
//   description: string;
//   price: number;
//   originalPrice?: number;
//   discount?: number;
//   image?: string;
//   isNew?: boolean;
//   quantity: number;
//   quantityprice: number;
//   selectedSize?:string;
//   selectedColor?:string
// }

const Page = () => {
  // const dispatch = useDispatch();
  // const cartItems: Product[] = useSelector(
  //   (state: { cart: { cartItems: Product[] } }) => state.cart.cartItems
  // );

  // const deleteToCart = (_id: number) => {
  //   dispatch(removeToCart({ _id }));
  // };

  // const increasQuantity = (_id: number) => {
  //   dispatch(increaseQuantity({ _id }));
  //   console.log(_id);
  // };

  // const decreasQuantity = (_id: number) => {
  //   dispatch(decreaseQuantity({ _id }));
  //   console.log(_id);
  // };
// console.log(cartItems);

  return (
    <>
      <Navbar />
      <Allhero src={backgroundimage} page="CheckOut" />
     
      <Banifits />
      <Footer />
    </>
  );
};

export default Page;
