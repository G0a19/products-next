import ProductCard from "../ui/ProductCard";
import Wrapper from "../ui/wrapper";
import "./../../styles/productsPage/_productsList.module.scss";

const ProductsList = ({ products }) => {
  return (
    <section className="productsList">
      <Wrapper classNames="productsList_wrapper">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Wrapper>
    </section>
  );
};

export default ProductsList;
