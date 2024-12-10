"use client";
import { useEffect, useState, useRef } from "react";
import faqs from "@/assets/Images/faqs.jpg";

import { useRouter } from "next/navigation";
import { FaqAccordianSvg } from "@/components/SvgFiles/SvgFile";
import { contactUsUrl } from "@/components/RouteManager/index";
import { GET_FAQ } from "@/lib/graphql/queries/faq";
import { useQuery } from "@apollo/client";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";

export default function Faqs() {
  const [open, setOpen] = useState(null);
  const router = useRouter();
  const t = useTranslations("HelpCenter");

  const categoryRefs = useRef({});

  const handleToggle = (id) => {
    setOpen(open === id ? null : id);
  };

  const [getFaqList, setFaqList] = useState([]);
  const { data: faqsData } = useQuery(GET_FAQ);

  useEffect(() => {
    setFaqList(faqsData?.getFaqData);
  }, [faqsData]);

  const scrollToCategory = (id) => {
    if (categoryRefs.current[id]) {
      const yOffset = -100;
      const elementPosition =
        categoryRefs.current[id].getBoundingClientRect().top +
        window.pageYOffset;
      const offsetPosition = elementPosition + yOffset;

      setTimeout(() => {
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }, 100);
    }
  };

  return (
    <div>
      <section
        className="relative table w-full py-36 bg-center bg-no-repeat bg-cover"
        style={{ backgroundImage: `url(${faqs.src})` }}
      >
        <div className="absolute inset-0 bg-black opacity-80" />
        <div className="container relative m-auto">
          <div className="grid grid-cols-1 pb-8 text-center mt-10">
            <h3 className="text-4xl leading-normal tracking-wider font-semibold text-white">
              {t("FrequentlyAskedQuestions")}
            </h3>
          </div>
        </div>
        <div className="absolute text-center z-10 bottom-5 start-0 end-0 mx-3">
          <ul className="tracking-[0.5px] mb-0 inline-block">
            <li className="inline-block uppercase text-[13px] font-bold duration-500 ease-in-out text-white/50 hover:text-white">
              <a>{t("Cartzio")}</a>
            </li>
            <li className="inline-block text-base text-white/50 mx-0.5 ltr:rotate-0 rtl:rotate-180">
              <i className="mdi mdi-chevron-right" />
            </li>
            <li className="inline-block uppercase text-[13px] font-bold duration-500 ease-in-out text-white/50 hover:text-white">
              <a>{t("Helpcenter")}</a>
            </li>
            <li className="inline-block text-base text-white/50 mx-0.5 ltr:rotate-0 rtl:rotate-180">
              <i className="mdi mdi-chevron-right" />
            </li>
            <li
              className="inline-block uppercase text-[13px] font-bold duration-500 ease-in-out text-white"
              aria-current="page"
            >
              {t("FAQs")}
            </li>
          </ul>
        </div>
      </section>

      <div className="container relative m-auto">
        <div className="grid md:grid-cols-12 grid-cols-1 gap-6">
          <div className="lg:col-span-4 md:col-span-5 py-7">
            {getFaqList?.length > 0 && (
              <div className="rounded-md shadow-lg  p-6 sticky top-20 bg-white dark:bg-gray-900">
                <ul className="list-none space-y-4" id="navmenu-nav">
                  {getFaqList?.map((item) => (
                    <li className="navbar-item" key={item.categories_id}>
                      <a
                        onClick={() => scrollToCategory(item.categories_id)}
                        className="text-base font-medium text-gray-800 dark:text-gray-200 hover:text-primary dark:hover:text-blue-400 cursor-pointer transition-colors"
                      >
                        {item.category_name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="lg:col-span-8 md:col-span-7 py-6 px-4">
            {getFaqList?.map((category) => (
              <div
                key={category.categories_id}
                className="faq-category"
                ref={(el) => {
                  categoryRefs.current[category.categories_id] = el;
                }}
              >
                {category.faqs?.map((faq) => (
                  <div key={faq.questions_id} className="py-4">
                    <h2 id={`accordion-collapse-heading-${faq.questions_id}`}>
                      <button
                        type="button"
                        className={`flex items-center justify-between w-full p-5 font-medium text-left  text-gray-700 dark:text-gray-200 border border-gray-300  dark:focus:ring-blue-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 gap-3 transition-colors duration-300 ${open === faq.questions_id
                            ? "bg-gray-100 dark:bg-gray-900 text-primary"
                            : ""
                          }`}
                        onClick={() => handleToggle(faq.questions_id)}
                        aria-expanded={open === faq.questions_id}
                        aria-controls={`accordion-collapse-body-${faq.questions_id}`}
                      >
                        <span>{faq.questions}</span>
                        <FaqAccordianSvg id={faq.questions_id} open={open} />
                      </button>
                    </h2>
                    <div
                      id={`accordion-collapse-body-${faq.questions_id}`}
                      className={`overflow-hidden transition-max-height duration-400  border border-t-0 border-gray-300 dark:border-gray-700 ${open === faq.questions_id
                          ? "max-h-screen p-5"
                          : "max-h-0"
                        }`}
                      aria-labelledby={`accordion-collapse-heading-${faq.questions_id}`}
                    >
                      <p className="text-gray-600 dark:text-gray-400">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container relative md:mt-24 mt-16 py-3 m-auto">
        <div className="grid grid-cols-1 text-center">
          <h3 className="mb-6 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold">
            {t("HaveQuestion")}
          </h3>
          <p className="text-slate-400 max-w-xl mx-auto">
            {t("HaveQuestionMessage")}
          </p>
          <div className="mt-6" onClick={() => router.push(contactUsUrl)}>
            <span className="py-2 cursor-pointer px-5 inline-flex items-center font-semibold tracking-wide align-middle duration-500 text-base text-center bg-primary text-white rounded-md me-2 mt-2">
              <svg width="40px" height="40px" viewBox="0 -575.5 2175 2175" fill="#000000" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M794.237409 315.518971L686.973759 424.659615c55.849818 124.031595 174.335431 262.186145 311.806983 308.564993l92.756698-92.501698s219.903283 38.357875 269.311121 62.463796c42.87986 20.735932 57.002814 66.773782 50.303836 123.605597-7.252976 61.097801-87.209716 195.711362-231.380245 197.204357-144.12753 1.449995-356.393838-107.135651-508.457342-267.391128-152.063504-160.169478-287.657062-363.305815-265.983132-535.763252C427.049607 48.339842 577.278117 17.535943 614.867994 14.762952c38.015876-2.773991 68.181778 8.361973 91.093703 36.73588C735.442601 88.063713 794.237409 315.518971 794.237409 315.518971M672.424807 87.167716c-17.877942-23.380924-48.597841-27.306911-79.317742-20.052935-27.305911 6.399979-126.761587 47.657845-140.84154 158.164484-15.615949 122.879599 76.031752 330.835921 240.468215 489.939402 164.479464 159.103481 322.942947 251.946178 459.134503 263.082142 136.191556 11.135964 202.623339-108.799645 212.351307-144.852527 9.684968-36.010883 1.663995-72.362764-17.919941-86.869717-24.916919-18.47394-239.14622-56.788815-239.14622-56.788815l-97.193683 95.786688c-159.829479-52.01083-310.313988-197.546356-374.356779-375.422776L741.757581 303.231011c-0.043 0-51.412832-192.724371-69.332774-216.063295" fill="white"></path></g></svg>
              {t("ContactUs")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
