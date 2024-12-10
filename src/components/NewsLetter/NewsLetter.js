"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import PopoverLayout from "../Layout/Popover";
import NewsLetterBannerImage from "@/assets/Images/NewLetterBanner.webp";
import { shopUrl } from "../RouteManager";
import { useRouter } from "next/navigation";
import { closePopover } from "@/lib/redux/slices/newsLetterSlice";
import InputEmail from "../Util/Form/email";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { SUBSCRIBE_EMAIL_TO_NEWSLETTER } from "@/lib/graphql/queries/newsLetter";
import { client } from "@/lib/graphql/apolloClient";
import Cookies from "js-cookie";
// import { FaInstagram } from "react-icons/fa6";
// import { SlSocialFacebook } from "react-icons/sl";
// import { BsTwitterX } from "react-icons/bs";
// import { CiYoutube } from "react-icons/ci";

export default function NewsLetterBanner() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setIsLoading] = useState(false);
  const { openHideLayout } = useSelector((state) => state.newsLetter);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const { data: subscribeData } = await client.mutate({
        mutation: SUBSCRIBE_EMAIL_TO_NEWSLETTER,
        variables: { email: data?.email },
        fetchPolicy: "no-cache",
      });
      toast.success("You have successfully subscribed to the newsletter!");
      Cookies.set("isSubscribedNewsletter", "true", { expires: 1 });
      dispatch(closePopover());
      reset();
      return subscribeData;
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    document.body.style.overflow = openHideLayout ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [openHideLayout]);

  if (!openHideLayout) return null;

  return (
    <PopoverLayout
      closeLayout={() => dispatch(closePopover())}
      openLayout={openHideLayout}
    >
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg overflow-hidden max-w-[900px] w-full flex">
          <div className="relative hidden w-1/2 md:block">
            <Image
              src={NewsLetterBannerImage}
              alt="Stylish shoes"
              className="object-cover"
              width={450}
              height={600}
              priority
            />
            <button
              className="absolute left-6 bottom-6 bg-primary text-black px-4 py-2 rounded hover:bg-secondary"
              onClick={() => {
                router.push(shopUrl);
                dispatch(closePopover());
              }}
            >
              Shop Now
            </button>
          </div>
          <div className="w-full md:w-1/2 p-8">
            <div className="space-y-6 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-semibold tracking-tight">
                  Subscribe Us
                </h2>

                <p className="text-gray-600">
                  Follow news, promotions, and interesting events. Stay tuned
                  with us!
                </p>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <InputEmail
                  name="email"
                  register={register}
                  placeholder="Email"
                  errors={errors}
                  options={{ required: "This field is required" }}
                />

                <button
                  type="submit"
                  className={`w-full bg-primary text-black py-2 rounded 
              hover:bg-secondary 
              ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Subscribe"}
                </button>
                <div className="flex items-center space-x-2 justify-center mt-4 cursor-pointer">
                  <input
                    type="checkbox"
                    id="dontShow"
                    {...register("dontShow")}
                    className="rounded border-gray-300 text-black focus:ring-black cursor-pointer"
                    onChange={(e) => {
                      Cookies.set("dontShowPopup", e.target.checked, {
                        expires: 1,
                      });
                    }}
                  />
                  <label htmlFor="dontShow" className="text-sm text-gray-600 cursor-pointer">
                    Don't show this popup again
                  </label>
                </div>
              </form>
              {/* <div className="flex justify-center space-x-4 pt-4 cursor-pointer">
                <div>
                  <FaInstagram size={32}/>
                  <span id="button-label" class="sr-only">Instagram</span>
                </div>
                <div>
                  <SlSocialFacebook size={30}/>
                  <span id="button-label" class="sr-only">Facebook</span>
                </div>
                <div>
                  <BsTwitterX size={32}/>
                  <span id="button-label" class="sr-only">Twitter</span>
                </div>
                <div>
                  <CiYoutube size={35}/>
                  <span id="button-label" class="sr-only">Youtube</span>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </PopoverLayout>
  );
}
