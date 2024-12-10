export const ProductSchema = ({ productItem }) => {
    const priceObject = productItem?.price_range?.minimum_price?.regular_price
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "Product",
        aggregateRating: {
            "@type": "AggregateRating",
            bestRating: "100",
            ratingCount: productItem?.reviews?.items?.length || 0,
            ratingValue: Number(Math?.round(productItem?.rating_summary / 20)),
        },
        image: productItem?.image?.url || '',
        name: productItem?.name,
        description: productItem?.description?.html || '',
        offers: {
            "@type": "AggregateOffer",
            priceCurrency: priceObject?.currency,
            highPrice: "1495",
            lowPrice: priceObject?.value,
            offerCount: "8",
            offers: [
                {
                    "@type": "Offer",
                    url: "https://save-a-lot-monitors.com/dell-30.html",
                },
                {
                    "@type": "Offer",
                    url: "https://jondoe-gadgets.com/dell-30.html",
                },
            ],
        },
    };
    return schemaData
}