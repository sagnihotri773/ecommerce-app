"use client";

export default function HoverAddToCartButtonV4({ isLoading, callback }) {
  return (
    <>
      <button
        className={`hover:bg-primary hover:border-primary hover:text-white border-2 border-black mb-2 w-full font-bold text-black flex items-center justify-center h-12 transition-all duration-500 `}
        disabled={isLoading}
        onClick={(e) => callback()}
      >
        {isLoading ? "Sending..." : "Add to Cart"}
      </button>
    </>
  );
}
