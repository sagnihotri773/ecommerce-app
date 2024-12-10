import Favourite from '@/components/Wishlist/Favourite';
import React from 'react';
export async function generateMetadata({ params }) {
    return {
      title: "Favorite",
    };
  }
export default function page() {
    return (
        <Favourite />
    )
}