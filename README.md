# Products E-commerce Next.js Application

A modern, performant e-commerce application built with Next.js 15, featuring product catalog, search/filter functionality, and SEO optimization.

## 🚀 Tech Stack

- **Framework:** Next.js 15
- **Styling:** SCSS
- **State Management:** React Hooks
- **HTTP Client:** Axios
- **Node Version:** 18.19.1

## 📋 Prerequisites

- Node.js version 18.19.1
- npm or yarn package manager

## 🛠️ Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd products-next
```

2. Install dependencies:

```bash
npm install
```

## 📦 Available Scripts

### Development

```bash
npm run dev
```

Starts the development server on [http://localhost:3000](http://localhost:3000)

### Building for Production

**⚠️ IMPORTANT: Always use this command for production builds:**

```bash
npm run build-with-seo
```

This command does two things:

1. **Generates SEO file** (`npm run init-seo`) - Creates `seo.json` with SEO metadata for all products
2. **Builds the project** (`npm run build`) - Creates optimized production build

### Individual Commands

```bash
npm run init-seo
```

Manually generates/regenerates the `seo.json` file with SEO data for all products from the API. This file is required before building the project.

```bash
npm run prebuild
```

Automatically runs before `npm run build` to ensure SEO file exists. This is a safety check.

```bash
npm run build
```

Creates production build (requires `seo.json` to exist first).

```bash
npm run start
```

Starts the production server (run after `npm run build`).

## 🏗️ Project Structure

```
products-next/
├── backend-helper/
│   ├── initializeSeoFile.js    # SEO file generation script
│   ├── runInitializeSeoFile.js    # SEO file generation script
│   └── getSeoPage.js            # SEO data fetching helper
├── components/
│   ├── layout/
│   │   ├── footer.js
│   │   ├── header.js
│   │   └── layout.js
│   ├── ProductPage/
│   │   ├── HeroProduct.js
│   │   └── RelatedProducts.js  # Client-side fetching
│   ├── ProductsPage/
│   │   ├── HeroProductPage.js
│   │   ├── ProductsList.js
│   │   └── SearchFilter.js     # Client-side filtering
│   ├── Seo/
│   │   └── Seo.js
│   └── ui/
│       ├── ImageComponentResponsive.js
│       ├── ProductCard.js
│       ├── SearchFilter.js
│       └── wrapper.js
├── pages/
│   ├── api/
│   │   └── regenerateSeo.js        # SEO API endpoint
│   ├── products/
│   │   ├── index.js            # Catalog page (SSG)
│   │   └── [id].js             # Single product (SSG + ISR)
│   ├── 404.js                  # Custom 404 page
│   └── index.js                # Homepage
├── styles/
│   ├── 404/
│   ├── layout/
│   ├── homePage/
│   ├── productPage/
│   ├── productsPage/
│   └── ui/
├── seo.json                     # Auto-generated SEO file
└── package.json
```

## 🎯 Rendering Strategy & Performance Choices

### 1. **Catalog Page (`/products`) - Static Site Generation (SSG)**

**Strategy:** Pre-rendered at build time with Incremental Static Regeneration (ISR)

**Implementation:**

```javascript
export async function getStaticProps() {
  const req = await axios.get("https://fakestoreapi.com/products");
  const seo = await getSeoPage("products");
  const categories = [...new Set(req.data.map((product) => product.category))];

  return {
    props: {
      products: req.data,
      seo: seo,
      categories: categories,
    },
    revalidate: 1800,
  };
}
```

**Why this choice:**

- ✅ **Optimal Performance:** Page loads instantly from CDN
- ✅ **SEO Excellence:** Fully rendered HTML for search engines
- ✅ **Fresh Content:** ISR ensures data stays current (30-min revalidation)
- ✅ **Scalability:** No server load for each request
- ✅ **User Experience:** Near-instant page loads

### 2. **Single Product Page (`/products/[id]`) - SSG with Dynamic Paths + ISR**

**Strategy:** Pre-render all product pages at build time with fallback support

**Why this choice:**

- ✅ **Lightning Fast:** All product pages pre-rendered
- ✅ **SEO Optimized:** Complete metadata and structured data
- ✅ **Scalable:** Handles new products via fallback
- ✅ **Cost Effective:** No database queries per request
- ✅ **Graceful Loading:** Shows loading state for new products

### 3. **Search/Filter Functionality - Client-Side Rendering (CSR)**

**Strategy:** Filter and search on pre-fetched data client-side using React state

**Implementation:**

```javascript
const [searchQuery, setSearchQuery] = useState("");
const [selectedCategory, setSelectedCategory] = useState("all");

