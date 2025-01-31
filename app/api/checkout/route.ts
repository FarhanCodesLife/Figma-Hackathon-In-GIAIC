// pages/api/checkout.ts

import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe("sk_test_51QnEZgB0rHJElOwI03bKhcQBUjL3iOcnNuhF2xRiqUEHmfu4BBBRY7Fi8A3WqPvoJOZ53llpJLS2Ghr1oLAtIfxx00OxKwwjRY");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { products } = req.body;

      if (!products || products.length === 0) {
        return res.status(400).json({ error: 'No products provided' });
      }

      const lineItems = products.map((item: any) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.title,
            images: [item.image || '/default-image.png'],
            description: item.selectedSize,
          },
          unit_amount: item.price * 100, // amount in cents
        },
        quantity: item.quantity,
      }));

      // Create Stripe Checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `${req.headers.origin}/checkout?success=true`,
        cancel_url: `${req.headers.origin}/checkout?canceled=true`,
      });

      return res.status(200).json({ id: session.id });
    } catch (error: any) {
      console.error('Stripe Checkout Error:', error);
      return res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}



// <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
// {/* First Name & Last Name */}
// <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//   <div>
//     <label className="block text-sm font-medium text-gray-700">
//       First Name
//     </label>
//     <input
//       type="text"
//       {...register("firstName", { required: "First Name is required" })}
//       className={`mt-1 block w-full border ${
//         errors.firstName ? "border-red-500" : "border-gray-300"
//       } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-10 px-3`}
//     />
//     {errors.firstName && (
//       <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>
//     )}
//   </div>
//   <div>
//     <label className="block text-sm font-medium text-gray-700">
//       Last Name
//     </label>
//     <input
//       type="text"
//       {...register("lastName", { required: "Last Name is required" })}
//       className={`mt-1 block w-full border ${
//         errors.lastName ? "border-red-500" : "border-gray-300"
//       } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-10 px-3`}
//     />
//     {errors.lastName && (
//       <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>
//     )}
//   </div>
// </div>

// {/* Company Name */}
// <div>
//   <label className="block text-sm font-medium text-gray-700">
//     Company Name (Optional)
//   </label>
//   <input
//     type="text"
//     {...register("companyName")}
//     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-10 px-3"
//   />
// </div>

// {/* Country / Region */}
// <div>
//   <label className="block text-sm font-medium text-gray-700">
//     Country / Region
//   </label>
//   <select
//     {...register("country", { required: "Country is required" })}
//     className={`mt-1 block w-full border ${
//       errors.country ? "border-red-500" : "border-gray-300"
//     } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-10 px-3`}
//   >
//     <option value="">Select Country</option>
//     <option value="Sri Lanka">Sri Lanka</option>
//     <option value="India">India</option>
//     <option value="Pakistan">Pakistan</option>
//   </select>
//   {errors.country && (
//     <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>
//   )}
// </div>

// {/* Street Address */}
// <div>
//   <label className="block text-sm font-medium text-gray-700">
//     Street Address
//   </label>
//   <input
//     type="text"
//     {...register("streetAddress", { required: "Street Address is required" })}
//     className={`mt-1 block w-full border ${
//       errors.streetAddress ? "border-red-500" : "border-gray-300"
//     } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-10 px-3`}
//     placeholder="House number and street name"
//   />
//   {errors.streetAddress && (
//     <p className="text-red-500 text-xs mt-1">{errors.streetAddress.message}</p>
//   )}
// </div>

// {/* Town/City */}
// <div>
//   <label className="block text-sm font-medium text-gray-700">
//     Town / City
//   </label>
//   <input
//     type="text"
//     {...register("city", { required: "City is required" })}
//     className={`mt-1 block w-full border ${
//       errors.city ? "border-red-500" : "border-gray-300"
//     } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-10 px-3`}
//   />
//   {errors.city && (
//     <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
//   )}
// </div>

// {/* ZIP Code */}
// <div>
//   <label className="block text-sm font-medium text-gray-700">
//     ZIP Code
//   </label>
//   <input
//     type="text"
//     {...register("zip", {
//       required: "ZIP Code is required",
//       pattern: {
//         value: /^[0-9]{5}$/,
//         message: "ZIP Code must be 5 digits",
//       },
//     })}
//     className={`mt-1 block w-full border ${
//       errors.zip ? "border-red-500" : "border-gray-300"
//     } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-10 px-3`}
//   />
//   {errors.zip && (
//     <p className="text-red-500 text-xs mt-1">{errors.zip.message}</p>
//   )}
// </div>

// {/* Email */}
// <div>
//   <label className="block text-sm font-medium text-gray-700">
//     Email
//   </label>
//   <input
//     type="email"
//     {...register("email", { required: "Email is required" })}
//     className={`mt-1 block w-full border ${
//       errors.email ? "border-red-500" : "border-gray-300"
//     } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-10 px-3`}
//     placeholder="example@email.com"
//   />
//   {errors.email && (
//     <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
//   )}
// </div>

// {/* Phone */}
// <div>
//   <label className="block text-sm font-medium text-gray-700">
//     Phone
//   </label>
//   <input
//     type="text"
//     {...register("phone", { required: "Phone Number is required" })}
//     className={`mt-1 block w-full border ${
//       errors.phone ? "border-red-500" : "border-gray-300"
//     } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-10 px-3`}
//     placeholder="+923182127256"
//   />
//   {errors.phone && (
//     <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
//   )}
// </div>

// {/* Submit Button */}
// <button
//   type="submit"
//   className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md text-sm font-medium hover:bg-blue-700"
// >
//   Place Order
// </button>
// </form>
