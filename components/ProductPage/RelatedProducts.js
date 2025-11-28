import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../ui/ProductCard";
import Wrapper from "../ui/wrapper";

import "./../../styles/productPage/_relatedProducts.scss";

const RelatedProducts = ({ currentProduct }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        setLoading(true);
        setError(false);

        // Fetch products from the same category
        const response = await axios.get(`https://fakestoreapi.com/products/category/${currentProduct.category}`);

        // Filter out the current product
        const filtered = response.data.filter((product) => product.id !== currentProduct.id);

        // Shuffle array and get 3 random items
        const shuffled = filtered.sort(() => 0.5 - Math.random());
        const randomThree = shuffled.slice(0, 3);

        setRelatedProducts(randomThree);
      } catch (err) {
        console.error("Error fetching related products:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (currentProduct && currentProduct.category) {
      fetchRelatedProducts();
    }
  }, [currentProduct]);

  if (error) {
    return null; // Don't show section if there's an error
  }

  return (
    <section className="relatedProducts">
      <Wrapper classNames="relatedProducts_wrapper">
        <div className="relatedProducts_header">
          <h2 className="relatedProducts_title">Related Products</h2>
          <p className="relatedProducts_subtitle">More products from {currentProduct.category}</p>
        </div>

        <div className="relatedProducts_grid">
          {loading ? (
            // Loading skeleton cards
            <>
              {[...Array(3)].map((_, index) => (
                <div key={index} className="skeletonCard">
                  <div className="skeletonCard_imageWrapper">
                    <div className="skeletonCard_image skeleton-shimmer"></div>
                    <div className="skeletonCard_badge skeleton-shimmer"></div>
                  </div>
                  <div className="skeletonCard_content">
                    <div className="skeletonCard_title skeleton-shimmer"></div>
                    <div className="skeletonCard_description">
                      <div className="skeleton-shimmer"></div>
                      <div className="skeleton-shimmer"></div>
                      <div className="skeleton-shimmer"></div>
                    </div>
                    <div className="skeletonCard_rating">
                      <div className="skeleton-shimmer"></div>
                    </div>
                    <div className="skeletonCard_footer">
                      <div className="skeletonCard_price skeleton-shimmer"></div>
                      <div className="skeletonCard_button skeleton-shimmer"></div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : relatedProducts.length > 0 ? (
            // Actual product cards
            relatedProducts.map((product) => <ProductCard key={product.id} product={product} />)
          ) : (
            // No related products found
            <div className="relatedProducts_empty">
              <p>No related products found</p>
            </div>
          )}
        </div>
      </Wrapper>
    </section>
  );
};

export default RelatedProducts;
