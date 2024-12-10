import Script from "next/script";
import Breadcrumbs from "@/components/Common/BreadCrumbs/index";
import { AddresArray } from "@/components/dummy";
import AddressCard from "@/components/Common/Address/Card";

export async function generateMetadata() {
  return {
    title: "Our_store",
    description: "store_description",
    robots: "index, follow",
  };
}

const schema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Loader Component",
  image: "dell-30in-lcd.jpg",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.5",
    reviewCount: "10",
  },
};

export default function OurStore() {
  const breadcrumbs = {
    title: "Our Store",
    pageUrl: "/",
    pageName: "STORES",
    textCenter: "flex justify-center",
  };

  return (
    <>
      <script
        async
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="px-5">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <section className="relative md:py-24 py-16">
          <div className="container md:px-20 lg:px-20 m-auto relative">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 px-3">
              {AddresArray.map((add, index) => (
                <AddressCard AddresArray={add} key={index} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
