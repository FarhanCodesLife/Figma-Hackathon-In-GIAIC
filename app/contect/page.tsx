import Allhero from '@/components/Allhero'
import Navbar from '@/components/Navbar'
import React from 'react'
import backgroundimage from '@/public/assets/Rectangle 1.png'
import Banifits from '@/components/Banifits'
import Footer from '@/components/Footer'

import { FaLocationDot } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import { FaClock } from "react-icons/fa";
import { Button } from '@/components/ui/button'


const page = () => {
  return (
    <>
    <Navbar/>
    <Allhero src={backgroundimage} page='Contact'/>
    <div className='container mx-auto px-4 py-16 max-w-7xl'>
      <div className='text-center space-y-4 md:w-2/3 lg:w-1/2 mx-auto mb-12'>
        <h1 className='text-3xl md:text-4xl font-bold text-gray-900'>Get In Touch With Us</h1>
        <p className='text-gray-600 leading-relaxed'>For More Information About Our Product & Services. Please Feel Free To Drop Us An Email. Our Staff Always Be There To Help You Out. Do Not Hesitate!</p>
      </div>

      <div className='flex flex-col md:flex-row justify-between items-start gap-8'>
        {/* Contact Information */}
        <div className='w-full   md:w-1/3 space-y-8'> 

          <div className='flex   items-start gap-4'>
            <FaLocationDot className='text-orange-700  text-xl mt-1'/>
            <div>
              <h2 className='font-semibold text-gray-900 mb-2'>Address</h2>
              <p className='text-gray-600'>236 5th SE Avenue, New York NY10000, United States</p>
            </div>
          
          
          </div>


          <div className='flex items-start gap-4'>
            <FaPhone className='text-orange-700 text-xl mt-1'/>
            <div>
              <h2 className='font-semibold text-gray-900 mb-2'>Phone</h2>
              <p className='text-gray-600'>Mobile: +(84) 546-678</p>
              <p className='text-gray-600'>Mobile: +(84) 546-678</p>
            </div>
          
          
          </div>


          <div className='flex items-start gap-4'>
            <FaClock className='text-orange-700 text-xl mt-1'/>
            <div>
              <h2 className='font-semibold text-gray-900 mb-2'>Working Times</h2>
              <p className='text-gray-600'>Monday-Friday: 9:00 - 22:0 Saturday-Sunday: 9:00 - 21:00, </p>
              <p className='text-gray-600'>Monday-Friday: 9:00 - 22:0 Saturday-Sunday: 9:00 - 21:00, </p>
            </div>
          
          
          </div>

          {/* ... similar updates for Phone and Working Time sections ... */}
        </div>

        {/* Contact Form */}
        <div className='w-full md:w-1/2 bg-gray-50 rounded-lg p-8'> 
          <form className='space-y-6'>
            <div>
              <label htmlFor="name" className='block text-sm font-medium text-gray-700 mb-2'>Your Name</label>
              <input 
                type="text"
                name="name"
                id="name"
                className='h-10 rounded-lg border-2 w-3/4'
                placeholder='Your Name'
                required
              />
            </div>

            <div>
              <label htmlFor="email" className='block text-sm font-medium text-gray-700 mb-2'>Email Address</label>
              <input 
                type="email"
                name="email"
                id="email"
                className='h-10 rounded-lg border-2 w-3/4'
                placeholder='Your Email'
                required
              />
            </div>

            <div>
              <label htmlFor="subject" className='block text-sm font-medium text-gray-700 mb-2'>Subject</label>
              <input 
                type="text"
                name="subject"
                id="subject"
                className='h-10 rounded-lg border-2 w-3/4'
                placeholder='Subject'
                required
              />
            </div>

            <div>
              <label htmlFor="message" className='block text-sm font-medium text-gray-700 mb-2'>Message</label>
              <textarea 
                name="message"
                id="message"
                className='h-20  rounded-lg border-2 w-3/4'
                placeholder='Your Message'
                required
              />
            </div>

            <Button className='w-32 bg-orange-700 text-orange-300'>
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>

    <Banifits/>
    <Footer/>
    </>
  )
}

export default page