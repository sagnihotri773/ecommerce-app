import React from "react";
import Banner from "@/assets/Images/hero3Banner.jpg";

export default function banner() {
  return (
    <section
      className="relative md:flex table w-full items-center md:h-screen py-36 bg-center bg-no-repeat bg-cover"
      style={{ backgroundImage: `url(${Banner.src})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t to-transparent via-slate-900/50 from-slate-900/90" />
      <div className="container m-auto relative">
        <div className="grid grid-cols-1 justify-center">
          <div className="text-center">
            <span className="uppercase font-semibold text-lg text-white">
              Top Collection
            </span>
            <h4 className="md:text-6xl text-4xl md:leading-normal leading-normal font-bold text-white my-3">
              Shine Bright
            </h4>
            <p className="text-lg text-white/70">
              Our latest collection of essential basics.
            </p>
            <div className="mt-6">
              <a
                className="py-2 px-5 inline-block font-normal tracking-wide align-middle text-center bg-white text-orange-500-dark rounded-md"
                href="/shop"
              >
                Shop Now <i className="mdi mdi-arrow-right" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