const filteredProducts = useMemo(() => {
  let filtered = products;

  if (selectedCategory !== "all") {
    filtered = filtered.filter((p) => p.category === selectedCategory);
  }

  if (searchQuery.trim() !== "") {
    filtered = filtered.filter((p) => p.title.toLowerCase().includes(searchQuery.toLowerCase()));
  }

  return filtered;
}, [products, searchQuery, selectedCategory]);
```

**Why this choice:**

- ✅ **Instant Feedback:** No network delay for filtering/search
- ✅ **Smooth UX:** Real-time updates as user types
- ✅ **No Server Load:** All computation happens client-side
- ✅ **Efficient:** useMemo prevents unnecessary re-renders
- ✅ **Simple Implementation:** Leverages React's reactivity

### 4. **Related Products - Client-Side Fetching (CSR)**

**Strategy:** Fetch related products on component mount using useEffect + Axios

**Implementation:**

```javascript
useEffect(() => {
  const fetchRelatedProducts = async () => {
    const response = await axios.get(`https://fakestoreapi.com/products/category/${currentProduct.category}`);

    const shuffled = response.data
      .filter((p) => p.id !== currentProduct.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    setRelatedProducts(shuffled);
  };

  fetchRelatedProducts();
}, [currentProduct]);
```

**Why this choice:**

- ✅ **Fresh Data:** Always shows latest related products
- ✅ **Randomization:** Different products on each visit
- ✅ **Non-Blocking:** Main content loads first
- ✅ **Progressive Enhancement:** Page works without it
- ✅ **Demonstrates CSR:** Shows both SSG and CSR patterns
- ✅ **Reduced Build Time:** Doesn't increase static generation
- ✅ **Better UX:** Loading skeletons provide visual feedback

## 🔍 SEO Implementation

### Dynamic SEO Generation

The application automatically generates SEO metadata for all pages:

1. **Products Page:** Static SEO with schema.org CollectionPage
2. **Individual Products:** Dynamic SEO with Product schema including:
   - Structured data (JSON-LD)
   - Open Graph tags
   - Breadcrumb navigation
   - Aggregate ratings
   - Product offers

### SEO File Structure

```json
{
  "products": {
    "metaTitle": "Products Page",
    "metaDescription": "...",
    "structuredData": {
      /* Schema.org data */
    }
  },
  "product/1": {
    "metaTitle": "Product Name",
    "metaDescription": "Product description",
    "structuredData": {
      /* Product schema */
    }
  }
}
```

## 🎨 Styling Architecture

### SCSS with BEM Naming Convention

```scss
.productCard {
  &_imageWrapper {
  }
  &_image {
  }
  &_title {
  }
  &_price {
  }
  &_button {
    &-primary {
    }
    &-secondary {
    }
  }
}
```

**Benefits:**

- Clear component hierarchy
- No naming conflicts
- Easy to maintain
- Scoped styles

## 🚦 Getting Started

### First Time Setup

1. Install dependencies:

```bash
npm install
```

2. Generate SEO file and build:

```bash
npm run build-with-seo
```

3. Start production server:

```bash
npm start
```

### Development Workflow

1. Start development server:

```bash
npm run dev
```

2. Make your changes

3. Before deploying, always build with SEO:

```bash
npm run build-with-seo
```

## 🔄 Data Flow

1. **Build Time:**

   - `npm run init-seo` generates SEO metadata
   - `next build` pre-renders all product pages
   - Static files ready for CDN deployment

2. **Request Time:**

   - SSG pages served instantly from cache
   - ISR regenerates stale pages in background
   - Client-side features (search/related) fetch data as needed

3. **Runtime:**
   - Search/filter happens instantly client-side
   - Related products fetch fresh data on mount
   - Loading skeletons provide visual feedback

## 🛡️ Error Handling

- Custom 404 page for missing routes
- Fallback loading states for ISR pages
- Graceful error handling for API failures
- Empty states for no results

## 👤 Author

Gal Mafgaonker

---

**Note:** Always use `npm run build-with-seo` for production builds to ensure SEO metadata is properly generated.
