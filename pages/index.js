import Wrapper from "../components/ui/wrapper";
import Layout from "./../components/layout/layout";

import "./../styles/homePage/_hero.module.scss";

const HomePage = () => {
  return (
    <Layout>
      <Wrapper classNames="hero">
        <h1 className="hero_title">Hello World</h1>
        <p className="hero_description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
      </Wrapper>
    </Layout>
  );
};

export default HomePage;

export async function getStaticProps() {
  return {
    props: {},
  };
}
