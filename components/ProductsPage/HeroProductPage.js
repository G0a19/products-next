import Wrapper from "../ui/wrapper";

import "./../../styles/productsPage/_heroProductPage.module.scss";

const HeroProductPage = () => {
  return (
    <section className="heroProductPage">
      <Wrapper classNames="heroProductPage_wrapper">
        <h1 className="heroProductPage_title">Products Page</h1>
        <p className="heroProductPage_description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
      </Wrapper>
    </section>
  );
};

export default HeroProductPage;
