import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { startLoading, stopLoading } from '@/lib/redux/slices/loadingSlice';

export default function LoadingBar() {
    const isLoading = useSelector((state) => state.loading.isLoading);

    return (
        isLoading ? (
            <div className="fixed top-0 left-0 w-full z-50">
                <div className="h-1 w-full bg-pink-100 overflow-hidden">
                    <div className="animate-progress w-full h-full bg-gradient-to-r from-primary to-primary origin-left-right"></div>
                </div>
            </div>
        ) : ''
    );
}
