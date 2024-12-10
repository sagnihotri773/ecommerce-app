import Link from 'next/link';
import React from 'react';
import { UserStaticProfileSvg } from '../SvgFiles/SvgFile';
import { homeUrl } from '../RouteManager';

const skeletonArray = Array.from({ length: 5 });

export default function LoadingState() {
    return (
        <>
            {skeletonArray.map((_, i) => (
                <Link className="text-center hover:text-primary" href={homeUrl} key={i} passHref>
                    <UserStaticProfileSvg />
                    <span className="text-xl font-medium mt-3 block">
                        <div className="h-2.5 mx-auto bg-gray-300 rounded-full dark:bg-gray-700 max-w-[540px]" />
                    </span>
                </Link>
            ))}
        </>
    );
}
