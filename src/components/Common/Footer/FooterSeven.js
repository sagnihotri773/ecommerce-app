"use client";

import { useState, useEffect } from "react";
import { contactUsUrl, userAccountUrl } from "@/components/RouteManager";
import { StoreLogo } from "../StoreLogo/StoreLogo";
import CopyRight from "./copyRight";
import dynamic from "next/dynamic";

const BackToTop = dynamic(() => import('./backToTop'), { ssr: true });

function FooterSkeleton() {
  return (
    <footer className="bg-slate-200 py-12 border-t md:h-[400px]">
      <div className="container px-4 md:px-5 m-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 animate-pulse">
          <div className="space-y-6 w-full flex flex-col items-center">
            <div className="h-6 bg-gray-300 rounded w-1/4"></div>
            <div className="space-y-4 w-full">
              <div className="h-4 bg-gray-300 rounded w-1/4 mb-6"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/4 mb-6"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            </div>
          </div>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-4">
              <div className="h-6 bg-gray-300 rounded w-1/4 mb-8"></div>
              <div className="h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-t-[#444444] space-y-4">
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        </div>
      </div>
    </footer>
  );
}

export default function FooterSeven() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay (replace with real loading logic if needed)
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return isLoading ? (
    <FooterSkeleton />
  ) : (
    <footer className="bg-slate-200 py-12 border-t md:h-[400px]">
      <div className="container px-4 md:px-5 m-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-6 w-full md:w-5/5">
            <div className="text-2xl font-bold">
              <StoreLogo />
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold mb-2">Address</h3>
              <p className="text-sm text-muted-foreground">
                Level 13, 2 Elizabeth St,
                Melbourne, Victoria 3000,
                Australia
              </p>
              <h3 className="font-semibold mb-2">Working time</h3>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>Monday - Friday: 09:00 AM - 06:00 PM</p>
                <p>Saturday: 07:00 AM - 08:00 PM</p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href={userAccountUrl}
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  My Account
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                  Gift Cards
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                  Accessibility
                </a>
              </li>
              <li>
                <a
                  href="/help-center"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Need Help?
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Information</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href={"/about-us"}
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href={contactUsUrl}
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                  Sitemap
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                  Tracking Order
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                  Payment Methods
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/privacy-policy"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                  Shipping
                </a>
              </li>
              <li>
                <a
                  href="/returns-and-refunds-policy"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Returns and Refunds Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                  Cancellation & Modification
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-t-[#444444] text-start text-sm text-muted-foreground">
          <CopyRight className={'test-start'} />
        </div>
      </div>
      <BackToTop />
    </footer>
  );
}
