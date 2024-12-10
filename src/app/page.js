// /src/app/page.js

import { Main } from "@/components/Home/Main";
import Script from "next/script";
import { Suspense } from "react";
import Head from 'next/head';
export const metadata = {
  title: "Fashion Shop | Trendy Clothing, Shoes & Accessories",
  description: "Shop the latest fashion trends in clothing, shoes, and accessories. Find unique styles for every occasion at unbeatable prices. Fast delivery & easy returns.",
  robots: "index, follow",
  openGraph: {
    title: 'Fashion Shop - Trendy Clothing & Accessories',
    type: 'website',
    image: 'https://magento-1305685-4934743.cloudwaysapps.com/media/logo/stores/2/logo.png',
    url: 'https://nextjs-magento2.vercel.app/',
    description: 'Explore a wide range of trendy clothing, shoes, and accessories at Fashion Shop. Find unique styles for every season and occasion.',
    siteName: 'Fashion Shop',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fashion Shop | Trendy Clothing, Shoes & Accessories',
    description: 'Find the latest fashion trends in clothing, shoes, and accessories. Shop now and enjoy fast shipping, great deals, and hassle-free returns.',
    image: 'https://magento-1305685-4934743.cloudwaysapps.com/media/logo/stores/2/logo.png',
  },
};

export default function Home() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Store",
    "name": "Fashion Shop",
    "description": "Shop the latest trends in fashion clothing, shoes, and accessories. Discover unique styles for every season.",
    "url": "https://nextjs-magento2.vercel.app/",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Fashion St.",
      "addressLocality": "Cityville",
      "addressRegion": "CA",
      "postalCode": "12345",
      "addressCountry": "US"
    },
    alternates: {
      canonical: `https://nextjs-magento2.vercel.app`
    },
    openGraph: {
      title: 'Fashion Shop | Trendy Clothing, Shoes & Accessories',
      type: 'website', // Use 'article' or 'website'
      image: 'https://magento-1305685-4934743.cloudwaysapps.com/media/logo/stores/2/logo.png',
      url: 'https://nextjs-magento2.vercel.app/',
      description: 'Find the latest in clothing, shoes, and accessories at Fashion Shop. Great deals and fast delivery for all your fashion needs.',
    }
  };

  return (
    <>
    <Head>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        strategy="lazyOnload"
      />
    </Head>
      <Suspense fallback={'...loading'}>
        <Main />
      </Suspense>
    </>
  );
}
