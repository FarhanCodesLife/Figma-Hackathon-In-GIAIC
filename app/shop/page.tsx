"use client"
import Allhero from '@/components/Allhero'
import Navbar from '@/components/Navbar'
import React, { useEffect, useState } from 'react'
import backgroundimage from '@/public/assets/Rectangle 1.png'
import Cards from '@/components/Cards'
import {client} from "@/sanity/lib/client"
import vecter1 from '@/public/assets/Vector (5).png'
import vecter2 from '@/public/assets/Vector (4).png'
import vecter3 from '@/public/assets/bi_view-list.png'

// import image1 from '@/public/assets/Images (1).png'
// import image2 from '@/public/assets/Images.png'
// import image3 from '@/public/assets/image 1.png'
// import image4 from '@/public/assets/Images (2).png'
// import image5 from '@/public/assets/image 6.png'
// import image6 from '@/public/assets/image 8.png'

import Footer from '@/components/Footer'
import Image from 'next/image'
import Banifits from '@/components/Banifits'
import { Skeleton } from '@/components/ui/skeleton'

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

 const page = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Loading state

  const query2 = `*[_type == "Products"]{
    _id,
    title,
    "productImage": image.asset -> url,
    description,
    price,
}`

// const fetchQuery2 = await client.fetch(query2);

// console.log(fetchQuery2)


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchQuery2 = await client.fetch(query2);
        console.log(fetchQuery2);
        

        setAllProducts(fetchQuery2);  // Set the fetched data to state
      } catch (error) {
        console.error('Error fetching products:', error);
      }finally {
        setIsLoading(false); // End loading state
      }
    };

    fetchProducts();
  }, []);  // Empty dependency array ensures it runs only once on component mount

  return (
    <>
      <Navbar />
      <Allhero src={backgroundimage} page="Shop" />

      <div className='w-full py-5 bg-[#F9F1E7] flex flex-col md:flex-row justify-between items-center'>
        <div className='w-full md:w-1/2 px-4 md:px-10 flex flex-col md:flex-row gap-5 items-center mb-4 md:mb-0'>
          <div className='flex justify-between space-x-4'>
            <Image src={vecter1} width={15} height={15} className='object-contain' alt='filter'/>
            <p>Filter</p>
            <Image src={vecter2} width={15} height={15} className='object-contain' alt='filter'/>
            <Image src={vecter3} width={15} height={15} className='object-contain' alt='filter'/>
          </div>
          <div className='border-l-2 px-5 hidden md:block'>
            <p>Showing 1 to 16 of 32 result</p>
          </div>
        </div>

        <div className='w-full md:w-1/2 flex flex-col md:flex-row md:justify-end items-center space-y-3 md:space-y-0 md:space-x-5 px-4 md:px-10'>
          <div className='flex space-x-3'>
            <a>Show</a>
            <input type="text" className='w-20' />
          </div>
          <div className='flex space-x-3'>
            <p>Short By</p>
            <input type="text" className='w-32' />
          </div>
        </div>
      </div>
      {isLoading ? (
        // Loading spinner or placeholder
        <div className="grid grid-cols-1 container mx-auto my-5 px-10 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

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
      ):(

        <Cards products={allProducts} />
      )}

      <div className='flex justify-center space-x-3 md:space-x-6 items-center p-4 md:p-8'>
        <div className='px-3 md:px-4 py-2 cursor-pointer bg-[#FAF3EA] rounded-lg hover:bg-orange-800'>1</div>
        <div className='px-3 md:px-4 py-2 cursor-pointer bg-[#FAF3EA] rounded-lg hover:bg-orange-800'>2</div>
        <div className='px-3 md:px-4 py-2 cursor-pointer bg-[#FAF3EA] rounded-lg hover:bg-orange-800'>3</div>
        <div className='px-3 md:px-4 py-2 cursor-pointer bg-[#FAF3EA] rounded-lg hover:bg-orange-800'>Next</div>
      </div>

      <Banifits />
      <Footer />
    </>
  );
}

export default page;
