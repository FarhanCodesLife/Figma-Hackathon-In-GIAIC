"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Allhero from "@/components/Allhero";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useDispatch, useSelector } from "react-redux";
// import { removeToCart } from "@/reduxconfig/reducer/cartSlice";
// import { FaTrash } from "react-icons/fa6";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import Image from "next/image";
import backgroundimage from "@/public/assets/Rectangle 1.png";

// Product Interface
interface Product {
  _id: number;
  title: string;
  description: string;
  price: number;
  quantity: number;
  image?: string;
  selectedSize?: string;
  selectedColor?: string;
}

// Form Data Interface for Shipping
interface FormData {
  firstName: string;
  lastName: string;
  companyName?: string;
  country: string;
  streetAddress: string;
  city: string;
  zip: string;
  email: string;
  phone: string;
}

const CheckoutPage = () => {
  // const dispatch = useDispatch();
  const cartItems: Product[] = useSelector(
    (state: { cart: { cartItems: Product[] } }) => state.cart.cartItems
  );
  
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // 1 -> Payment Step, 2 -> Shipping Step

  // Cart Deletion Function
  // const deleteFromCart = (_id: number) => {
  //   dispatch(removeToCart({ _id }));
  // };

  // Stripe Payment Function
  const payNow = async () => {
    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
    );

    try {
      const response = await axios.post("/api/v1/checkout", {
        products: cartItems,
      });

      if (response.data.id) {
        const result = await stripe?.redirectToCheckout({
          sessionId: response.data.id,
        });

        if (result?.error) {
          console.error(result.error.message);
        } else {
          setPaymentSuccess(true);
          setCurrentStep(2); // Move to shipping form once payment is successful
        }
      }
    } catch (error) {
      console.error("Payment Error:", error);
    }
  };

  // Shipping Form Handling
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const onSubmit = (data: FormData) => {
    console.log("Shipping Data:", data);
    alert("Shipping Information Submitted!");
  };

  // Total Price Calculation
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <>
      <Navbar />
      <Allhero src={backgroundimage} page="CheckOut" />

      <div className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Left Side: Payment Section */}
          {currentStep === 1 && (
            <div className="bg-white p-6 shadow-md rounded-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Section</h2>
              <div className="space-y-4">
                <p className="text-lg font-medium text-gray-600">Your cart is ready for checkout.</p>
                <button
                  onClick={payNow}
                  className="w-full bg-green-600 text-white py-2 rounded-md text-sm font-medium hover:bg-green-700 mt-4"
                >
                  Pay Now
                </button>
              </div>
            </div>
          )}

          {/* Right Side: Cart Items */}
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Cart</h2>
            {cartItems.length > 0 ? (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex justify-between items-center border-b pb-3">
                    <div className="flex items-center space-x-4">
                      <Image src={item.image || "/placeholder.jpg"} alt={item.title} width={50} height={50} />
                      <div>
                        <p className="text-sm font-semibold">{item.title}</p>
                        <p className="text-xs text-gray-500">Size: {item.selectedSize || "N/A"}</p>
                        <p className="text-xs text-gray-500">Color: {item.selectedColor || "N/A"}</p>
                      </div>
                    </div>
                    <p className="text-sm font-medium">Rs {item.price}</p>
                    {/* <button onClick={() => deleteFromCart(item._id)} className="text-red-500">
                      <FaTrash />
                    </button> */}
                  </div>
                ))}
                <div className="flex justify-between mt-6 font-semibold">
                  <span>Total Price:</span>
                  <span>Rs {totalPrice}</span>
                </div>
              </div>
            ) : (
              <p className="text-gray-600">Your cart is empty.</p>
            )}
          </div>

          {/* Shipping Section (after successful payment) */}
          {currentStep === 2 && paymentSuccess && (
            <div className="bg-white p-6 shadow-md rounded-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Shipping Details</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                    <input
                      type="text"
                      {...register("firstName", { required: "First Name is required" })}
                      className={`mt-1 block w-full border ${
                        errors.firstName ? "border-red-500" : "border-gray-300"
                      } rounded-md shadow-sm sm:text-sm h-10 px-3`}
                    />
                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input
                      type="text"
                      {...register("lastName", { required: "Last Name is required" })}
                      className={`mt-1 block w-full border ${
                        errors.lastName ? "border-red-500" : "border-gray-300"
                      } rounded-md shadow-sm sm:text-sm h-10 px-3`}
                    />
                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
                  </div>
                </div>
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    {...register("email", { required: "Email is required" })}
                    className={`mt-1 block w-full border ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } rounded-md shadow-sm sm:text-sm h-10 px-3`}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>
                {/* Submit Button */}
                <button
                  type="submit"
                  className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                >
                  Submit Shipping Details
                </button>
              </form>
            </div>
          )}

        </div>
      </div>

      <Footer />
    </>
  );
};

export default CheckoutPage;
