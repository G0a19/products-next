import ImageComponentResponsive from "../ui/ImageComponentResponsive";
import Wrapper from "../ui/wrapper";

import "./../../styles/productPage/_heroProduct.scss";

const HeroProduct = ({ product }) => {
  return (
    <section className="heroProduct">
      <Wrapper classNames="heroProduct_wrapper">
        <div className="heroProduct_container">
          <div className="heroProduct_imageSection">
            <div className="heroProduct_imageWrapper">
              <ImageComponentResponsive image={product.image} alt={product.title} width={500} height={500} className="heroProduct_image" />
            </div>
          </div>

          <div className="heroProduct_content">
            <div className="heroProduct_badge">{product.category}</div>

            <h1 className="heroProduct_title">{product.title}</h1>

            <div className="heroProduct_rating">
              <div className="heroProduct_stars">
                {[...Array(5)].map((_, index) => (
                  <span key={index} className={index < Math.floor(product.rating.rate) ? "heroProduct_star-filled" : "heroProduct_star"}>
                    ★
                  </span>
                ))}
              </div>
              <span className="heroProduct_ratingText">
                {product.rating.rate} ({product.rating.count} reviews)
              </span>
            </div>

            <p className="heroProduct_description">{product.description}</p>

            <div className="heroProduct_priceSection">
              <span className="heroProduct_price">${product.price}</span>
              <div className="heroProduct_actions">
                {/* Not ready yet */}
                <button className="heroProduct_button-primary">Add to Cart</button>
                {/* Not ready yet */}
                <button className="heroProduct_button-secondary">Add to Wishlist</button>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default HeroProduct;
