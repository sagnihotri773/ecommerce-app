import React from "react";

const schema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: 'Loader Component',
  image: 'dell-30in-lcd.jpg',
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.5",
    reviewCount: "10",
  },
};

export default function Loader({className=""}) {
  return (
    <div className={className?className:"flex justify-center items-center h-screen"}>
      <div className="border-4 border-blue-500 border-dashed rounded-full w-16 h-16 animate-spin"></div>
    </div>
  );
}
