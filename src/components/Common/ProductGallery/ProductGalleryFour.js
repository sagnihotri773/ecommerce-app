
import { useState } from 'react';
import Image from 'next/image';
import { NextImageSvg, PrevImageSvg } from '@/components/SvgFiles/SvgFile';

export default function ProductGalleryFour  ({ productsDetails })  {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [showArrows, setShowArrows] = useState(false);

    const mediaGallery = productsDetails?.media_gallery || [];
    const selectedImage = mediaGallery[selectedImageIndex]?.url || productsDetails?.image?.url;

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
            <div className="aspect-square  relative overflow-hidden rounded-lg border border-gray-300">
                {selectedImage && (
                    <Image
                        src={selectedImage}
                        alt="Product Image"
                        layout="fill"
                        objectFit="cover"
                        className="w-full h-full object-center object-cover"
                    />
                )}
                {mediaGallery.length > 1 && (
                    <>
                        <div
                            className={`absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 p-2 rounded-full cursor-pointer transition-opacity duration-300 ease-in-out ${showArrows ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                            onClick={handlePrevImage}
                        >
                            {/* <FaChevronLeft size={40} /> */}
                            <PrevImageSvg/>
                        </div>
                        <div
                            className={`absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 p-2 rounded-full cursor-pointer transition-opacity duration-300 ease-in-out ${showArrows ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
                            onClick={handleNextImage}
                        >
                            {/* <GrNext size={40} /> */}
                            <NextImageSvg/>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
