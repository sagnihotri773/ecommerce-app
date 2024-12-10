"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "../../ui/dialog";
import { QuickView } from "../../Product/ImageQuickView";
import { ImageQuickViewSvg } from "@/components/SvgFiles/SvgFile";
const ProductGalleryOne = ({ productsDetails }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const thumbnailsRef = useRef(null);
  const [openGallery, setOpenGallery] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState(0);

  const handleImageClick = (index) => {
    setSelectedImage(index);

    if (thumbnailsRef.current) {
      const thumbnailHeight = thumbnailsRef.current.children[index].offsetHeight + 8;
      const scrollTop = thumbnailsRef.current.scrollTop;
      const containerHeight = thumbnailsRef.current.clientHeight;

      const newScrollTop = scrollTop + thumbnailHeight * (index - Math.floor(containerHeight / thumbnailHeight / 2));

      thumbnailsRef.current.scrollTo({
        top: newScrollTop,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = (e) => {
    e.preventDefault();
  };

  const getGalleryImg = () => {
    const media_gallery = productsDetails?.media_gallery || [];
    const newImage = {
      url: productsDetails?.image?.url,
      label: "defaultImage",
      __typename: "ProductImage"
    };
    return [...media_gallery, newImage]
  }
  return (
    <div className="flex gap-4 sticky top-20">
      <div
        ref={thumbnailsRef}
        className="col-span-2 flex flex-col gap-2 overflow-hidden h-fit  scroll-smooth"
        onWheel={handleScroll}
      >
        {productsDetails?.media_gallery?.map((item, index) => (
          <div className="min-h-[75px] sm:min-h-[100px] lg:min-h-[120px]" key={index}>
            <img
              src={item?.url}
              alt={`Thumbnail ${index + 1}`}
              onClick={() => handleImageClick(index)}
              className={`cursor-pointer border-2 rounded-lg w-[60px] sm:w-[75px] md:w-[87px] lg:w-[100px] ${selectedImage === index ? "border-indigo-500" : "border-transparent"}`}
            />
          </div>
        ))}
      </div>


      <div className="w-full h-auto relative">
        <button
          onClick={() => setOpenGallery(true)}
          className="absolute top-[20px] right-0 transform -translate-y-1/2 bg-white p-2 rounded shadow m-3.5"
        >
          <ImageQuickViewSvg />
        </button>

        <Image
          src={productsDetails?.media_gallery?.[selectedImage]?.url || productsDetails?.image?.url}
          className="rounded-lg w-full object-cover"
          alt={`Selected image`}
          width={452}
          height={600}
        />
      </div>

      {getGalleryImg()?.length > 0 && (
        <Dialog
          open={openGallery}
          onOpenChange={(ev) => setOpenGallery(false)}
          className="!mt-20"
        >
          <DialogContent className="sm:max-w-screen-md mt-20 !max-w-full justify-center bg-black border-none ">
            <DialogTitle />
            <div className="z-10 mt-5">
              <QuickView
                galleryData={getGalleryImg()}
                selected={selectedGallery}
                setOpenGallery={setOpenGallery}
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ProductGalleryOne;
