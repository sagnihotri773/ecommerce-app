"use client";
import { GET_PRODUCTS } from "@/lib/graphql/queries/products";
import dynamic from "next/dynamic";
import { getDynamicData } from "@/components/Util/commonGraphQuery";
import { useCallback, useState, useEffect, useMemo, Suspense } from "react";

const NewArrival = dynamic(() => import('@/components/Product/NewArrival'), {
  ssr: false, // Prevent SSR for NewArrival for faster initial load
});
// const NewArrival = dynamic(() => import('@/components/Product/NewArrival'));

export default function Index() {
    const [products, setProducts] = useState(null);

   const fetchProducts = useCallback(async () => {
        const values = {
            search: '',
            filters: {},
            sortField: {},
            pageSize: "8",
            currentPage: "1",
        };
        const result = await getDynamicData(GET_PRODUCTS, values);
        setProducts(result?.products?.items?.slice(0, 8) || []);
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return (
        <Suspense fallback={'...loading'}>
            <NewArrival productsList={products} />
        </Suspense>
    );
};
