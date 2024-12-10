"use client";
import Image from "next/image";
import ErrorPng from "@/assets/Images/error.png";
import { Link } from "@/components/ui/Link";
import { homeUrl } from "@/components/RouteManager";
import CopyRight from "@/components/Common/Footer/copyRight";

export default function Page() {
  return (
    <div className="container-fluid m-auto relative">
      <div className="grid grid-cols-1">
        <div className="flex flex-col min-h-screen justify-center md:px-10 py-10 px-4">
          <div className="title-heading text-center my-auto">
            <div className="flex justify-center items-center">
              <Image
                src={ErrorPng ? ErrorPng : ""}
                width={500}
                height={500}
                alt="Error Image"
                priority={true}
              />
            </div>
            <h1 className="mt-8 mb-6 md:text-5xl text-3xl font-bold">
              Page Not Found?
            </h1>
            <p className="text-slate-400">
              Whoops, this is embarrassing. <br /> Looks like the page you
              were looking for wasn't found.
            </p>
            <div className="mt-4">
              <Link
                className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-primary hover:bg-primary border-primary hover:border-orange-600 text-white rounded-md"
                href={homeUrl}
                prefetch={true}
              >
                Back to Home
              </Link>
            </div>
          </div>
          <div className="text-center">
            <CopyRight />
          </div>
        </div>
      </div>
    </div>
  );
}
