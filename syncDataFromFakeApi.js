import { createClient } from 'next-sanity';

// Sanity configuration
export const client = createClient({
  projectId: "k6jtnhe6",
  dataset: "production",
  apiVersion: "2024-12-29",
  token: "skEFib2NY82KIzbPn7npCFgUcjfosOipzw2MEReO96QdhvW7wcPh5XXLmmNYuqcZXbRqCr1OKFQexeflfKz80AGsEFJiR5TjngQPbGEMtbHCYE6PDAVhp3OPscYewlaeqSlICrG2oiMq05jVXZkWIFCwGPshlhFYflV9B6lI0tBzuzjtzBal",
  useCdn: false, // Avoid cached data during migration
});

// Function to fetch and migrate data from your API
export const fetchAndMigrateData = async () => {
    try {
      // Fetch product data from the API
      const res = await fetch("https://template6-six.vercel.app/api/products");
      if (!res.ok) {
        throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
      }
  
      // Parse the API response
      const data = await res.json();
      console.log("API Response:", data); // Debug the response structure
  
      // Ensure the response is an array
      const products = Array.isArray(data) ? data : [];
      if (products.length === 0) {
        throw new Error("No products found in the API response.");
      }
  
      // Process each product
      for (const product of products) {
        const {
          title,
          description,
          price,
          tags,
          imageUrl,
          dicountPercentage, // Fixed typo in the key name
          isNew,
        } = product;
  
        // Calculate original price and discounted price
        const originalPrice = Math.round(price / (1 - dicountPercentage / 100));
  
        // Upload product image to Sanity
        const imageAsset = await uploadImageToSanity(imageUrl);
  
        // Create product document in Sanity
        await client.create({
          _type: 'Products',
          title,
          description,
          price, // Discounted price
          originalPrice, // Original price before discount
          tags,
          discountPercentage: dicountPercentage, // Fixed typo here as well
          isNew,
          image: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: imageAsset._id,
            },
          },
        });
        console.log(`Successfully migrated product: ${title}`);
      }
    } catch (error) {
      console.error("Error during migration:", error.message);
    }
  };
  

// Function to upload images to Sanity
const uploadImageToSanity = async (imageUrl) => {
  try {
    const res = await fetch(imageUrl);
    if (!res.ok) {
      throw new Error(`Failed to fetch image: ${res.status} ${res.statusText}`);
    }

    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const contentType = res.headers.get("content-type") || "image/jpeg";

    const imageAsset = await client.assets.upload('image', buffer, {
      filename: imageUrl.split('/').pop() || "image",
      contentType,
    });

    return imageAsset;
  } catch (error) {
    console.error(`Error uploading image: ${error.message}`);
    throw error;
  }
};

// Call the function to start the migration
fetchAndMigrateData().catch((err) => console.error("Unhandled error:", err));
