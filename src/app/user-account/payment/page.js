import React from 'react';
import Payment from "@/components/Payment/Payment";
export async function generateMetadata({ params }) {
    return {
      title: "Payments",
    };
  }
export default function page() {
    return (
        <Payment />
    )
}
