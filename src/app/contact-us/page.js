import dynamic from 'next/dynamic'
const ContactUsForm = dynamic(() => import('@/components/ContactUs/Form'), { ssr: false })
const ContactUsMap = dynamic(() => import('@/components/ContactUs/Map'), { ssr: false })

export async function generateMetadata({ params }) {

  return {
    '@type': "contact-us",
    title: "contact-us",
    description: "Get in touch with us for any inquiries or support.",
    keywords: "contact, support, inquiries"
  }
}


export default function page() {
  return (
    <div>
      <ContactUsMap />
      <section className="relative lg:py-24 py-16">
        <ContactUsForm />
      </section>
    </div>
  );
}
