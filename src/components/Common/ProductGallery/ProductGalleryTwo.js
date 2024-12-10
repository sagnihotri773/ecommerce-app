
import { useState } from "react";
import Image from "next/image";
import { NextImageSvg, PrevImageSvg } from "@/components/SvgFiles/SvgFile";
export default function ProductGalleryTwo ({ productsDetails }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showArrows, setShowArrows] = useState(false);

  const mediaGallery = productsDetails?.media_gallery || [];
  const selectedImage =
    mediaGallery[selectedImageIndex]?.url || productsDetails?.image?.url;

  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex + 1) % mediaGallery.length);
  };

  const handlePrevImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? mediaGallery.length - 1 : prevIndex - 1
    );
  };

  return (
    <div
      className="space-y-4"
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
    >
      <div className="aspect-square relative overflow-hidden rounded-lg  border border-gray-300">
        <Image
          src={selectedImage}
          alt="Leah Yoga Top"
          layout="fill"
          objectFit="cover"
          loading="lazy"
          className="w-full h-full object-center object-cover"
        />
        {mediaGallery.length > 1 && (
          <>
            <div
              className={`absolute left-2 top-1/2 transform -translate-y-1/2  text-white p-2 rounded-full cursor-pointer transition-opacity duration-300 ease-in-out ${
                showArrows
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-4"
              }`}
              onClick={handlePrevImage}
            >
              {/* <FaChevronLeft size={40} className="text-gray-400"/> */}
              <PrevImageSvg/>
            </div>

            <div
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full cursor-pointer transition-opacity duration-300 ease-in-out ${
                showArrows
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-4"
              }`}
              onClick={handleNextImage}
            >
              {/* <GrNext size={40} className="text-gray-400"/> */}
              <NextImageSvg/>
            </div>
          </>
        )}
      </div>

      <div className="flex space-x-4">
        {mediaGallery.map((item, index) => (
          <div
            key={index}
            className={`aspect-square w-20 relative overflow-hidden rounded-md cursor-pointer border ${
              selectedImageIndex === index
                ? "border-purple-500"
                : "border-gray-300"
            }`}
            onClick={() => setSelectedImageIndex(index)}
          >
            <Image
              loading="lazy"
              src={item.url}
              alt={item.label}
              objectFit="cover"
              className="w-full h-full object-center object-cover"
              height={250}
              width={250}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
