"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CartSvg,
  FacebookSvg,
  InstaSvg,
  LinkedinSvg,
  MessageSvg,
  ShreethemesSvg,
  TwitterSvg,
} from "@/components/SvgFiles/SvgFile";
import { useSelector } from "react-redux";
import { selectStoreInfo } from "@/lib/redux/slices/storeConfig";

export default function Sos() {
  const storeLogoUrl = useSelector((state) => selectStoreInfo(state, "logo"));


  return (
    <div className="lg:col-span-3 md:col-span-12">
      <Link className="text-[22px] focus:outline-none" href="/">
        <img
          src={storeLogoUrl}
          className="w-[80px]"
          alt="Logo"
        />
      </Link>
      <p className="mt-6 text-gray-300">
        Upgrade your style with our curated sets. Choose confidence, embrace
        your unique look.
      </p>
      <ul className="list-none mt-6">
        <li className="inline">
          <Link
            className="size-8 inline-flex items-center justify-center tracking-wide align-middle text-base border border-gray-800 dark:border-slate-800 rounded-md hover:text-primary dark:hover:text-primary text-slate-300"
            href="https://1.envato.market/shreethemes-portfolio"
            target="_blank"
          >
            <CartSvg />
          </Link>
        </li>
        <li className="inline">
          <Link
            className="size-8 inline-flex items-center justify-center tracking-wide align-middle text-base border border-gray-800 dark:border-slate-800 rounded-md hover:text-primary dark:hover:text-primary text-slate-300"
            href="https://dribbble.com/shreethemes"
            target="_blank"
          >
            <ShreethemesSvg />
          </Link>
        </li>
        <li className="inline">
          <Link
            className="size-8 inline-flex items-center justify-center tracking-wide align-middle text-base border border-gray-800 dark:border-slate-800 rounded-md hover:text-primary dark:hover:text-primary text-slate-300"
            href="http://linkedin.com/company/shreethemes"
            target="_blank"
          >
            <LinkedinSvg />
          </Link>
        </li>
        <li className="inline">
          <Link
            className="size-8 inline-flex items-center justify-center tracking-wide align-middle text-base border border-gray-800 dark:border-slate-800 rounded-md hover:text-primary dark:hover:text-primary text-slate-300"
            href="https://www.facebook.com/shreethemes"
            target="_blank"
          >
            <FacebookSvg />
          </Link>
        </li>
        <li className="inline">
          <Link
            className="size-8 inline-flex items-center justify-center tracking-wide align-middle text-base border border-gray-800 dark:border-slate-800 rounded-md hover:text-primary dark:hover:text-primary text-slate-300"
            href="https://www.instagram.com/shreethemes"
            target="_blank"
          >
            <InstaSvg />
          </Link>
        </li>
        <li className="inline">
          <Link
            className="size-8 inline-flex items-center justify-center tracking-wide align-middle text-base border border-gray-800 dark:border-slate-800 rounded-md hover:text-primary dark:hover:text-primary text-slate-300"
            href="https://twitter.com/shreethemes"
            target="_blank"
          >
            <TwitterSvg />
          </Link>
        </li>
        <li className="inline">
          <Link
            className="size-8 inline-flex items-center justify-center tracking-wide align-middle text-base border border-gray-800 dark:border-slate-800 rounded-md hover:text-primary dark:hover:text-primary text-slate-300"
            href="mailto:support@shreethemes.in"
            target="_blank"
          >
            <MessageSvg />
          </Link>
        </li>
      </ul>
    </div>
  );
}
