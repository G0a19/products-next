const fs = require("fs");
const path = require("path");
const axios = require("axios");

const initializeSeoFile = async () => {
  try {
    const seoFilePath = path.join(process.cwd(), "seo.json");

    // Check if file already exists
    if (fs.existsSync(seoFilePath)) {
      console.log("✅ seo.json already exists");

      fs.unlinkSync(seoFilePath);
      console.log("🗑️  Existing seo.json deleted");
    }

    console.log("📝 Creating new seo.json file...");

    // Create the default SEO data object
    const seoData = {
      products: {
        metaTitle: "Products Page",
        metaDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
        structuredData: {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Products Page",
          description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
          url: `${process.env.NEXT_PUBLIC_FRONT_URL || "http://localhost:3000"}/products`,
          breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: process.env.NEXT_PUBLIC_FRONT_URL || "http://localhost:3000",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Products",
                item: `${process.env.NEXT_PUBLIC_FRONT_URL || "http://localhost:3000"}/products`,
              },
            ],
          },
        },
      },
    };

    // Fetch all products from the API
    console.log("🔄 Fetching products from API...");
    const productsResponse = await axios.get("https://fakestoreapi.com/products");
    const products = productsResponse.data;

    console.log(`✅ Fetched ${products.length} products`);

    // Add each product to the SEO data
    products.forEach((product) => {
      const productKey = `product/${product.id}`;
      seoData[productKey] = {
        metaTitle: product.title,
        metaDescription: product.description,
        structuredData: {
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.title,
          description: product.description,
          image: product.image,
          offers: {
            "@type": "Offer",
            price: product.price,
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: product.rating.rate,
            reviewCount: product.rating.count,
          },
          category: product.category,
          url: `${process.env.NEXT_PUBLIC_FRONT_URL || "http://localhost:3000"}/products/${product.id}`,
          breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: process.env.NEXT_PUBLIC_FRONT_URL || "http://localhost:3000",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Products",
                item: `${process.env.NEXT_PUBLIC_FRONT_URL || "http://localhost:3000"}/products`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: product.title,
                item: `${process.env.NEXT_PUBLIC_FRONT_URL || "http://localhost:3000"}/products/${product.id}`,
              },
            ],
          },
        },
      };
    });

    // Write the new seo.json file
    fs.writeFileSync(seoFilePath, JSON.stringify(seoData, null, 2), "utf8");
    console.log(`✅ SEO file created successfully with ${products.length} products`);
    console.log(`📍 File location: ${seoFilePath}`);
  } catch (error) {
    console.error("❌ Error creating SEO file:", error);
    process.exit(1);
  }
};

module.exports = initializeSeoFile;
