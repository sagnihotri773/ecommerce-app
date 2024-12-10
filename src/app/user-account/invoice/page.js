import React from 'react'
import ComingSoon from '@/components/Layout/GlobalLayouts/ComingSoon';
export async function generateMetadata({ params }) {
    return {
      title: "Order Invoice",
    };
  }
export default function page() {
    return (
        <ComingSoon />
    )
}
