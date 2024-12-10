import { client } from "@/lib/graphql/apolloClient";
import { BLOG_FILTER_BY_NAME } from "@/lib/graphql/queries/blog";
import dynamic from "next/dynamic";
import Script from "next/script";
const BlogCard = dynamic(() => import('@/components/Blog/Card'), {
  ssr: false
});
export async function generateMetadata({ params }) {
  const { id } = params;
  return {
    title: `category: ${id}`,
  };
}
export default async function Page({ params }) {
  try {
    const { data } = await client.query({
      query: BLOG_FILTER_BY_NAME,
      variables: { name: params?.id },
      fetchPolicy: "no-cache",
    });
    const getCategoryPost = data?.mpBlogPosts?.items || [];

    const blogSchema = {
      "@context": "https://schema.org",
      "@type": "Blog",
      blogPost: getCategoryPost.map((post) => ({
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
          async
          strategy="lazyOnload" 
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
        />
        <div className="w-full">
          {getCategoryPost?.length > 0 ? (
            <section className="relative md:py-24 py-16">
              <div className="container m-auto relative">
                <div className="group relative overflow-hidden grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 px-3">
                  {getCategoryPost?.map((item) => (
                    <BlogCard products={item} />
                  ))}
                </div>
              </div>
            </section>
          ) : (
            <div className="h-[300px] w-full text-center w-full mt-32">
              <h3 className="text-3xl">No blog posts available</h3>
            </div>
          )}
        </div>
      </>
    );
  } catch (error) {
    return <p>Error loading Category posts</p>;
  }
}
