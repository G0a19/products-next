import { memo, Fragment, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Wrapper from "../ui/wrapper";

const Header = function () {
  const [menu, setMenu] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    if (menu) {
      document.querySelector(".hamburgerMenu").classList.remove("hamburgerMenu-active");
      document.querySelector(".dropDown").classList.remove("dropDown-active");
    } else {
      document.querySelector(".hamburgerMenu").classList.add("hamburgerMenu-active");
      document.querySelector(".dropDown").classList.add("dropDown-active");
    }
    setMenu((prev) => !prev);
  };

  const closeMenu = () => {
    document.querySelector(".hamburgerMenu").classList.remove("hamburgerMenu-active");
    document.querySelector(".dropDown").classList.remove("dropDown-active");
    setMenu(false);
  };

  const isActive = (path) => {
    return router.pathname === path;
  };

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Products", path: "/products" },
  ];

  return (
    <Fragment>
      <header className="header">
        <Wrapper classNames="header_wrapper">
          <Link href="/" className="header_logo">
            <svg
              className="header_logoIcon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span className="header_logoText">Products Next</span>
          </Link>

          <nav className="header_menu">
            {menuItems.map((item) => (
              <Link key={item.path} href={item.path} className={`header_menuLink ${isActive(item.path) ? "header_menuLink-active" : ""}`}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="header_actions">
            <button className="header_cartButton">
              <svg
                className="header_cartIcon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <span className="header_cartBadge">0</span>
            </button>
          </div>

          <div className="hamburgerMenu" role="button" onClick={toggleMenu}>
            <div className="hamburgerMenu_top"></div>
            <div className="hamburgerMenu_middle"></div>
            <div className="hamburgerMenu_bottom"></div>
          </div>
        </Wrapper>
      </header>

      <div className="separator"></div>

      <div className="dropDown">
        <Wrapper classNames="dropDown_wrapper">
          <nav className="dropDown_menu">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`dropDown_menuLink ${isActive(item.path) ? "dropDown_menuLink-active" : ""}`}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </Wrapper>
      </div>
    </Fragment>
  );
};

export default memo(Header);
