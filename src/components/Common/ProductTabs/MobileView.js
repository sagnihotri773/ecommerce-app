import { useState } from "react";
import DescriptionTab from "./DescriprionTab";
import AdditionalInfo from "./AdditionalInfo";
import ProductReview from "./ProductRating";
import { MinusSvg, PlusSvg } from "@/components/SvgFiles/SvgFile";

export const ProductTabMobileView = ({ data, description }) => {
  const [openTabMobile, setOpenTabMobile] = useState(null);
  const toggleAccordion = (tabName) => {
    setOpenTabMobile((prevTab) => (prevTab === tabName ? null : tabName));
  };
  return (
    <div className="sm:hidden container m-auto">
      {(data?.configurable_options?.length > 0 ||
        data?.aggregations?.length > 0) && (
        <div className="border-t border-[#d7d7d7] py-3">
          <div
            onClick={() => toggleAccordion("Additional")}
            className="flex justify-between items-center cursor-pointer"
          >
            <span className="text-[#666] text-lg font-medium">
              Additional Information
            </span>
            <span>
              {openTabMobile === "Additional" ? <MinusSvg /> : <PlusSvg />}
            </span>
          </div>
          {openTabMobile === "Additional" && (
            <div>
              <AdditionalInfo data={data} />
            </div>
          )}
        </div>
      )}

      {description?.html?.length > 0 && (
        <div className="border-t border-[#d7d7d7] py-3">
          <div
            onClick={() => toggleAccordion("Description")}
            className="flex justify-between items-center cursor-pointer"
          >
            <span className="text-[#666] text-lg font-medium">Description</span>
            <span>
              {openTabMobile === "Description" ? <MinusSvg /> : <PlusSvg />}
            </span>
          </div>
          {openTabMobile === "Description" && (
            <div>
              <DescriptionTab description={description} />
            </div>
          )}
        </div>
      )}

      <div className="border-t border-[#d7d7d7] py-3">
        <div
          onClick={() => toggleAccordion("Reviews")}
          className="flex justify-between items-center cursor-pointer"
        >
          <span className="text-[#666] text-lg font-medium">Reviews</span>
          <span>{openTabMobile === "Reviews" ? <MinusSvg/> : <PlusSvg />}</span>
        </div>
        {openTabMobile === "Reviews" && (
          <div>
            <ProductReview data={data} />
          </div>
        )}
      </div>
    </div>
  );
};
