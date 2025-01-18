"use client";
import React from "react";
import Allhero from "@/components/Allhero";
import Navbar from "@/components/Navbar";
import Banifits from "@/components/Banifits";
import Footer from "@/components/Footer";
import backgroundimage from "@/public/assets/Rectangle 1.png";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { removeTowish, addToCart } from "../reduxconfig/reducer/wishSlice";
import { urlFor } from "@/sanity/lib/image";
import { FaTrash, FaShoppingCart } from "react-icons/fa";

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
  const wishItems: Product[] = useSelector(
    (state: { wish: { wishItems: Product[] } }) => state.wish.wishItems
  );

  const deleteTowish = (_id: number) => {
    dispatch(removeTowish({ _id }));
  };

  const addProductToCart = (item: Product) => {
    dispatch(addToCart(item)); // Assuming there's an addToCart action in your Redux setup
  };

  return (
    <>
      <Navbar />
      <Allhero src={backgroundimage} page="Wish List" />

      <div className="container max-w-screen-xl mx-auto p-6 space-y-12">
        {/* Wishlist Header */}
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-gray-800">Your Wishlist</h2>
          <p className="text-lg text-gray-500 mt-2">
            Save your favorite items and purchase them anytime.
          </p>
        </div>

        {/* Wishlist Section */}
        {wishItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {wishItems.map((item: Product) => (
              <div
                key={item._id}
                className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl"
              >
                <Image
                  src={urlFor(item.image).url() || "/path/to/default-image.png"}
                  width={300}
                  height={200}
                  alt={item.title || "Product"}
                  className="object-cover w-full h-56"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {item.title.length > 20 ? `${item.title.slice(0, 20)}...` : item.title}
                  </h3>
                  <p className="text-gray-500 mt-2">{item.description.slice(0, 50)}...</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-800">${item.price}</span>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => addProductToCart(item)}
                        className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
                      >
                        <FaShoppingCart className="inline-block mr-2" /> Add to Cart
                      </button>
                      <button
                        onClick={() => deleteTowish(item._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash className="text-xl" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center w-full py-12">
            <p className="text-xl font-semibold text-gray-600">Your Wishlist is empty.</p>
          </div>
        )}

        <Banifits />
      </div>

      <Footer />
    </>
  );
};

export default Page;
