"use client";
import { Skeleton } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import { Dialog, DialogContent } from "../../ui/dialog";
import { QuickView } from "../../Product/ImageQuickView";
import { ImageQuickViewSvg } from "@/components/SvgFiles/SvgFile";

export default function ProductGalleryFive({ productsDetails }) {
  const [openGallery, setOpenGallery] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState(0);

  const getGalleryImg = () => {
    const media_gallery = productsDetails?.media_gallery || [];
    const newImage = {
      url: productsDetails?.image?.url,
      label: "defaultImage",
      __typename: "ProductImage",
    };
    return [...media_gallery, newImage];
  };

  return (
    <div className="lg:col-span-5">
      <div className="grid md:grid-cols-12 gap-3">
        <div className="md:col-span-12">
          <div className="relative inline-block">
            <button
              onClick={() => {
                setOpenGallery(true);
              }}
              className="absolute top-[20px] md:m-[40px] m-[15px] right-0 transform -translate-y-1/2 bg-white p-2 rounded shadow"
            >
              <ImageQuickViewSvg />
            </button>
            <span className="lightbox duration-500 group-hover:scale-105">
              {productsDetails?.image?.url ? (
                <Image
                  src={productsDetails?.image?.url}
                  className="h-auto shadow dark:shadow-gray-700"
                  alt=""
                  width={452}
                  height={600}
                />
              ) : (
                <Skeleton
                  variant="rectangular"
                  width={452}
                  height={600}
                  sx={{ bgcolor: "white" }}
                />
              )}
            </span>
          </div>
        </div>
        {productsDetails?.media_gallery?.length > 0
          ? productsDetails?.media_gallery.map((val, index) => (
              <div className="md:col-span-6" key={index}>
                <div className="lightbox duration-500 group-hover:scale-105">
                  <Image
                    src={val.url}
                    className="shadow dark:shadow-gray-700"
                    alt=""
                    width={452}
                    height={600}
                  />
                </div>
              </div>
            ))
          : ""}
        {getGalleryImg()?.length > 0 && (
          <Dialog
            open={openGallery}
            onOpenChange={(ev) => setOpenGallery(false)}
            className="!mt-20"
          >
            <DialogContent className="sm:max-w-screen-md mt-[68px] !max-w-full justify-center bg-black border-none ">
              {/* <DialogTitle /> */}
              <div className="z-10 mt-5">
                <QuickView
                  openGallery={openGallery}
                  galleryData={getGalleryImg()}
                  selected={selectedGallery}
                  setOpenGallery={setOpenGallery}
                />
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}
