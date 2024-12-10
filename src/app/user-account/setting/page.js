import React from 'react'
import UpdatePassword from "@/components/User/UpdatePassword";
export async function generateMetadata({ params }) {
  return {
    title: "Settings",
  };
}
export default function page() {
  return (
    <UpdatePassword />
  )
}
