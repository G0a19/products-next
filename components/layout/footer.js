import { memo } from "react";
import Wrapper from "../ui/wrapper";

const Footer = function () {
  return (
    <footer className="footer">
      <Wrapper classProps="footer_wrapper">
        <h3 className="footer_title">
          <a href="/">Products Next</a>
        </h3>
      </Wrapper>
    </footer>
  );
};

export default memo(Footer);
