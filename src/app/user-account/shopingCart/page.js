import ShoppingCart from '@/components/Cart/Cart';
import React from 'react';
export async function generateMetadata({ params }) {
    return {
      title: "Shopping Cart",
    };
  }
export default function page() {
    return (
        <ShoppingCart />
    )
}
