
"use client"
import React from "react";
import Allhero from "@/components/Allhero";
import Navbar from "@/components/Navbar";
import Banifits from "@/components/Banifits";
import Footer from "@/components/Footer";
import backgroundimage from "@/public/assets/Rectangle 1.png";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  removeToCart,
} from "../reduxconfig/reducer/cartSlice";
import { urlFor } from "@/sanity/lib/image";
import { FaTrash } from "react-icons/fa6";

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
}

const Page = () => {
  const dispatch = useDispatch();
  const cartItems: Product[] = useSelector(
    (state: { cart: { cartItems: Product[] } }) => state.cart.cartItems
  );

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
    <>
      <Navbar />
      <Allhero src={backgroundimage} page="Cart" />
      <div className="container flex flex-wrap lg:flex-nowrap m-auto p-6 lg:space-x-10 space-y-10">
        {/* Cart Section */}
        {cartItems.length > 0 ? (
          <div className=" shadow-md rounded-lg overflow-x-scroll w-full lg:w-full p-6">
            <table className="table-auto w-[800px] lg:w-full text-sm md:text-lg">
              <thead className="bg-[#FAF3EA] my-2 font-semibold">
                <tr>
                  <th className="w-2/12 text-center p-4">Product</th>
                  <th className="w-2/12 text-center p-4">Name</th>
                  <th className="w-2/12 text-center p-4">Color</th>
                  <th className="w-2/12 text-center p-4">Size</th>
                  <th className="w-2/12 text-center p-4">Price</th>
                  <th className="w-2/12 text-center p-4">Quantity</th>
                  <th className="w-2/12 text-center p-4">Subtotal</th>
                  <th className="w-2/12 text-center p-4">Remove</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {cartItems.map((item: Product) => (
                  <tr className="p-4" key={item._id}>
                    <td className="w-2/12 items-center">
                      <Image
                        src={urlFor(item.image).url() || "/path/to/default-image.png"}
                        width={80}
                        height={50}
                        alt={item.title || "Product"}
                        className="border my-2"
                      />
                    </td>
                    <td className="w-2/12 text-center">{item.title.slice(0,7)}...</td>
                    <td className="w-1/12 text-center">Green</td>
                    <td className="w-1/12 text-center">M</td>
                    <td className="w-2/12 text-center">{item.price}</td>
                    <td className="w-2/12 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => decreasQuantity(item._id)}
                          className="bg-gray-200 px-2 py-1 rounded"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => increasQuantity(item._id)}
                          className="bg-gray-200 px-2 py-1 rounded"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="w-2/12 text-center">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                    <td className="w-2/12 justify-center">

                     <FaTrash
                                              onClick={() => deleteToCart(item._id)}
                                              className="text-2xl m-auto text-red-500 cursor-pointer"
                                              />
                                              </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center w-full">
            <p className="text-xl font-semibold">Your cart is empty.</p>
          </div>
        )}

        {/* Cart Summary Section */}
        <div className="bg-[#FAF3EA]  shadow-md rounded-lg p-6 w-full lg:w-1/3">
          <h2 className="text-lg md:text-xl font-bold border-b pb-3">
            Cart Summary
          </h2>
          <div className="mt-4 space-y-4">
            <div className="flex justify-between text-gray-700">
              <span>Subtotal:</span>
              <span>
                $
                {cartItems
                  .reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )
                  .toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span>
                $
                {cartItems
                  .reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )
                  .toFixed(2)}
              </span>
            </div>
          </div>
          <button className="w-full mt-6 bg-black text-white py-3 rounded hover:bg-gray-800">
            Proceed to Checkout
          </button>
        </div>
      </div>
      <Banifits />
      <Footer />
    </>
  );
};

export default Page;
