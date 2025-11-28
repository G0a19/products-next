import axios from "axios";

export default function Sitemap() {
  return null;
}

export const getServerSideProps = async (ctx) => {
  ctx.res.setHeader("Content-Type", "text/xml");
  const xml = await generateSitemap();
  ctx.res.write(xml.trim());
  ctx.res.end();

  return {
    props: {},
  };
};

async function generateSitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_FRONT_URL || process.env.frontUrl || "http://localhost:3000";
  const currentDate = new Date().toISOString();

  let urls = "";

  // Static pages
  const staticPages = [
    {
      url: "",
      lastmod: currentDate,
    },
    {
      url: "/products",
      lastmod: currentDate,
    },
  ];

  // Add static pages to sitemap
  staticPages.forEach((page) => {
    urls += `
    <url>
      <loc>${baseUrl}${page.url}</loc>
      <lastmod>${page.lastmod}</lastmod>
    </url>`;
  });

  // Fetch all products from API
  try {
    const productsResponse = await axios.get("https://fakestoreapi.com/products");
    const products = productsResponse.data;

    // Add each product page to sitemap
    products.forEach((product) => {
      urls += `
    <url>
      <loc>${baseUrl}/products/${product.id}</loc>
      <lastmod>${currentDate}</lastmod>
    </url>`;
    });
  } catch (error) {
    console.error("Error fetching products for sitemap:", error);
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  ${urls}
</urlset>`;
}
