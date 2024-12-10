import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import HocComponent from "./HocComponent";
import getNavbarData from "@/server/menu";
import StyledJsxRegistry from './registry'
import storeLogo from "@/assets/Images/Storelogo.png";
import { Jost } from 'next/font/google';
import { cookies } from 'next/headers';

const jost = Jost({
  subsets: ['latin'], // Add subsets based on your use case
  variable: '--font-jost', // Define a custom CSS variable for the font
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], // Optional: define specific weights
  style: ['normal', 'italic'], // Optional: specify styles
})

export const generateMetadata = {
  // metadataBase: new URL('http://localhost:3000/'), 
  title: {
    default: 'My Awesome Site',
    template: '%s',
    image:storeLogo
  },
  robots: {
    follow: true,
    index: true
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@myTwitterHandle',
    site: '@myTwitterHandle',
    images:[storeLogo]
  }
};

export default async function RootLayout({ children, params }) {
  const messages = await getMessages();
  const locale = await getLocale();
  const Cookies = cookies();
  const getNewsletter = Cookies.get('isSubscribedNewsletter')?.value;
  const doNowShowNewsLetterBanner = Cookies.get('dontShowPopup')?.value;
  const navData = await getNavbarData();
  const dir = locale === 'ar_AR' ? 'rtl' : 'ltr'
  return (
    <html lang={locale || 'en'} dir={dir} className={jost.variable}>
      <body >

        <NextIntlClientProvider messages={messages}>
          <StyledJsxRegistry>
            <HocComponent navBarOptions={navData.categoryData} cookie={{getNewsletter,doNowShowNewsLetterBanner}}>{children}</HocComponent>
          </StyledJsxRegistry>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
