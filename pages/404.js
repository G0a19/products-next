import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "../components/layout/layout";

import "./../styles/404/_hero404.module.scss";

const Custom404 = () => {
  const router = useRouter();

  return (
    <Layout>
      <section className="notFound">
        <div className="notFound_container">
          <div className="notFound_content">
            <h1 className="notFound_title">404</h1>
            <h2 className="notFound_subtitle">Page Not Found</h2>
            <p className="notFound_description">Sorry, the page you're looking for doesn't exist or has been moved.</p>

            <div className="notFound_actions">
              <button onClick={() => router.back()} className="notFound_button-secondary">
                Go Back
              </button>
              <Link href="/" className="notFound_button-primary">
                Go to Homepage
              </Link>
            </div>

            <div className="notFound_suggestions">
              <p className="notFound_suggestionsTitle">You might want to visit:</p>
              <ul className="notFound_suggestionsList">
                <li>
                  <Link href="/" className="notFound_link">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="notFound_link">
                    Products
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="notFound_illustration">
            <svg
              className="notFound_svg"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Custom404;
