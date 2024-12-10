import { client } from "@/lib/graphql/apolloClient";
import { GET_TOPIC_BY_NAME } from "@/lib/graphql/queries/blog";
import dynamic from "next/dynamic";
import Script from "next/script";
const BlogCard = dynamic(() => import('@/components/Blog/Card'), {
  ssr: false
});
export async function generateMetadata({ params }) {
  const { id } = params;
  return {
    title: `Topic: ${id}`,
  };
}

export default async function Index({ params, searchParams }) {

  try {
    const { data } = await client.query({
      query: GET_TOPIC_BY_NAME,
      variables: { topicId: searchParams?.topicId },
      fetchPolicy: "no-cache",
    });
    const BlogTopicPosts = data?.mpBlogPosts?.items || [];

    const blogSchema = {
      "@context": "https://schema.org",
      "@type": "Blog",
      blogPost: BlogTopicPosts.map((post) => ({
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
          url: post.author_url,
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
        {BlogTopicPosts?.length > 0 ? (
          <section className="relative md:py-24 py-16">
            <div className="container m-auto">
              <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 px-3">
                <div>
                  {BlogTopicPosts?.map((item) => (
                    <BlogCard products={item} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        ) : (
          <div className="h-[300px] w-full text-center w-full mt-32">
            <h3 className="text-3xl">No blog posts available</h3>
          </div>
        )}

      </>
    );
  } catch (error) {
    return <p>Error loading blog posts. Please try again later.</p>;
  }
}
