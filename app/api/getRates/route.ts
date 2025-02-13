import { Address, Package } from "@/type"; // Import custom types
import { NextRequest } from "next/server";
import ShipEngine from "shipengine";

// Ensure ShipEngine API key exists
if (!process.env.SHIPENGINE_API_KEY) {
  throw new Error("❌ Missing ShipEngine API Key in environment variables.");
}

export const shipengine = new ShipEngine({
  apiKey: process.env.SHIPENGINE_API_KEY as string,
});

interface ShipmentAddress {
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  cityLocality: string;
  stateProvince: string;
  postalCode: string;
  countryCode: string;
  addressResidentialIndicator: string;
}

interface ShipmentRequest {
  shipToAddress: ShipmentAddress;
  packages: Array<{
    weight: { value: number; unit: string };
    dimensions: { height: number; width: number; length: number; unit: string };
  }>;
}

interface ShipEngineError extends Error {
  response?: {
    data?: unknown;
  };
  message: string;
}

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body: ShipmentRequest = await req.json();
    console.log("📥 Received request body:", body);

    const { shipToAddress, packages }: { shipToAddress: Address; packages: Package[] } = body;

    // 🛑 Validate shipToAddress and packages
    if (!shipToAddress || typeof shipToAddress !== "object") {
      return new Response(JSON.stringify({ error: "❌ shipToAddress is missing or invalid" }), { status: 400 });
    }

    if (!packages || !Array.isArray(packages) || packages.length === 0) {
      return new Response(JSON.stringify({ error: "❌ packages must be a non-empty array" }), { status: 400 });
    }

    // ✅ Define the "ship from" address
    const shipFromAddress: Address = {
      name: "Michael Smith",
      phone: "+1 555 987 6543",
      addressLine1: "456 Oak Avenue",
      addressLine2: "Suite 200",
      cityLocality: "Los Angeles",
      stateProvince: "CA",
      postalCode: "90001",
      countryCode: "US",
      addressResidentialIndicator: "no",
    };

    // ✅ Get valid carrier IDs from environment variables
    const carrierIds = [
      process.env.SHIPENGINE_FIRST_COURIER,
      process.env.SHIPENGINE_SECOND_COURIER,
      process.env.SHIPENGINE_THIRD_COURIER,
      process.env.SHIPENGINE_FOURTH_COURIER,
    ].filter(Boolean); // Remove empty values

    if (carrierIds.length === 0) {
      return new Response(JSON.stringify({ error: "❌ No valid carrier IDs found in env variables" }), { status: 400 });
    }

    // ✅ Fetch shipping rates from ShipEngine
    try {
      console.log("🚀 Sending request to ShipEngine...");

      const shipmentDetails = await shipengine.getRatesWithShipmentDetails({
        shipment: {
          shipTo: shipToAddress,
          shipFrom: shipFromAddress,
          packages,
        },
        rateOptions: {  carrierIds: [
            process.env.SHIPENGINE_FIRST_COURIER || "",
            process.env.SHIPENGINE_SECOND_COURIER || "",
            process.env.SHIPENGINE_THIRD_COURIER || "",
            process.env.SHIPENGINE_FOURTH_COURIER || "",
          ].filter(Boolean), // Remove empty strings },
      }});

    //   "se-1857842",
    //       "se-1857843",
    //       "se-1857844",
    //       "se-1857956",

      console.log("✅ ShipEngine Response:", shipmentDetails);

      return new Response(JSON.stringify({ shipToAddress, packages, shipmentDetails }), { status: 200 });

    } catch (apiError) {
      const shipEngineError = apiError as ShipEngineError;
      console.error("❌ ShipEngine API Error:", shipEngineError?.response?.data || shipEngineError.message);

      return new Response(
        JSON.stringify({ 
          error: "❌ Failed to fetch rates from ShipEngine", 
          details: shipEngineError.message 
        }),
        { status: 500 }
      );
    }

  } catch (error) {
    const serverError = error as Error;
    console.error("❌ Internal Server Error:", serverError.message);

    return new Response(
      JSON.stringify({ error: serverError.message || 'Unknown error occurred' }), 
      { status: 500 }
    );
  }
}
