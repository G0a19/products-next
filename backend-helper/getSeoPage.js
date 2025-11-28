import seoData from "../seo.json";

const getSeoPage = async (pageSlug) => {
  if (!seoData[pageSlug]) {
    return null;
  }
  return seoData[pageSlug];
};

export default getSeoPage;
