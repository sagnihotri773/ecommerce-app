"use client";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { GET_CATEGORY } from "@/lib/graphql/queries/category";
import { getDynamicData } from "@/components/Util/commonGraphQuery";
import Category from "@/components/Category/Category";


export default function Index() {
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState("");
    const [loadingCat, setLoadingCat] = useState(true)
    // const targetDate = "2024-12-31T00:00:00";
    const dispatch = useDispatch();
  
    const fetchCategories = useCallback(async () => {
      const result = await getDynamicData(GET_CATEGORY, { search });
      setCategories(result?.categoryList[0]?.children || []);
      setLoadingCat(false);
    }, [search]);
  
   
    useEffect(() => {
      fetchCategories(); 
     
    }, [fetchCategories, dispatch]);
    return (
        <Category categories={categories} loading={loadingCat} />
    )
}
