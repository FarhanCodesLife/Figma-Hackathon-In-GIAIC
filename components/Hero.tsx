// import Image from 'next/image'
// import React from 'react'
import heroimage from '@/public/assets/hero.png'

// const Hero = () => {
//   return (
//     <>
    
//     <div>
//         <Image src={heroimage} width={1440} height={716} alt='Hero Image' />

//     </div>
//     </>
//   )
// }

// export default Hero



import Image from "next/image";

export default function Hero() {
  return (
    <div className=" ">
      <div className=" w-full">
        <Image
          src={heroimage}
          alt="Hero furniture image"
          width={1440}
          height={100}
          priority
          className="w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] object-cover"
        />
        <div className="heroText bg-[#FFF3E3] w-[50%] md:w-[38rem] absolute 
          top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
          md:top-[22%] md:left-[51%] md:transform-none
          rounded-[6px] p-4 md:p-[3rem] mx-auto
          sm:w-[80%] lg:w-[40rem]">
          <h6 className="font-bold text-gray-500 text-xs sm:text-sm md:text-base">New Arrival</h6>
          <h3 className="text-[#B88E2F] font-poppins font-extrabold 
            text-lg sm:text-2xl md:text-[3.25rem] sm:leading-tight">
            Discover Our <br /> New Collection
          </h3>
          <p className="sm:leading-loose font-poppins font-medium 
            text-xs sm:text-sm md:text-[1rem] my-1 sm:my-3 md:my-5">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.
          </p>
          <button className="bg-[#B88E2F] 
            py-1 px-3 sm:py-3 sm:px-8 md:pt-4 md:pr-12 md:pb-4 md:pl-12 
            text-xs sm:text-base text-white
            hover:bg-[#a17d2a] transition-colors duration-300">
            BUY NOW
          </button>
        </div>
      </div>
    </div>
  );
}

// export default Hero