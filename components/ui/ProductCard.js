import React from "react";
import ImageComponentResponsive from "./ImageComponentResponsive";

import "./../../styles/ui/_productCard.module.scss";

const ProductCard = ({ product }) => {
  return (
    <a href={`/products/${product.id}`} className="productCard">
      <div className="productCard_imageWrapper">
        <ImageComponentResponsive image={product.image} alt={product.title} className="productCard_image" />
        <div className="productCard_badge">{product.category}</div>
      </div>

      <div className="productCard_content">
        <h3 className="productCard_title">{product.title}</h3>
        <p className="productCard_description">{product.description}</p>

        <div className="productCard_rating">
          <div className="productCard_stars">
            {[...Array(5)].map((_, index) => (
              <span key={index} className={index < Math.floor(product.rating.rate) ? "productCard_star-filled" : "productCard_star"}>
                ★
              </span>
            ))}
          </div>
          <span className="productCard_ratingCount">({product.rating.count})</span>
        </div>

        <div className="productCard_footer">
          <span className="productCard_price">${product.price}</span>
          <button className="productCard_button">View Product</button>
        </div>
      </div>
    </a>
  );
};

export default ProductCard;
