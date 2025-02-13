"use client";
import Allhero from "@/components/Allhero";
import Navbar from "@/components/Navbar";
import React, { useEffect, useState, useMemo } from "react";
import backgroundimage from "@/public/assets/Rectangle 1.png";
import Cards from "@/components/Cards";
import { client } from "@/sanity/lib/client";
import vecter1 from "@/public/assets/Vector (5).png";
import vecter2 from "@/public/assets/Vector (4).png";
import vecter3 from "@/public/assets/bi_view-list.png";

import Footer from "@/components/Footer";
import Image from "next/image";
import Banifits from "@/components/Banifits";
import { Skeleton } from "@/components/ui/skeleton";

// Define your Product interface
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

const Page = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("lowToHigh");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10; // Define how many items to show per page

  useEffect(() => {
    const query2 = `*[_type == "Products"]{
      _id,
      title,
      "productImage": image.asset->url,
      description,
      price,
    }`;

    const fetchProducts = async () => {
      try {
        const fetchQuery2 = await client.fetch(query2);
        console.log(fetchQuery2);
        setAllProducts(fetchQuery2); // Set the fetched data to state
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false); // End loading state
      }
    };

    fetchProducts();
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return allProducts
      .filter(product => product.title.toLowerCase().includes(filter.toLowerCase()))
      .sort((a, b) => sortOrder === "lowToHigh" ? a.price - b.price : b.price - a.price);
  }, [allProducts, filter, sortOrder]);

  // Pagination logic
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <>
      <Navbar />
      <Allhero src={backgroundimage} page="Shop" />

      <div className="w-full py-5 bg-[#F9F1E7] flex flex-col md:flex-row justify-between items-center">
        <div className="w-full md:w-1/2 px-4 md:px-10 flex flex-col md:flex-row gap-5 items-center mb-4 md:mb-0">
          <div className="flex justify-between space-x-4">
            <Image
              src={vecter1}
              width={15}
              height={15}
              className="object-contain"
              alt="filter"
            />
            <p>Filter</p>
            <Image
              src={vecter2}
              width={15}
              height={15}
              className="object-contain"
              alt="filter"
            />
            <Image
              src={vecter3}
              width={15}
              height={15}
              className="object-contain"
              alt="filter"
            />
            <input 
              type="text" 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Search products..." 
              className="border rounded p-1"
            />
          </div>
          <div className="border-l-2 px-5 hidden md:block">
            <p>Showing 1 to {allProducts.length} of {allProducts.length} result</p>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex flex-col md:flex-row md:justify-end items-center space-y-3 md:space-y-0 md:space-x-5 px-4 md:px-10">
          <div className="flex space-x-3">
            <label htmlFor="show">Show</label>
            <input type="number" className="w-20" min="1" defaultValue="10" />
          </div>
          <div className="flex space-x-3">
            <p>Sort By</p>
            <select 
              onChange={(e) => setSortOrder(e.target.value)} 
              className="w-32"
            >
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex space-x-3">
          <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
            Previous
          </button>
          <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
        <p>Page {currentPage} of {totalPages}</p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 container mx-auto my-5 px-10 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[...Array(4)].map((_, i) => (
            <div className="flex flex-col space-y-3" key={i}>
              <Skeleton className="lg:h-[350px] h-[300px] lg:w-[300px] w-[250px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-8 w-[200px]" />
                <Skeleton className="h-8 lg:w-[280px] w-[200px]" />
                <Skeleton className="h-2 w-[100px]" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Cards products={currentProducts} />
      )}

      <Banifits />
      <Footer />
    </>
  );
};

export default Page;
