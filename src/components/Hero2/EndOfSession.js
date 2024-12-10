import React from 'react';
import Hero2Banner from '@/assets/Images/hero2Banner.jpg';
import { Link } from "@/components/ui/Link";
import { shopUrl } from '../RouteManager';

export default function EndOfSession() {
    return (
        <section className="py-28 w-full table relative bg-center bg-no-repeat bg-cover" style={{ backgroundImage: `url(${Hero2Banner?.src})` }}>
            <div className="container relative">
                <div className="grid grid-cols-1 text-center">
                    <h3 className="font-semibold text-3xl leading-normal mb-4 text-white">
                        End of Season Clearance <br /> Sale upto 30%
                    </h3>
                    <p className="text-white/80 max-w-xl mx-auto">
                        Upgrade your style with our curated sets. Choose confidence, embrace
                        your unique look.
                    </p>
                    <div className="mt-6">
                        <Link href={shopUrl} prefetch={true} className="py-2 px-5 inline-block tracking-wide align-middle text-center bg-white text-primary rounded-md">
                            <i className="mdi mdi-cart-outline" /> Shop Now
                        </Link>
                    </div>
                </div>
            </div>
        </section>

    )
}
