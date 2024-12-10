import React from "react";
import Thanks1 from "@/components/Thanks/Thanks1";
import ThankYouGradient from "../../assets/Images/thank-you-gradient.png";
export async function generateMetadata({ params }) {
  return {
    title: "Order Successful",
  };
}
export default function page() {
  return (
    <section
      className={` items-center justify-center w-full py-20 bg-cover bg-center min-h-screen `}
      style={{ backgroundImage: `url(${ThankYouGradient.src})` }}
    >
      <Thanks1 />
    </section>
  );
}
