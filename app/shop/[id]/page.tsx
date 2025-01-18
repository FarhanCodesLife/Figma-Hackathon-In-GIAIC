'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
// import image1 from '@/public/assets/Images (1).png'
// import image2 from '@/public/assets/Images.png'
// import image3 from '@/public/assets/image 1.png'
// import image4 from '@/public/assets/Images (2).png'
// import image5 from '@/public/assets/image 6.png'
// import image6 from '@/public/assets/image 8.png'
import Navbar from '@/components/Navbar';
import Banifits from '@/components/Banifits';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Cards from '@/components/Cards';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/app/reduxconfig/reducer/cartSlice.js';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { Skeleton } from "@/components/ui/skeleton"
import { addTowish } from '@/app/reduxconfig/reducer/wishSlice';
// import { useRouter } from 'next/router';

const SingleProduct = () => {

  interface Review {
    user: string;          // Name of the reviewer
    rating: number;        // Rating given by the reviewer (e.g., out of 5)
    comment: string;       // Optional comment from the reviewer
  }
  // interface Product {
  //   _id: String;           // Unique identifier for the product
  //   title: string;          // Name of the product
  //   description: string;   // Description of the product
  //   price: number;         // Current price of the product
  //   originalPrice?: number; // (Optional) Original price before dicountPercentage
  //   dicountPercentage?: number;     // (Optional) dicountPercentage percentage
  //   image?: string;        // (Optional) URL or path of the product image
  //   isNew?: boolean;       // (Optional) Indicates if the product is new
  //   additionalInfo?: string; // (Optional) Additional details about the product
  //   category?: string;     // (Optional) Product category (e.g., "Furniture > Chairs")
  //   tags?: string[];       // (Optional) Array of tags for product classification
  //   reviews?: Review[];    // (Optional) Array of reviews for the product
  // }

  interface Product {
    _id: number;
    title: string;
    description: string;
    price: number;
    originalPrice?: number;
    dicountPercentage?: number;
    image?: string;
    isNew?: boolean;
    reviews?: Review[];
    tags?: string[]
  }

  const [product, setProduct] = useState<Product | null>(null);
  const [mostSellproduct, setMostSellproduct] = useState<Product[]|null>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Loading state

  const { id } = useParams(); // assuming _id is passed as a string from the URL

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        console.error("Product ID is missing.");
        toast.error("Invalid product ID.");
        return;
      }

      try {
        const singleProduct = `*[_id == "${id}"]`;
        const mostSell = `*[price > 200]`;
        const data = await client.fetch(singleProduct);
        const mostSellData = await client.fetch(mostSell);
        setMostSellproduct(mostSellData);

        if (data && data.length > 0) {
          setProduct(data[0]); // Set the first product from the result
        } else {
          console.warn("No product found for the given ID.");
          toast.error("Product not found.");
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
        toast.error("Failed to load product details.");
      } finally {
        setIsLoading(false); // End loading state
      }
    };

    fetchProduct();

    // Cleanup function (optional, for fetch cancellation)
    return () => {
      setProduct(null); // Reset state when component unmounts
    };
  }, [id]);

  const dispatch = useDispatch();
  console.log(product);

  // Add color and size options
  const colorOptions = ['#6B7FB7', '#986B9C', '#A48D6B'];
  const sizeOptions = ['L', 'XL', 'XS'];
  // const imageUrl = product?.image?.asset?._ref ? urlFor(product.productImage).url() : '/placeholder.jpg';

  // Add state for quantity
  const [quantity, setQuantity] = React.useState(1);

  // const handleNavigate = () => {
  //   // Navigate to a new page (e.g., '/about')
  //   // router.push('/cart');
  // };

  // Add to cart handler
  const handleAddToCart = () => {
    console.log("click button");

    dispatch(addToCart({
      ...product,
      quantity,
      colorOptions,
      sizeOptions
    }));


    
  
    toast.success(`Added ${quantity} ${product?.title} to cart`, {
      description: `Quantity: ${quantity}`,
      action: {
        label: "View Cart",
        onClick: () => console.log("View cart clicked"),
      },
    });
  };

  const handleAddTowish = () => {
    console.log("click button");

    dispatch(addTowish({
      ...product,
      quantity,
      colorOptions,
      sizeOptions
    }));
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="grid md:grid-cols-2 mx-16 my-10 container justify-center items-center w-full gap-8 lg:gap-2">
          <div className=''>
            <Skeleton className="lg:h-[600px] h-[400px] lg:w-[44vw] w-[80vw] rounded-xl" />
          </div>
          <div className="space-y-4">
            <Skeleton className="lg:h-10 h-8 lg:w-[300px] w-[200px]" />
            <Skeleton className="lg:h-6 h-4 lg:w-[200px] w-[150px]" />
            <Skeleton className="lg:h-10 h-8 lg:w-[150px] w-[100px]" />
            <Skeleton className="lg:h-36 h-32 lg:w-[400px] w-[200px]" />
            <Skeleton className="lg:h-6 h-4 lg:w-[50px] w-[20px]" />
            <Skeleton className="lg:h-12 h-10 lg:w-[150px] w-[80px]" />
            <Skeleton className="lg:h-6 h-4 lg:w-[50px] w-[30px]" />
            <Skeleton className="lg:h-12 h-10 lg:w-[150px] w-[70px]" />
            <Skeleton className="lg:h-16 h-10 lg:w-[520px] w-[70vw]" />
          </div>
        </div>
        <Banifits />
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <Link href="/" className="text-gray-600 hover:text-orange-500">Home</Link>
          <span className="text-gray-400">/</span>
          <Link href="/shop" className="text-gray-600 hover:text-orange-500">Shop</Link>
          <span className="text-gray-400">/</span>
          <span className="text-orange-500 font-medium">{product.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        {isLoading ? (
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <div className=''>
              <Skeleton className="lg:h-[600px] h-[400px] lg:w-[44vw] w-[80vw] rounded-xl" />
            </div>
            <div className="space-y-4">
              <Skeleton className="lg:h-10 h-8 lg:w-[300px] w-[200px]" />
              <Skeleton className="lg:h-6 h-4 lg:w-[200px] w-[150px]" />
              <Skeleton className="lg:h-10 h-8 lg:w-[150px] w-[100px]" />
              <Skeleton className="lg:h-36 h-32 lg:w-[400px] w-[200px]" />
              <Skeleton className="lg:h-6 h-4 lg:w-[50px] w-[20px]" />
              <Skeleton className="lg:h-12 h-10 lg:w-[150px] w-[80px]" />
              <Skeleton className="lg:h-6 h-4 lg:w-[50px] w-[30px]" />
              <Skeleton className="lg:h-12 h-10 lg:w-[150px] w-[70px]" />
              <Skeleton className="lg:h-16 h-10 lg:w-[520px] w-[70vw]" />
            </div>
          </div>
        ) : (
          
<div>
         

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-gray-100">
            <Image
              src={urlFor(product.image).url() || '/placeholder.jpg'}
              alt={product.title}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 30vw"
            />
            {product.dicountPercentage && (
              <span className="absolute top-4 left-4 bg-red-500 text-white px-4 py-1.5 rounded-full text-sm font-medium">
                -{product.dicountPercentage}% OFF
              </span>
            )}
            {product.isNew && (
              <span className="absolute top-4 right-4 bg-emerald-500 text-white px-4 py-1.5 rounded-full text-sm font-medium">
                New Arrival
              </span>
            )}
          </div>

          <div className="flex flex-col space-y-6 sm:space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-gray-900">{product.title}</h1>
              <div className="flex items-center gap-3">
                <div className="flex text-yellow-400 text-lg">
                  {'★'.repeat(4)}{'☆'.repeat(1)}
                </div>
                <span className="text-gray-500 text-sm">({product.reviews?.length || 0} Customer Reviews)</span>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-orange-500">
                  Rp {product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-400 line-through">
                    Rp {product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed">{product.description.slice(0,100)}</p>

            <div className="space-y-3">
              <span className="text-sm font-medium text-gray-700">Select Size</span>
              <div className="flex gap-3">
                {sizeOptions.map((size) => (
                  <button 
                    key={size} 
                    className="w-12 h-12 border-2 rounded-lg flex items-center justify-center
                    hover:border-orange-500 hover:text-orange-500 transition-colors
                    focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-sm font-medium text-gray-700">Select Color</span>
              <div className="flex gap-3">
                {colorOptions.map((color) => (
                  <button
                    key={color}
                    className="w-10 h-10 rounded-full border-2 border-white ring-2 ring-gray-200
                    hover:ring-orange-500 transition-colors focus:outline-none focus:ring-offset-2"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex- sm: items-stretch sm:items-center gap-4">
              <div className="flex  border-2 rounded-lg overflow-hidden">
                <button 
                  className="px-4 py-3 hover:bg-gray-100 transition-colors"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <input 
                  type="text" 
                  value={quantity} 
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="md:w-16 w-10 text-center border-x-2" 
                />
                <button 
                  className="px-4 py-3 hover:bg-gray-100 transition-colors"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
              <Button  
      variant="outline"
      onClick={handleAddToCart}
                className="flex-1 bg-orange-500 text-white py-6 px-6 rounded-lg
                  hover:bg-orange-600 transition-colors font-medium"
              >
                Add To Cart
              </Button>
              <button
              onClick={handleAddTowish}
              className="px-4 py-3 border-2 rounded-lg hover:bg-gray-50 transition-colors">
                ♡
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-6 border-t">
              <span className="text-sm font-medium text-gray-700">Share:</span>
              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                {['Facebook', 'Twitter', 'Instagram'].map((social) => (
                  <div className='flex items-center justify-center gap-1' key={social}>
                    <button  
                    className="w-5 h-5 rounded-full  bg-gray-700 
                    hover:bg-blue-500 transition-colors">                 </button><p >{social}</p>
                    </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 sm:mt-16">
          <div className="border-b flex flex-wrap gap-4 sm:gap-8">
            <button className="px-6 py-3 border-b-2 border-orange-500 font-medium text-orange-500">
              Description
            </button>
            <button className="px-6 py-3 text-gray-500 hover:text-gray-700">
              Additional Information
            </button>
            <button className="px-6 py-3 text-gray-500 hover:text-gray-700">
              Reviews ({product.reviews?.length || 0})
            </button>
          </div>
          <div className="py-8 pb-20 border-b-2">
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>
      </div>
      // <div className='m-4 sm:m-10 text-center'>
        
      //  <h1 className='text-3xl m-10 font-bold'>
        
      //    Most Selling Products
      //   </h1>

      // <Cards products={products}/>
      // </div>
        )}

        {/* Most Sell Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-semibold text-gray-800">Most Selling Products</h2>
          {/* <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8 mt-8"> */}
            
              {/* <Cards products={mostSellproduct} /> */}
           
          {/* </div> */}
        </div>
      </div>

      <Banifits />
      <Footer />
    </>
  );
};

export default SingleProduct;
