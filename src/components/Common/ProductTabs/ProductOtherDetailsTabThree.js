import ProductCommentSection from "@/components/Product/CommentSection";
import { GET_CUSTOMER_REVIEW_TOKEN } from "@/lib/graphql/queries/reviews";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import dummyImage from "@/assets/Images/DummyUser.png";
import RatingComponent from "../Rating/Rating";
import { Rating } from "@material-tailwind/react";
import { ProductTabMobileView } from "./MobileView";

export default function ProductOtherDetailsTabThree({ data }) {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const descriptionRender = (value = "") => {
    const unescapedHtml = value
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&")
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'");

    return unescapedHtml;
  };

  const { data: reviewRatingData, refetch } = useQuery(
    GET_CUSTOMER_REVIEW_TOKEN
  );

  const [reviewRating, setReviewRating] = useState();
  useEffect(() => {
    setReviewRating(reviewRatingData?.customer?.reviews);
  }, [reviewRatingData]);

  const productName = data?.name;
  const getSpecificReview = reviewRating?.items?.filter(
    (item) => item?.product?.name == productName
  );
  return (
    <>
      <div className="hidden sm:block space-y-2 container m-auto">
        {/* Details Section */}
        {data?.description?.html && (
          <div>
            <button
              onClick={() => toggleSection("details")}
              className="w-1/2 text-left py-3 px-4 bg-gray-100 hover:bg-gray-100 text-black font-semibold"
            >
              DETAILS
            </button>
            {openSection === "details" && (
              <div
                className="p-4 bg-white border border-gray-200 w-1/2"
                dangerouslySetInnerHTML={{
                  __html: descriptionRender(data?.description?.html),
                }}
              ></div>
            )}
          </div>
        )}

        {(data?.aggregations?.length > 0 ||
          data?.configurable_options?.length > 0) && (
          <div>
            <button
              onClick={() => toggleSection("moreInfo")}
              className="w-1/2 text-left py-3 px-4 bg-gray-100 hover:bg-gray-200 text-black font-semibold"
            >
              MORE INFORMATION
            </button>
            {openSection === "moreInfo" && (
              <div className="p-4 bg-white border border-gray-200 w-1/2">
                <ul className="flex flex-col space-y-2">
                  {data?.configurable_options?.map((item) => (
                    <li
                      key={item.attribute_id}
                      className="border-gray-200 pb-2 flex"
                    >
                      <strong className="mr-6 min-w-[85px]">
                        {item.label}:
                      </strong>
                      <ul className="ml-4 flex gap-5">
                        {item.values.map((value) => (
                          <li key={value.value_index}>{value.label}</li>
                        ))}
                      </ul>
                    </li>
                  ))}

                  {data?.aggregations?.find(
                    (item) => item.attribute_code === "material"
                  ) && (
                    <li className="border-gray-200 pb-2 flex">
                      <strong className="mr-6 min-w-[85px]">Material:</strong>
                      <ul className="ml-4 flex gap-5">
                        {data?.aggregations
                          ?.find((item) => item.attribute_code === "material")
                          ?.options?.map((option) => (
                            <li key={option.value}>{option.label}</li>
                          ))}
                      </ul>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        )}

        <div>
          <button
            onClick={() => toggleSection("reviews")}
            className="w-1/2 text-left py-3 px-4 bg-gray-100 hover:bg-gray-200 text-black font-semibold"
          >
            REVIEWS
          </button>
          {openSection === "reviews" && (
            <div className="p-4 bg-white border border-gray-200 w-1/2">
              <div className="space-y-6 ">
                {getSpecificReview?.map((review, index) => (
                  <div
                    key={index}
                    className="border border-gray-300 rounded-md p-4 flex space-x-4"
                  >
                    <img
                      src={dummyImage?.src}
                      alt={`Profile picture of ${review?.nickname}`}
                      className="h-16 w-16 rounded-full"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">
                        {review?.nickname}
                      </h3>
                      <div className="w-64 space-y-2">
                        {review?.ratings_breakdown?.map((item, itemIndex) => {
                          return (
                            <div
                              key={itemIndex}
                              className="flex justify-between items-center"
                            >
                              <p>{item?.name}</p>
                              <Rating
                                value={Number(item.value)}
                                readonly
                                ratedColor="orange"
                                unratedColor="blue"
                                className="text-primary"
                              />
                            </div>
                          );
                        })}
                      </div>
                      <p className="text-gray-700 mt-2">{review?.summary}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className=" w-full">
                <h3 className="text-base font-bold mb-2">Add a Review</h3>
                <ProductCommentSection data={data} refetch={refetch} />
              </div>
            </div>
          )}
        </div>
      </div>
      <ProductTabMobileView data={data} description={data?.description} />
    </>
  );
}
