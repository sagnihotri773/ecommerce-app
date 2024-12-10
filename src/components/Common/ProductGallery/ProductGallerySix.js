"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "../../ui/dialog";
import { QuickViewStyleThree } from "../QuickView/QuickViewStyleThree";
import {
  ImageQuickViewSvg,
  NextImageSvg,
  PrevImageSvg,
} from "@/components/SvgFiles/SvgFile";

const ProductGallerySix = ({ productsDetails, loading = true }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const thumbnailsRef = useRef(null);
  const [openGallery, setOpenGallery] = useState(false);
  const [showArrows, setShowArrows] = useState(true);

  const handleImageClick = (index) => {
    setSelectedImage(index);
    if (thumbnailsRef.current) {
      const thumbnailHeight =
        thumbnailsRef.current.children[index].offsetHeight + 8;
      const scrollTop = thumbnailsRef.current.scrollTop;
      const containerHeight = thumbnailsRef.current.clientHeight;

      const newScrollTop =
        scrollTop +
        thumbnailHeight *
        (index - Math.floor(containerHeight / thumbnailHeight / 2));

      thumbnailsRef.current.scrollTo({
        top: newScrollTop,
        behavior: "smooth",
      });
    }
  };

  const handleNextImage = () => {
    setSelectedImage(
      (prevIndex) => (prevIndex + 1) % productsDetails?.media_gallery?.length
    );
  };

  const handlePrevImage = () => {
    setSelectedImage((prevIndex) =>
      prevIndex === 0
        ? productsDetails?.media_gallery?.length - 1
        : prevIndex - 1
    );
  };

  const getGalleryImg = () => {
    const media_gallery = productsDetails?.media_gallery || [];
    const newImage = {
      url: productsDetails?.image?.url,
      label: "defaultImage",
      __typename: "ProductImage",
    };
    return [...media_gallery, newImage];
  };

  const cardImages = (
    <div
      ref={thumbnailsRef}
      className="col-span-2 flex flex-row py-2 md:py-0 md:flex-col gap-2 overflow-hidden h-fit scroll-smooth"
    >
      {productsDetails?.media_gallery?.length > 0 && !loading ? productsDetails?.media_gallery?.map((item, index) => (
        <div
          className="min-h-[75px] sm:min-h-[100px] "
          key={index}
        >
          <Image
            src={item?.url}
            priority
            width={100}
            height={100}
            alt={`Thumbnail ${index + 1}`}
            onClick={() => handleImageClick(index)}
            className={`cursor-pointer border-2 rounded-lg w-[60px] sm:w-[75px] md:w-[87px] lg:w-[100px] ${selectedImage === index ? "border-indigo-500" : "border-transparent"
              }`}
          />
        </div>
      )) : loading ?
        <div className="col-span-2 flex flex-row py-2 md:py-0 md:flex-col gap-2 overflow-hidden h-fit scroll-smooth" >
          <div className="md:h-[86px] h-[60px] bg-gray-200 animate-pulse rounded-lg w-[60px] md:w-[86px]" />
          <div className="md:h-[86px] h-[60px] bg-gray-200 animate-pulse rounded-lg w-[60px] md:w-[86px]" />
        </div> : null}
    </div>
  );

  return (
    <div
      className="flex gap-4"
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
    >
      <div className="md:block hidden">{cardImages}</div>
      <div className="w-full h-fit relative">
        {productsDetails?.media_gallery?.length > 0 && !loading ? (
          <button
            onClick={() => setOpenGallery(true)}
            className="absolute top-[20px] right-0 z-10 transform -translate-y-1/2 bg-white p-2 rounded shadow m-3.5 bg-[#ffffff4d]"
          >
            <span id="button-label" className="sr-only">
              Close menu
            </span>
            <ImageQuickViewSvg />
          </button>
        ) : loading ? <div className="absolute top-[20px] right-0 z-10 transform -translate-y-1/2 bg-white p-2 rounded shadow m-3.5 bg-[#ffffff4d] rounded animate-pulse">  <ImageQuickViewSvg /></div> :
          null}

        {loading ? <div className="h-[410px] md:h-[639px] w-full md:w-[639px] bg-gray-300 rounded  animate-pulse w-3/4"></div>
          : <Image
            src={
              productsDetails?.media_gallery?.[selectedImage]?.url ||
              productsDetails?.image?.url
            }
            className="rounded-lg w-full object-cover"
            alt="Selected image"
            width={452}
            height={600}
          />}

        {productsDetails?.media_gallery?.length > 1 && !loading && (
          <div className="absolute md:inset-0 inset-x-0 md:top-0 top-40 flex items-center justify-between px-4">
            <button
              className={`bg-white hover:bg-primary p-2 rounded-full shadow transition-all duration-300 ${showArrows ? "opacity-100" : "opacity-0"
                }`}
              onClick={handlePrevImage}
            >
              <span id="button-label" className="sr-only">
                Previous
              </span>
              <PrevImageSvg />
            </button>
            <button
              className={`bg-white hover:bg-primary p-2 rounded-full shadow transition-all duration-300 ${showArrows ? "opacity-100" : "opacity-0"
                }`}
              onClick={handleNextImage}
            >
              <span id="button-label" className="sr-only">
                Next
              </span>
              <NextImageSvg />
            </button>
          </div>
        )}
        <div className="block md:hidden z-50">{cardImages}</div>
      </div>

      {getGalleryImg()?.length > 0 && (
        <Dialog
          open={openGallery}
          onOpenChange={(ev) => setOpenGallery(false)}
          className="!mt-20"
        >
          <DialogContent className="sm:max-w-screen-md mt-20 !max-w-full justify-center border-none  bg-gradient-to-t from-black via-black/70 to-black/70">
            <DialogTitle />
            <div className=" mt-5">
              <QuickViewStyleThree
                galleryData={getGalleryImg()}
                selected={selectedImage}
                setOpenGallery={setOpenGallery}
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ProductGallerySix;
