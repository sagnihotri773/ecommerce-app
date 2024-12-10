"use client";

import { X, PinIcon as Pinterest } from "lucide-react";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  LinkedinIcon,
  TelegramShareButton,
  TelegramIcon,
} from "react-share";
import { toast } from "react-toastify";
import PopoverLayout from "@/components/Layout/Popover";
export default function ShareProductTwo({ closeLayout, openLayout }) {
  const url = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard!");
  };
  return (
    <PopoverLayout closeLayout={() => closeLayout()} openLayout={openLayout}>
      <div className="flex justify-center w-full h-full">
        <div className="dropdown-menu absolute px-4 md:px-8 overflow-hidden md:top-[93px] end-0 m-0 mt-5 z-10 w-full rounded-md dark:bg-slate-900">
          <div className="flex md:w-[80%] m-auto flex-wrap  p-4 md:h-[698px] h-[578px] overflow-y-auto">
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white rounded-lg p-6 w-96">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Copy link:</h2>
                  <button
                    className="text-gray-500 hover:text-gray-700"
                    onClick={() => closeLayout()}
                  >
                      <span id="button-label" class="sr-only">Close</span>
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex items-center space-x-2 mb-4"> 
                  <input
                    type="text"
                    value={url}
                    readOnly
                    className="flex-1 border rounded px-2 py-1 text-sm"
                    aria-label="Read-only input displaying the URL"
                  />
                  <button
                    onClick={handleCopy}
                    className="bg-gray-200 hover:bg-gray-300 rounded px-2 py-1 text-sm"
                  >
                      <span id="button-label" class="sr-only">Copy</span>
                    📋
                  </button>
                </div>
                <div className="text-center mb-2">Share:</div>
                <div className="flex justify-center space-x-4">
                  <WhatsappShareButton
                    url={url}
                    title={"WhatsApp"}
                    separator=":: "
                    className="Demo__some-network__share-button"
                  >
                    <WhatsappIcon size={32} round />
                  </WhatsappShareButton>
                  <FacebookShareButton url={url}>
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>
                  <TwitterShareButton url={url}>
                    <TwitterIcon size={32} round />
                  </TwitterShareButton>
                  <LinkedinShareButton url={url}>
                    <LinkedinIcon size={32} round />
                  </LinkedinShareButton>
                  <TelegramShareButton url={url}>
                    <TelegramIcon size={32} round />
                  </TelegramShareButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PopoverLayout>
  );
}
