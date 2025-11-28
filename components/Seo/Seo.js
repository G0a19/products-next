import Head from "next/head";
import { useRouter } from "next/router";

export default function Seo({ seo }) {
  const router = useRouter();
  const canonicalUrl = `${process.env.frontUrl}${router.asPath}`;
  const siteName = process.env.siteName ?? "";

  return (
    <Head>
      {seo && seo.metaTitle && <title key="title">{`${seo.metaTitle} – ${siteName}`}</title>}
      {seo && seo.metaDescription && <meta name="description" content={seo.metaDescription} />}
      <link rel="canonical" href={canonicalUrl} />
      <meta key="og_type" property="og:type" content={"website"} />
      <meta key="og_title" property="og:title" content={siteName} />
      {seo && seo.metaDescription && <meta key="og_description" property="og:description" content={seo.metaDescription} />}
      <meta key="og_locale" property="og:locale" content="en_IE" />
      <meta key="og_site_name" property="og:site_name" content={siteName} />
      {seo && seo.metaDescription && <meta key="og_url" property="og:url" content={seo.canonicalURL} />}
      <meta key="og_site_name" property="og:site_name" content={siteName} />
      <meta name="robots" content={"index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"} />
      {seo && seo.structuredData && <script type="application/ld+json">{JSON.stringify(seo.structuredData)}</script>}
    </Head>
  );
}
