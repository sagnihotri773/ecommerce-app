import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  // const locale = 'de';
  const cookieStore = cookies();
  const userLocale = cookieStore.get('language')?.value || 'en_US'; // Default locale
  return {
    locale:userLocale,
    messages: (await import(`../public/messages/${userLocale}.json`)).default
  };
});
