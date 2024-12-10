"use client";
import React, { useEffect, useState } from "react";
import SubmitButton from "@/components/Util/Button/SubmitButton";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@apollo/client";
import {
  CREATE_PRODUCT_REVIEWS,
  GET_PRODUCT_REVIEW_RATING,
} from "@/lib/graphql/queries/reviews";
import { Rating } from "@material-tailwind/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { EmailSvg, UserProfileSvg } from "@/components/SvgFiles/SvgFile";
import { useTranslations } from "next-intl";
import { InputText } from "../Util/Form/input";
import TextArea from "../Util/Form/textArea";

export default function ProductCommentSection({ productsDetails, refetch }) {
  const t = useTranslations("ProductDetail");
  const [ratings, setRatings] = useState([]);
  const [initialRatings, setInitialRatings] = useState([]);
  const [ratingErrors, setRatingErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [createProductReviews] = useMutation(CREATE_PRODUCT_REVIEWS);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const removeTypename = (obj) => {
    if (Array.isArray(obj)) {
      return obj.map(removeTypename);
    } else if (typeof obj === "object" && obj !== null) {
      const { __typename, ...rest } = obj;
      return Object.keys(rest).reduce((acc, key) => {
        const value = removeTypename(rest[key]);
        acc[key] = value === undefined ? "" : value; // Replace undefined with empty string
        return acc;
      }, {});
    }
    return obj;
  };

  const { data: getRatingData } = useQuery(GET_PRODUCT_REVIEW_RATING);

  useEffect(() => {
    if (getRatingData) {
      const cleanedData = removeTypename(
        getRatingData.productReviewRatingsMetadata.items
      );
      setRatings(cleanedData);
      setInitialRatings(cleanedData.map((rating) => ({ ...rating, value_id: null }))); // Make initial ratings 0
      setRatingErrors(new Array(cleanedData.length).fill(null));
    }
  }, [getRatingData, loading]);

  const handleRatingChange = (index, value) => {
    const updatedRatings = [...ratings];
    updatedRatings[index].value_id = updatedRatings[index].values[value - 1]?.value_id;
    setRatings(updatedRatings);

    // Clear the error if a rating is selected
    const updatedErrors = [...ratingErrors];
    updatedErrors[index] = null;
    setRatingErrors(updatedErrors);
  };

  const ratingInputs = ratings.map((rating) => ({
    id: rating.id,
    value_id: rating.value_id,
  }));

  const onSubmit = () => {
    let hasError = false;
    const updatedErrors = [...ratingErrors];

    // Check if all ratings have value_id
    ratings.forEach((item, index) => {
      if (!item.value_id) {
        updatedErrors[index] = `Please fill the ${item.name} rating`;
        hasError = true;
      }
    });

    if (hasError) {
      setRatingErrors(updatedErrors);
    }

    handleSubmit((data) => {
      if (!hasError && Object.keys(errors).length === 0) {
        setLoading(true);
        createProductReviews({
          variables: {
            input: {
              sku: productsDetails?.sku,
              nickname: data?.name,
              summary: data?.review,
              text: data?.text,
              ratings: ratingInputs,
            },
          },
          onError: ({ graphQLErrors }) => {
            var error = graphQLErrors?.reduce((r, i) => r.concat(i?.message), []);
            setLoading(false);
            setRatings(removeTypename(
              getRatingData.productReviewRatingsMetadata.items
            ));
            return toast.error(error || error?.message);
          },
          onCompleted(res) {
            reset();
            // Reset ratings by setting value_id to null for each item
            toast.success(t("ReviewAddedSuccessfully"));
            refetch();
            setLoading(false);
            setRatings(initialRatings.map(rating => ({ ...rating,value_id: null})));
            setRatingErrors(new Array(ratings.length).fill(null)); // Reset errors
          },
        });
      }
    })();
  };

  return (
    <div className="p-6 rounded-md shadow dark:shadow-gray-800 mt-8">
      <h5 className="text-lg font-semibold">{t("LeaveComment")}</h5>
      <form className="mt-8" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
        <div className="grid lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-6 mb-5">
            <div className="text-start">
              <div className="form-icon relative mt-2">
                
                <InputText
                  label={t("YourName")}
                  register={register}
                  errors={errors}
                  options={{ required: t("RequiredField") }}
                  name="name"
                  type="text"
                  placeholder={t("YourName")}
                  isIcon={<UserProfileSvg />}
                />
              </div>
            </div>
          </div>
          <div className="lg:col-span-6 mb-5">
            <div className="text-start">
              <div className="form-icon relative mt-2">
                
                <InputText
                  name={"text"}
                  register={register}
                  label={t("ReviewHeadline")}
                  errors={errors}
                  options={{ required: t("RequiredField") }}
                  placeholder={t("WriteYourReviewHeadline")}
                  isIcon={<EmailSvg />}
                />
              </div>
            </div>
          </div>
          <div className="lg:col-span-12 mb-5">
            <div className="text-start">
              <div className="form-icon relative mt-2">
                <TextArea
                  name={"review"}
                  label={t("Review")}
                  register={register}
                  errors={errors}
                  options={{ required: t("RequiredField") }}
                  className="mt-2 w-full py-2 px-3 h-28 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                  placeholder={t("WriteYourReview")}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-sm px-3 mt-5">
          {ratings?.length > 0 &&
            ratings.map((item, index) => (
              <div key={item.id} className="grid grid-cols-2 my-2 gap-4">
                <p>{item.name}</p>
                <div>
                  <Rating
                   key={item.value_id} 
                    color="warning"
                    className="rating-start"
                    name={`rating_${index}`}
                    value={
                      item.value_id === null
                        ? 0
                        : item.values.findIndex((v) => v.value_id === item.value_id) + 1
                    }
                    onChange={(value) => {
                      // Check if the rating value is the same as the selected value.
                      const newValue =
                        value ===
                          (item.value_id === null
                            ? 0
                            : item.values.findIndex((v) => v.value_id === item.value_id) + 1)
                          ? 0 // Reset to zero if the same rating is clicked again
                          : value;

                      handleRatingChange(index, newValue);
                    }}
                  />
                  {ratingErrors[index] && (
                    <p className="text-red-500 text-sm mt-1">
                      {ratingErrors[index]}
                    </p>
                  )}
                </div>
              </div>
            ))}
        </div>
        <SubmitButton title={t("SendMessage")} loading={loading} />
      </form>
    </div>
  );
}
