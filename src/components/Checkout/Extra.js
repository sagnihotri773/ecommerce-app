"use client"
import { useEffect, useState } from "react";

export const className ='w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0 mt-2"'

export const PAYMENT_STATUS = {
    PAYPAL: "paypal",
    STRIPE: "stripe"
}
export const showStreetAddres = (data, fieldName) => {
    if (data?.city) {
        return data[fieldName]?.map((val) => val) + ' ,'
    } return ' '
}

export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};


export const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};


export const addressFormate = (data) => {
    const { firstname = 'test', lastname = 'test', city, country, region, street, postcode, telephone } = data;
    const value = {
        firstname,
        lastname,
        country_code: country?.code,
        region_id: region?.region_id,
        telephone,
        street,
        region: region?.code,
        city,
        country: country?.code,
        postcode,
    }
    return value
}


export const addressFormateLoginUser = (data) => {
    const { firstname = 'test', lastname = 'test', city, country_code, region_id, street, postcode, telephone , id=0} = data;
    const value = {
        firstname,
        lastname,
        country_code: country_code ,
        region_id: region_id,
        telephone,
        street,
        // region: region?.code,
        city,
        country: country_code,
        postcode,
        id
    }
    return value
}