import axios from "axios";
import Layout from "../../components/layout/layout";
import HeroProductPage from "../../components/ProductsPage/HeroProductPage";
import ProductsList from "../../components/ProductsPage/ProductsList";
import SearchFilter from "../../components/ui/SearchFilter";
import { Fragment, useState, useMemo } from "react";
import Seo from "../../components/Seo/Seo";
import getSeoPage from "../../backend-helper/getSeoPage";
import Breadcrumbs from "../../components/ui/Breadcrumbs";

const ProductsPage = ({ products, seo, categories }) => {
  if (!products) {
    return <Custom404 />;
  }

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Filter products based on search and category
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((product) => product.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    return filtered;
  }, [products, searchQuery, selectedCategory]);

  const breadcrumbItems = [{ name: "Products", url: "/products" }];

  return (
    <Fragment>
      <Seo seo={seo} />
      <Layout>
        <Breadcrumbs items={breadcrumbItems} />
        <HeroProductPage />
        <SearchFilter
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
          resultsCount={filteredProducts.length}
        />
        <ProductsList products={filteredProducts} />
      </Layout>
    </Fragment>
  );
};

export async function getStaticProps() {
  const req = await axios.get("https://fakestoreapi.com/products");
  const seo = await getSeoPage("products");
  const categories = [...new Set(req.data.map((product) => product.category))];

  return {
    props: {
      products: req.data,
      seo: seo,
      categories: categories,
    },
    revalidate: 1800,
  };
}

export default ProductsPage;
