'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Bg3 from '@/assets/Images/bg3.png';
import { shopUrl } from '@/components/RouteManager';
import Image from 'next/image';
import bgImage from "@/assets/Images/bg-shape.png";

const timerClass = "mx-1 text-[28px] leading-[72px] h-[80px] w-[80px] bg-gray-700 font-medium rounded-md shadow shadow-gray-100 inline-block text-center text-white";
export default function index({}) {
    const [targetDate, setTargetDate] = useState("2024-12-31T00:00:00");

    const calculateTimeLeft = () => {
        const difference = +new Date(targetDate) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState({});
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    if (!mounted) {
        return null; // Return null on the first render to avoid mismatch
    }

    return (
        <div className="container-fluid relative md:mt-24 mt-16">
            <div className="grid grid-cols-1">
            <div className="relative overflow-hidden md:py-24 py-2 px-4 md:px-10 bg-orange-600 bg-center bg-no-repeat bg-cover">
    {/* Background layer */}
    <div className="absolute inset-0 bg-center bg-no-repeat bg-cover pointer-events-none">
        <Image
            src={bgImage.src}
            alt="Overlay background"
            layout="fill"
            objectFit="cover"
            quality={75}
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 50vw"
        />
    </div>
    <div className="grid grid-cols-1 justify-center text-center relative">
        <h3 className="text-4xl leading-normal tracking-wide font-bold text-white">
            End of Season Clearance <br /> Sale upto 30%
        </h3>
        <div id="countdown" className="mt-6">
            <ul className="count-down list-none inline-block">
                <li className={timerClass}>
                    {timeLeft?.days || '0'}
                    <p className="count-head block text-sm tracking-wider leading-5 relative uppercase -translate-y-6">Days</p>
                </li>
                <li className={timerClass}>
                    {timeLeft?.hours || '0'}
                    <p className="count-head block text-sm tracking-wider leading-5 relative uppercase -translate-y-6">Hours</p>
                </li>
                <li className={timerClass}>
                    {timeLeft?.minutes || '0'}
                    <p className="count-head block text-sm tracking-wider leading-5 relative uppercase -translate-y-6">Mins</p>
                </li>
                <li className={timerClass}>
                    {timeLeft?.seconds || '0'}
                    <p className="count-head block text-sm tracking-wider leading-5 relative uppercase -translate-y-6">Secs</p>
                </li>
            </ul>
        </div>
        <div className="mt-4">
            <Link
                className="py-2 px-5 inline-block font-semibold tracking-wide align-middle text-center bg-white text-black rounded-md"
                href={shopUrl}
                as={shopUrl}
            >
                <i className="mdi mdi-cart-outline" /> Shop Now
            </Link>
        </div>
    </div>
    {/* Preload the main background image */}
    <link rel="preload" href={Bg3.src} as="image" />
    {/* Main background */}
    <div className="absolute inset-0 pointer-events-none">
        <Image
            src={Bg3.src}
            alt="Main background"
            layout="fill"
            objectFit="cover"
            quality={75}
            priority
            sizes="100vw"
        />
    </div>
</div>

            </div>
        </div>
    );
}
