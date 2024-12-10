import Image from "next/image";
export default function ProductGalleryThree ({ productsDetails })  {
  const mediaGallery = productsDetails?.media_gallery || [];

  return (
    <div className="space-y-4">
      <div className="aspect-square relative overflow-hidden rounded-lg border border-gray-300">
        <Image
          src={productsDetails?.image?.url}
          alt="Leah Yoga Top"
          layout="fill"
          objectFit="cover"
          className="w-full h-full object-center object-cover"
        />
      </div>

      <div className="flex flex-col space-y-4">
        {mediaGallery.map((item, index) => (
          <div
            key={index}
            className={`aspect-square relative overflow-hidden rounded-md cursor-pointer border`}
          >
            <Image
              src={item.url}
              alt={item.label}
              layout="fill"
              objectFit="cover"
              className="w-full h-full object-center object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
