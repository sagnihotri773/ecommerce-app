import React from 'react';
import DownloadableProduct from '@/components/customer/DownloadableProduct/DownloadableProduct';
export async function generateMetadata({ params }) {
    return {
      title: "Downloadable Products",
    };
  }
export default function page() {
    return (
        <DownloadableProduct />
    )
}