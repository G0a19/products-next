import Wrapper from "../ui/wrapper";

import "./../../styles/ui/searchFilter.module.scss";

const SearchFilter = ({ searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, categories, resultsCount }) => {
  return (
    <section className="searchFilter">
      <Wrapper classNames="searchFilter_wrapper">
        <div className="searchFilter_container">
          <div className="searchFilter_searchBox">
            <input
              type="text"
              placeholder="Search products by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="searchFilter_input"
            />
            <svg
              className="searchFilter_icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </div>

          <div className="searchFilter_categoryBox">
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="searchFilter_select">
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {(searchQuery || selectedCategory !== "all") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="searchFilter_clearButton"
            >
              Clear Filters
            </button>
          )}
        </div>

        <div className="searchFilter_results">
          Showing {resultsCount} {resultsCount === 1 ? "product" : "products"}
        </div>
      </Wrapper>
    </section>
  );
};

export default SearchFilter;
