import { client } from "@/lib/graphql/apolloClient";
import { BLOG_FILTER_BY_URL_KEY } from "@/lib/graphql/queries/blog";
import Script from "next/script";

export async function generateMetadata({ params }) {
  const { id } = params;
  return {
    title: `post: ${id}`,
  };
}
export default async function Page({ params }) {
  try {
    const { data } = await client.query({
      query: BLOG_FILTER_BY_URL_KEY,
      variables: { url_key: params?.id },
      fetchPolicy: "no-cache",
    });
    const blogPost = data?.mpBlogPosts?.items || [];

    const blogSchema = {
      "@context": "https://schema.org",
      "@type": "Blog",
      blogPost: blogPost.map((post) => ({
        "@type": "BlogPosting",
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `https://example-blog-url.com/${post.url_key}`,
        },
        headline: post.name,
        description: post.short_description,
        author: {
          "@type": "Person",
          name: post.author_name,
        },
        publisher: {
          "@type": "Organization",
          name: "Tech Insights Blog",
          logo: {
            "@type": "ImageObject",
            url: "https://example.com/logo.png",
          },
        },
        datePublished: post.publish_date,
        dateModified: post.updated_at,
        image: post.image,
        articleBody: post.post_content,
      })),
    };

    return (
      <>
        <Script
          strategy="lazyOnload" 
          async
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
        />

        <div className=" container m-auto">
          <div className="max-w-4xl mx-auto px-4 md:py-8">
            {blogPost?.map((item) => {
              return (
                <div dangerouslySetInnerHTML={{ __html: item?.post_content }} />
              );
            })}
          </div>
        </div>
      </>
    );
  } catch (error) {
    return <p>Error loading blog posts</p>;
  }
}
