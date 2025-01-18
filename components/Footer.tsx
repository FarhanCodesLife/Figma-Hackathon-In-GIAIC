import React from 'react'

const Footer = () => {
  return (
    <footer>
      <div className='px-5 py-10 flex flex-col md:flex-row justify-around gap-8 md:gap-0 border-t-2'>
        <div className='space-y-5 text-center md:text-left'>
          <h1 className='text-2xl font-extrabold'>Funir0.</h1>
          <p>
            400 University Drive Suite 200 Coral Gables,<br/>
            FL 33134 USA
          </p>
        </div>

        <div className='space-y-5 text-center md:text-left'>
          <p className='text-gray-400'>Links</p>
          <p>Home</p>
          <p>Shop</p>
          <p>Blog</p>
          <p>Contact</p>
        </div>

        <div className='space-y-5 text-center md:text-left'>
          <p className='text-gray-400'>Help</p>
          <p>Payment Options</p>
          <p>Returns</p>
          <p>Privacy Policies</p>
        </div>

        <div className='space-y-5 text-center md:text-left'>
          <p className='text-gray-400'>Newsletter</p>
          <div className='flex flex-col md:flex-row gap-2 space-x-3 md:gap-0'>
            <input 
              type="email" 
              className='bg-transparent border-b-2 border-gray-400 text-center md:text-left' 
              placeholder='Enter Your Email Address' 
            /> 
            <a href="" className='md:border-b-2'>Subscribe</a>
          </div>
        </div>
      </div>

      <div className='border-t-2 bg-gray-800 text-white flex flex-wrap justify-between items-center  px-10 py-2 text-center md:text-left'>
        <p>2025 furino. All rights reserved</p>
        <p>Develop By Muhammad Farhan</p>
        <a href='https://github.com/FarhanCodesLife/'>Github.com/FarhanCodesLife</a>
      </div>
    </footer>
  )
}

export default Footer