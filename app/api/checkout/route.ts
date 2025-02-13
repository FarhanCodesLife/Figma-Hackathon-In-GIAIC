import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

interface StripeError extends Error {
  type?: string;
  message: string;
  response?: {
    data?: unknown;
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: { amount: number } = await request.json();

    if (!body.amount || typeof body.amount !== "number") {
      return NextResponse.json({ error: "Invalid or missing amount" }, { status: 400 });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: body.amount, // Amount in cents (e.g., 10 USD = 1000)
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    const stripeError = error as StripeError;
    console.error("Internal Error:", stripeError.message);
    return NextResponse.json(
      { error: `Internal Server Error: ${stripeError.message}` },
      { status: 500 }
    );
  }
}
