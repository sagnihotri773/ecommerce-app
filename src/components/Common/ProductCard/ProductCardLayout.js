import React from 'react';
import dynamic from 'next/dynamic';

const CardOne = dynamic(() => import('@/components/Common/ProductCard/Cards'), { ssr: false });
const CardTwo = dynamic(() => import('@/components/Product/CardTwo'), { ssr: false });
const CardThree = dynamic(() => import('@/components/Common/ProductCard/CardThree'), { ssr: false });
const CardFour = dynamic(() => import('@/components/Common/ProductCard/CardFour'), { ssr: false });
const CardFive = dynamic(() => import('@/components/Common/ProductCard/CardFive'), { ssr: false });
const CardSix = dynamic(() => import('@/components/Common/ProductCard/CardSix'), { ssr: false });
const CardSeven = dynamic(() => import('@/components/Common/ProductCard/CardSeven'), { ssr: false });
const CardEight = dynamic(() => import('@/components/Common/ProductCard/CardEight'), { ssr: false });

const cardComponents = {
  CardOne,
  CardTwo,
  CardThree,
  CardFour,
  CardFive,
  CardSix,
  CardSeven,
  CardEight,
};

const ProductCard = ({ layoutName,product }) => {
  const SelectedCard = cardComponents[layoutName] || CardOne; // default to `CardOne` if layoutName is undefined aur not


  return <SelectedCard products={product} />;
};

export default ProductCard;
