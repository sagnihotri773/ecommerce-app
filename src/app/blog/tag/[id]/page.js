import { client } from "@/lib/graphql/apolloClient";
import { GET_POST_BY_TAG_NAME } from "@/lib/graphql/queries/blog";
import dynamic from "next/dynamic";
import Script from "next/script";
const BlogCard = dynamic(() => import('@/components/Blog/Card'), {
  ssr: false
});
export async function generateMetadata({ params }) {
  const { id } = params;
  return {
    title: `tag: ${id}`,
  };
}

export default async function Page({ params }) {
  try {
    const { data } = await client.query({
      query: GET_POST_BY_TAG_NAME,
      variables: { tagName: params?.id },
      fetchPolicy: "no-cache",
    });
    const getBlogTag = data?.mpBlogPosts?.items || [];

    const blogSchema = {
      "@context": "https://schema.org",
      "@type": "Blog",
      blogPost: getBlogTag.map((post) => ({
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
          type="application/ld+json"
          strategy="lazyOnload" 
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
        />
        {getBlogTag?.length > 0 ? (
          <section className="relative md:py-24 py-16">
            <div className="container m-auto relative">
              <div className="group relative overflow-hidden grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 px-3">
                {getBlogTag?.map((item) => (
                  <BlogCard products={item} />
                ))}
              </div>
            </div>
          </section>
        ) : (
          <div className="flex justify-center w-full">
            <p className="flex py-32 px-7">There are no posts at this moment</p>
          </div>
        )}
      </>
    );
  } catch (error) {
    return <p>Error loading Tag posts</p>;
  }
}
