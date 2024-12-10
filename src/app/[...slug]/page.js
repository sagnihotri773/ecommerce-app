// app/product/[slug]/page.js
import Shop from '@/components/Category/ShopTwo';
import { CmsPage } from '@/components/cms/CmsPage';
import ProductDetails from '@/components/Product/Detail';
import { ProductSchema } from '@/schema/schemas';
import getCategoryData from '@/server/category';
import { getRoute } from '@/server/productDetails';
import { notFound } from 'next/navigation';
// import { Suspense } from 'react';
// import ShopLoading from '@/components/LoadingLayouts/shopLoading';
import { FilterProvider } from '@/components/Util/context/FilterContext';
import Script from 'next/script';

export async function generateMetadata({ params }) {
  const { route, data } = await getRoute(params.slug);

  return {
    '@type': route?.__typename || 'Product',
    title: route?.meta_title ,
    description: route?.meta_description,
    keywords: route?.meta_keyword || route?.meta_keywords,
    image: route?.image?.url,
    twitter: {
      card: 'summary_large_image',
      creator: '@myTwitterHandle',
      site: '@myTwitterHandle',
      images: [route?.image?.url]
    },
    openGraph: {
      title: route?.meta_title,
      description: route?.meta_description,
      images: [
        {
          url: route?.image?.url,
          alt: route?.meta_title,
        },
      ],
    }
  }
}

const Product = async (paramsValue) => {
  const { params, searchParams } = paramsValue;
  const slug = params?.slug[0];
  if (['_next', 'undefinedlogo'].includes(slug)) {
    return null;
  }

  const data = await getRoute(params?.slug);
  const { route, products } = data || {};

  const categoryUID = {
    category_uid: route?.uid
  }

  let searchParamss = { ...categoryUID, ...searchParams };
  var schemaData = {};
  const productItem = products?.products?.items[0];
  if (productItem) {
    schemaData = ProductSchema({ productItem })
  }

  var categoryID = 0;
  if (route?.type === "CATEGORY") {
    categoryID = route.id;
    var { categoryProducts, categoryItems, loading } = await getCategoryData({ searchParamsValue: searchParamss });
  } else {
    categoryID = 0;
  }

  if (!route) {
    return notFound();
  }
  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "categoryProducts": categoryProducts?.items?.map((item, index) => ({
      "name": item?.name,
      "description": item?.meta_description,
    })),
    "itemListElement": categoryProducts?.items?.map((item, index) => ({
      "@type": "ListItem",
      "item": item?.url_key,
      "name": item?.name,
      "position": index + 1,
    })),
  };
  
  return (
    <>
      <Script
        strategy="lazyOnload"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }}
        strategy="lazyOnload"
      />
      {route?.__typename === "CmsPage" && <CmsPage data={route} />}
      {route?.type === "PRODUCT" && (
        <ProductDetails data={products?.products} />
      )}
      {route?.type === "CATEGORY" &&
        <FilterProvider>
          <Shop categoryProducts={categoryProducts} categoryItems={categoryItems} categoryUID={categoryUID} categoryID={categoryID} loading={loading} />
        </FilterProvider>
      }
    </>
  );
};

export default Product;
