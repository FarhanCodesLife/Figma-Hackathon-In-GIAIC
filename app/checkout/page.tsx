"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Allhero from "@/components/Allhero";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import axios from "axios";
import Image from "next/image";
import backgroundimage from "@/public/assets/Rectangle 1.png";

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
  selectedSize?: string;
  selectedColor?: string;
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || "");

const CheckoutPage = () => {
  const cartItems: Product[] = useSelector(
    (state: { cart: { cartItems: Product[] } }) => state.cart.cartItems
  );
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingCost, setShippingCost] = useState<number>(0);
  const [shippingData, setShippingData] = useState(null);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  ) + shippingCost;

  // Function to fetch shipping rates
  const fetchShippingRate = async (data: any) => {
    const shippingData = {
      country: data.country,
      zip: data.zip,
      streetAddress: data.streetAddress,
      city: data.city,
    };

    try {
      const response = await axios.post("/api/getRates", shippingData);
      
      if (response.status === 200) {
        setShippingCost(response.data.shippingCost); // Set shipping cost from response
        setShippingData(response.data); // Set shipping data for future use
        setCurrentStep(2); // Move to next step (payment)
      } else {
        console.error("Failed to fetch shipping rates. Please try again later.");
      }
    } catch (error) {
      console.error("Shipping API error:", error);
      alert("There was an error fetching shipping rates. Please try again.");
    }
  };

  // Fetching client secret after shipping step is completed
  useEffect(() => {
    if (currentStep === 2) {
      fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalPrice * 100 }),
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
    }
  }, [currentStep, totalPrice]);

  return (
    <>
      <Navbar />
      <Allhero src={backgroundimage} page="Checkout" />
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-4xl mx-auto bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
            {currentStep === 1 ? "Shipping Details" : "Payment"}
          </h2>
          {currentStep === 1 && <ShippingForm onShippingSubmit={fetchShippingRate} />}
          {currentStep === 2 && clientSecret && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <PaymentForm setPaymentSuccess={setPaymentSuccess} />
            </Elements>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

const ShippingForm = ({ onShippingSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => onShippingSubmit(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            {...register("firstName", { required: "First Name is required" })}
            className={`mt-1 block w-full border ${errors.firstName ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-10 px-3`}
          />
          {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            {...register("lastName", { required: "Last Name is required" })}
            className={`mt-1 block w-full border ${errors.lastName ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-10 px-3`}
          />
          {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Company Name (Optional)</label>
        <input
          type="text"
          {...register("companyName")}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-10 px-3"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Country / Region</label>
        <select
          {...register("country", { required: "Country is required" })}
          className={`mt-1 block w-full border ${errors.country ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-10 px-3`}
        >
          <option value="">Select Country</option>
          <option value="Sri Lanka">Sri Lanka</option>
          <option value="India">India</option>
          <option value="Pakistan">Pakistan</option>
        </select>
        {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Street Address</label>
        <input
          type="text"
          {...register("streetAddress", { required: "Street Address is required" })}
          className={`mt-1 block w-full border ${errors.streetAddress ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-10 px-3`}
          placeholder="House number and street name"
        />
        {errors.streetAddress && <p className="text-red-500 text-xs mt-1">{errors.streetAddress.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Town / City</label>
        <input
          type="text"
          {...register("city", { required: "City is required" })}
          className={`mt-1 block w-full border ${errors.city ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-10 px-3`}
        />
        {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">ZIP Code</label>
        <input
          type="text"
          {...register("zip", {
            required: "ZIP Code is required",
            pattern: {
              value: /^[0-9]{5}$/,
              message: "ZIP Code must be 5 digits",
            },
          })}
          className={`mt-1 block w-full border ${errors.zip ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-10 px-3`}
        />
        {errors.zip && <p className="text-red-500 text-xs mt-1">{errors.zip.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          {...register("email", { required: "Email is required" })}
          className={`mt-1 block w-full border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-10 px-3`}
          placeholder="example@email.com"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Phone</label>
        <input
          type="text"
          {...register("phone", { required: "Phone Number is required" })}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-10 px-3"
        />
      </div>

      <button
        type="submit"
        className="mt-4 w-full bg-blue-600 text-white font-bold py-2 rounded-md shadow-md hover:bg-blue-700"
      >
        Continue to Payment
      </button>
    </form>
  );
};

const PaymentForm = ({ setPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/checkout/success",
      },
    });

    if (error) {
      console.error(error);
      alert("There was an issue with your payment.");
    } else {
      setPaymentSuccess(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe}
        className="mt-4 w-full bg-green-600 text-white font-bold py-2 rounded-md shadow-md hover:bg-green-700"
      >
        Pay Now
      </button>
    </form>
  );
};

export default CheckoutPage;
