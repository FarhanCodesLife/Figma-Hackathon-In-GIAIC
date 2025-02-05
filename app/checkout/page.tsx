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
import { Rate, trackingObjType } from "@/type"; // Import custom types
import SuccessDialog from "@/components/SuccessDialog";

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
  const [rates, setRates] = useState<Rate[]>([]);
  const [rateId, setrateId] = useState<string | null>(null);

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingCost, setShippingCost] = useState<number>(0);
  const [selectedShipping, setSelectedShipping] = useState<Rate | null>(null);


  const [labelPdf, setLabelPdf] = useState<string | null>(null);
  const [trackingObj, setTrackingObj] = useState<trackingObjType | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  ) + shippingCost;

  const [shippingData, setShippingData] = useState(null);

  const fetchShippingRate = async (data: any) => {
    const shippingData = {
      firstName:data.firstName,
      lastName:data.lastName,
      email:data.email,
      phone:data.phone,
      country: data.country,
      zip: data.zip,
      streetAddress: data.streetAddress,
      city: data.city,
    };

    const response = await fetch("/api/getRates", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        shipToAddress: {
          name: shippingData.firstName + shippingData.lastName,
          phone: shippingData.phone,
          addressLine1: shippingData.streetAddress,
          addressLine2: "Suite 200",
          cityLocality: shippingData.city,
          stateProvince: "CA",
          postalCode: "90001",
          countryCode: "US",
          addressResidentialIndicator: "no",
        },
        packages: [
          { weight: { value: 5, unit: "ounce" }, dimensions: { height: 3, width: 15, length: 10, unit: "inch" } },
        ],
      }),
    });
    
    const datarates = await response.json();
    setRates(datarates.shipmentDetails.rateResponse.rates);
  };

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

  const handleShippingSelect = async (rate: Rate) => {
    if (!rate.rateId) {
      alert("Please select a rate to create a label.");
    }
    console.log(rate);
    

    setLoading(true);
    setErrors([]);

    try {
      // get rateId which user selected
      const response = await fetch("/api/label", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rateId: rate.rateId,}),
        
      })
      const labelData = await response.json(); // Parse the response body as JSON
      // see the response of label in browser
      console.log(labelData);
      // set pdf url
      // setLabelPdf(labelData.labelDownload.href);
      // // set tracking obj
      // setTrackingObj({
      //   trackingNumber: labelData.trackingNumber,
      //   labelId: labelData.labelId,
      //   carrierCode: labelData.carrierCode,



      // });


       // Move to the payment step
    } catch (error) {
      console.log(error);
      setErrors(["An error occurred while creating the label."]);
    } finally {
      setLoading(false);
    }
    setSelectedShipping(rate);
    setShippingCost(rate.shippingAmount.amount); // Shipping cost conversion
    setCurrentStep(2);
  };

  console.log(rates);
  

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
          
          {currentStep === 1 && rates.length > 0 && (
  <div className="mt-6">
    <h3 className="text-xl font-semibold text-gray-700">Select Shipping Rate</h3>
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-700">Service Name</th>
            <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-700">Service Code</th>
            <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-700">Estimated Delivery Date</th>
            <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-700">Shipping Amount</th>
            <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-700">Action</th>
          </tr>
        </thead>
        <tbody>
          {rates.map((rate) => (
            <tr
              key={rate.rateId}
              className="hover:bg-gray-100 cursor-pointer"
              onClick={() => handleShippingSelect(rate)}
            >
              <td className="px-4 py-2 border-b text-sm text-gray-800">{rate.carrierCode}</td>
              <td className="px-4 py-2 border-b text-sm text-gray-800">{rate.serviceCode}</td>
              <td className="px-4 py-2 border-b text-sm text-gray-800">{new Date(rate.estimatedDeliveryDate).toLocaleDateString()}</td>
              <td className="px-4 py-2 border-b text-sm text-gray-800">${(rate.shippingAmount.amount / 100).toFixed(2)}</td>
              <td className="px-4 py-2 border-b text-sm text-gray-800">
                <button                   onClick={() => setrateId(rate.rateId)}
 className="py-1 px-3 bg-blue-600 text-white rounded-md hover:bg-blue-500">
                  Select
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>

)}

          {currentStep === 2 && clientSecret && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <PaymentForm setPaymentSuccess={setPaymentSuccess} />
            </Elements>
                )}
        {paymentSuccess && <SuccessDialog />}
                  
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
          <option value="US">United States</option>
          <option value="IN">India</option>
          <option value="PK">Pakistan</option>
        </select>
        {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Street Address</label>
          <input
            type="text"
            {...register("streetAddress", { required: "Street Address is required" })}
            className={`mt-1 block w-full border ${errors.streetAddress ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-10 px-3`}
          />
          {errors.streetAddress && <p className="text-red-500 text-xs mt-1">{errors.streetAddress.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">City</label>
          <input
            type="text"
            {...register("city", { required: "City is required" })}
            className={`mt-1 block w-full border ${errors.city ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-10 px-3`}
          />
          {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Postal Code</label>
          <input
            type="text"
            {...register("zip", { required: "Postal Code is required" })}
            className={`mt-1 block w-full border ${errors.zip ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-10 px-3`}
          />
          {errors.zip && <p className="text-red-500 text-xs mt-1">{errors.zip.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="text"
            {...register("phone", { required: "Phone number is required" })}
            className={`mt-1 block w-full border ${errors.phone ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-10 px-3`}
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-500 mt-6"
      >
        Next: Select Shipping
      </button>
    </form>
  );
};

const PaymentForm = ({ setPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  
  const handlePaymentSubmit = async (event) => {
    event.preventDefault();
    
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/checkout/success", // Update this URL as needed
      },
    });

    if (error) {
      console.error(error.message);
      setPaymentSuccess(false);
    } else {
      setPaymentSuccess(true);
      console.log("Payment successful!");
    }
  };

  return (
    <form onSubmit={handlePaymentSubmit}>
      <PaymentElement />
      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-500 mt-6"
      >
        Complete Payment
      </button>
    </form>
  );
};

export default CheckoutPage;
