"use client";
import React, { useEffect, useState } from "react";
import image1 from "@/public/assets/Images (1).png";
import image2 from "@/public/assets/Images.png";
import image3 from "@/public/assets/image 1.png";
import image4 from "@/public/assets/Images (2).png";
import image5 from "@/public/assets/image 6.png";
import image6 from "@/public/assets/image 8.png";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { Skeleton } from "./ui/skeleton";

interface Product {
  _id: number;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  dicountPercentage?: number;
  productImage?: string;
  isNew?: boolean;
}

const Products = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Loading state

// let originalPrice = price / dicountPercentage * 100

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const Products = `*[_type == "Products"]`;
        const Response = await client.fetch(Products);
        setAllProducts(Response);
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setIsLoading(false); // End loading state
      }
    };

    fetchProduct();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-semibold mb-10">Our Products</h2>

      {isLoading ? (
        // Loading spinner or placeholder
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

         <div className="flex flex-col space-y-3">
      <Skeleton className="lg:h-[350px] h-[300px] lg:w-[300px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="h-8 lg:w-[280px] w-[200px]" />
        <Skeleton className="h-2 w-[100px]" />

      </div>
    </div>
    
             <div className="flex flex-col space-y-3">
          <Skeleton className="lg:h-[350px] h-[300px] lg:w-[300px] w-[250px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-[200px]" />
            <Skeleton className="h-8 lg:w-[280px] w-[200px]" />
            <Skeleton className="h-2 w-[100px]" />
      </div>
    </div>
    
             <div className="flex flex-col space-y-3">
          <Skeleton className="lg:h-[350px] h-[300px] lg:w-[300px] w-[250px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-[200px]" />
            <Skeleton className="h-8 lg:w-[280px] w-[200px]" />
            <Skeleton className="h-2 w-[100px]" />

      </div>
    </div>
    
             <div className="flex flex-col space-y-3">
          <Skeleton className="lg:h-[350px] h-[300px] lg:w-[300px] w-[250px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-[200px]" />
            <Skeleton className="h-8 lg:w-[280px] w-[200px]" />
            <Skeleton className="h-2 w-[100px]" />

      </div>
    </div>


    </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {allProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg overflow-hidden shadow-sm relative group"
            >
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                <div className="space-y-3 px-4">
                  <Link href={`/shop/${product._id}`}>
                    <button className="w-full bg-white text-gray-900 py-2 rounded hover:bg-gray-100 transition-colors">
                      Add to cart
                    </button>
                  </Link>

                  <div className="flex justify-center gap-6 text-white">
                    <button className="flex items-center gap-1 hover:text-gray-200">
                      <span>Share</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-gray-200">
                      <span>Compare</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-gray-200">
                      <span>Like</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="relative aspect-square">
                <Image
                  src={urlFor(product.image).url() || "/placeholder.jpg"} // Add fallback image
                  alt="product image"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="w-full h-full object-cover"
                />
                {product.dicountPercentage && (
                  <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                    -{product.dicountPercentage}%
                  </span>
                )}
                {product.isNew && (
                  <span className="absolute top-4 right-4 bg-teal-500 text-white px-3 py-1 rounded-full text-sm">
                    New
                  </span>
                )}
              </div>

              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
                <p className="text-gray-600 mb-3">
                  {product.description.slice(0, 50)}...
                </p>

                <div className="flex items-center gap-3 mb-4">
                  <span className="font-semibold">
                    Rp {product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-gray-500 line-through text-sm">
                      Rp {product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!isLoading && (
        <Link href={`/shop`}>
          <button className="block mx-auto px-8 py-3 border-2 border-orange-300 text-orange-500 font-medium rounded hover:bg-orange-700 hover:text-black transition-colors">
            Show More
          </button>
        </Link>
      )}
    </section>
  );
};

export default Products;
