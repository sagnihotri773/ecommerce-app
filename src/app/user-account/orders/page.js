import React from 'react';
import Order from "@/components/customer/Order/Order";
export async function generateMetadata({ params }) {
    return {
      title: "My Order",
    };
  }
export default function page() {
    return (
        <Order />
    )
}
