"use client";
import dynamic from "next/dynamic";
// import Category from "components/Home/Category/Index";

const Reviews = dynamic(() => import('@/components/Common/Reviews/ProductReview'));
const BlogSlider = dynamic(() => import('@/components/Common/BlogSlider/BlogSliderTwo'));
const ServiceFeatures = dynamic(() => import('@/components/Home/ServiceFeatures/ServiceFeatures'));
const WinterCollections = dynamic(() => import('@/components/Product/WinterCollections'));
const NewArrival = dynamic(() => import('@/components/Home/NewArrival/Index'));
const Category = dynamic(() => import('@/components/Home/Category/Index'));
const MainSection = dynamic(() => import('@/components/Home/MainSection/indexTwo'));
 

export const Main = () => { 

  // useEffect(() => {
  //   const getNewsletter = localStorage.getItem("isSubscribedNewsletter");
  //   if (getNewsletter !== "true") { // Check against the string "true"
  //     setTimeout(() => {
  //       dispatch(openPopover());
  //     }, 5000); // Show the popover after 5 seconds
  //   } else {
  //     dispatch(closePopover());
  //   }
  // }, [dispatch]);

  return (
    <>
      <MainSection />
      <Category />
      <NewArrival />
      <WinterCollections />
      {/* <EndOfSeason targetDate={targetDate} /> */}
      {/* <PopularItems productsList={products} /> */}
      <Reviews />
      <BlogSlider />
      <ServiceFeatures />
      {/* <ProductSwiper products={products} /> */}
      {/* <ProductSwiperTwo products={products} /> */}
      {/* <CategorySlider categories={categories}/> */}
      {/* <NewsLetterBanner/> */}
    </>
  );
};
