import React, { Fragment } from "react";
import Layout from "../../components/layout/layout";
import Seo from "../../components/Seo/Seo";
import HeroProduct from "../../components/ProductPage/HeroProduct";
import axios from "axios";
import Custom404 from "../404";
import getSeoPage from "../../backend-helper/getSeoPage";
import RelatedProducts from "../../components/ProductPage/RelatedProducts";
import Breadcrumbs from "../../components/ui/Breadcrumbs";

const SingleProductPage = ({ data, seo }) => {
  if (!data) {
    return <Custom404 />;
  }

  const breadcrumbItems = [
    { name: "Products", url: "/products" },
    { name: data.title, url: `/products/${data.id}` },
  ];

  return (
    <Fragment>
      <Seo seo={seo} />
      <Layout>
        <Breadcrumbs items={breadcrumbItems} />
        <HeroProduct product={data} />
        <RelatedProducts currentProduct={data} />
      </Layout>
    </Fragment>
  );
};

export async function getStaticProps(context) {
  const { params } = context;
  const { id } = params;

  try {
    // Fetch product data
    const req = await axios.get(`https://fakestoreapi.com/products/${id}`);

    // If no data returned, return notFound
    if (!req.data || !req.data.id) {
      return {
        notFound: true,
      };
    }

    // Fetch SEO data
    let seoData = {};
    try {
      const seoReq = await getSeoPage(`product/${id}`);
      seoData = seoReq || {};
    } catch (seoError) {
      console.error("SEO fetch error:", seoError);
      // Continue without SEO data
    }

    return {
      props: {
        data: req.data,
        seo: seoData,
        notFound: false,
      },
      revalidate: 1800,
    };
  } catch (error) {
    console.error("Error fetching product:", error);

    // Return notFound: true to show Next.js 404 page
    return {
      notFound: true,
    };
  }
}

export async function getStaticPaths() {
  const req = await axios.get("https://fakestoreapi.com/products");
  const products = req.data;

  return {
    paths: products.map((product) => ({
      params: { id: product.id.toString() },
    })),
    fallback: true,
  };
}

export default React.memo(SingleProductPage);
