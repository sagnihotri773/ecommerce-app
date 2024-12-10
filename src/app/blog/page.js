import Blog from "@/components/Blog/Blog";
import { client } from "@/lib/graphql/apolloClient";
import { GET_BLOG_POST } from "@/lib/graphql/queries/blog";
import Script from "next/script";



export async function generateMetadata() {
  return {
    title: "Blog",
    description: "Stay ahead in the world of web development with expert insights, tutorials, and strategies"
  };
}

export default async function Page() {
  try {
    const { data } = await client.query({
      query: GET_BLOG_POST,
      variables: { currentPage: 1, pageSize: 10 },
      fetchPolicy: 'no-cache',
    });

    const posts = data?.mpBlogPosts?.items || [];

    const blogSchema = {
      "@context": "https://schema.org",
      "@type": "Blog",
      "blogPost": posts.map((post) => ({
        "@type": "BlogPosting",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://example-blog-url.com/${post.url_key}`,
        },
        "headline": post.name,
        "description": post.short_description,
        "author": {
          "@type": "Person",
          "name": post.author_name,
        },
        "publisher": {
          "@type": "Organization",
          "name": "Tech Insights Blog",
          "logo": {
            "@type": "ImageObject",
            "url": "https://example.com/logo.png",
          },
        },
        "datePublished": post.publish_date,
        "dateModified": post.publish_date || post.publish_date,
        "image": post.image,
        "articleBody": post.post_content,
      })),
    };

    return (
      <>
        <Script
          async
          strategy="beforeInteractive"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
        />

        <Blog/>
      </>
    );
  } catch (error) {
    return <p>Error loading blog posts</p>;
  }
}
