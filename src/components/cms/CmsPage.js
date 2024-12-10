
export const CmsPage = ({ data }) => {

  const descriptionRender = (value = "") => {
    const unescapedHtml = value
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&")
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'");

    return unescapedHtml;
  };
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: descriptionRender(
          data?.content
        ),
      }}
    />
  );
};