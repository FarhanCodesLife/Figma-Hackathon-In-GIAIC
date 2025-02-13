import ShipEngine from "shipengine";

if (!process.env.SHIPENGINE_API_KEY) {
  throw new Error("❌ Missing ShipEngine API Key in environment variables.");
}

const shipEngine = new ShipEngine({
  apiKey: process.env.SHIPENGINE_API_KEY as string,
});

export default shipEngine;