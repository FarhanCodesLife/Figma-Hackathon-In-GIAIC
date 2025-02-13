"use client"; // optional if you expect client-side behavior

import React from 'react';
import Allhero from "@/components/Allhero";
import Navbar from "@/components/Navbar";
import Banifits from "@/components/Banifits";
import Footer from "@/components/Footer";
import backgroundimage from "@/public/assets/Rectangle 1.png";

// interface Props {
//   searchParams: { [key: string]: string | string[] | undefined };
// }

export default function Page() {
  // const amount = typeof searchParams.amount === 'string' ? searchParams.amount : '0';

  return (
    <>
      <Navbar />
      <Allhero src={backgroundimage} page="Cart" />
      <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-blue-500 to-purple-500 p-10">
        <section className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md shadow-lg">
          <h1 className="text-5xl font-extrabold mb-4">Thank You!</h1>
          <h2 className="text-3xl mb-6">Your payment was successful!</h2>

          <div className="bg-white p-4 rounded-md text-purple-500 mt-5 text-5xl font-bold shadow-md">
            ${500 / 100}
          </div>

          <p className="mt-6 text-lg">We appreciate your business!</p>
        </section>
      </main>
      <Banifits />
      <Footer />
    </>
  );
}
