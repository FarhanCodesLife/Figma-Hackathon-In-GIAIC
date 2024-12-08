import Image from 'next/image';
import React from 'react'

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    discount?: number;
    image?: string ;
    isNew?: boolean;
  }
const Cards = ({products}:{products:Product[]}) => {
  return (
    <>

    <div className='container mx-auto my-5'>
        
        
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="bg-white rounded-lg overflow-hidden shadow-sm relative group"
          >
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              <div className="space-y-3 px-4">
                <button className="w-full bg-white text-gray-900 py-2 rounded hover:bg-gray-100 transition-colors">
                  Add to cart
                </button>
                
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
                src={product.image || '/placeholder.jpg'}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="w-full h-full object-cover"
              />
              {product.discount && (
                <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                  -{product.discount}%
                </span>
              )}
              {product.isNew && (
                <span className="absolute top-4 right-4 bg-teal-500 text-white px-3 py-1 rounded-full text-sm">
                  New
                </span>
              )}
            </div>

            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-3">{product.description}</p>
              
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
    </div>
    </>
  )
}

export default Cards