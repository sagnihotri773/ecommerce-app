const baseUrl ='http://localhost:3000';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow:"/",
        disallow:"/private/"
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl
  };
}