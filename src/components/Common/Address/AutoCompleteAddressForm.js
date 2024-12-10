import React, { useState, useEffect } from "react";
import { usePlacesWidget } from "react-google-autocomplete";
import { useQuery } from "@apollo/client";
import { COUNTRIES } from '@/lib/graphql/queries/others';
import { PhoneInput } from "react-international-phone";
import 'react-international-phone/style.css';
import { useTranslations } from "next-intl";

const textFiledsClass = "w-full custom-select p-[10px] border-[1px] border-solid border-[#eee] leading-[26px] rounded-[10px]";
const selectOptionCss = ' mt-2 w-full p-[10px] h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0';

export default function AutocompleteAddressForm({
    address = {},
    callback,
    editMode,
    inputStyle = "",
    changePinCode,
    profilePage = false,
    inputFieldStyle = "",
    errors = {},
    handleInputChange
}) {
    const [autocomplete, setAutocomplete] = useState({ address });
    const [isEditMode, setIsEditMode] = useState(true);
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState(null);
    const [regions, setRegions] = useState([]);
    const [place, setPlace] = useState(null);
    const FieldTitles = useTranslations("FieldTitles")

    const { data: countryReq, loading: countryReqLoading } = useQuery(COUNTRIES);

    const key = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY;

    const { ref } = usePlacesWidget({
        apiKey: key,
        onPlaceSelected: (place) => {
            setPlace(place);
            setIsEditMode(false);
        },
    });
    const handleCountryChange = (country_code) => {
        setCountry(country_code);
        setAutocomplete((prevState) => ({
            ...prevState,
            country: country_code,
        }));
        // passData();
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        const redions = countries.find((x) => x.two_letter_abbreviation == value)?.available_regions || []
        if (name === 'country') {
            if (redions?.length > 0) {
                let array = [];
                array = [{ id: "", name: "---select---" }].concat(redions);
                setRegions(array);

            } else {
                setRegions([]);
            }
        }
        setAutocomplete((prevState) => {
            const newState = { ...prevState, [name]: value };
            if (name === 'region_id' && value && newState.region) {
                delete newState.region;
            }
            if (name === 'region' && value && newState.region_id) {
                delete newState.region_id;
            }
            if (name === 'country') {
                newState.region = ""; 
                newState.region_id = 0;
            }
            return newState;
        });
        handleInputChange(name, value)
        if (name == "postcode" && profilePage) {
            changePinCode(value);
        }
    };

    useEffect(() => {
        passData();
    }, [autocomplete]);

    const passData = () => {
        callback(autocomplete);
    };

    useEffect(() => {
        reloadRegions();
    }, [address?.country_code])

    const reloadRegions = () => {
        let tmp;
        if (editMode && isEditMode) {
            tmp = countryReq?.countries?.find((x) => x.id === address?.country_code);
        } else {
            tmp = countries.find((i) => i.id === country) || {};
        }
        // const tmp = countries.find(i => i.id === country) || {};
        if (tmp?.available_regions) {
            const add = [{ id: "", name: "---select---" }, ...tmp?.available_regions];
            setRegions(add || []);
        } else {
            setRegions([]);
        }
        
        if (!tmp?.available_regions) {
            setAutocomplete((prevState) => ({
                ...prevState,
                region: address?.region_id ? null :  address?.region  || null,
                region_id: address?.region_id || null,
            }));
        }
    };

    useEffect(() => {
        if (!countryReqLoading) {
            const country = [
                { value: "", full_name_english: "---select---" },
                ...countryReq?.countries,
            ];
            setCountries(country);
            handleCountryChange(address?.country);
        }
    }, [countryReqLoading]);

    useEffect(() => {
        if (place && Array.isArray(place.address_components)) {
            const components = place.address_components.reverse();
            let country = null,
                obj = {};
            for (let pl of components) {
                if (pl.types.includes("country")) {
                    country = pl.short_name;
                    obj.country = pl.short_name;
                    setCountry(country);
                }
                if (pl.types.includes("postal_code")) {
                    obj.postcode = pl.short_name;
                }
                if (pl.types.includes("administrative_area_level_2")) {
                    obj.city = pl.short_name;
                    obj.street = pl.short_name;
                }
                if (pl.types.includes("administrative_area_level_3")) {
                    obj.street = pl.short_name;
                }
                if (pl.types.includes("administrative_area_level_1")) {
                    const countri = countries.find((c) => c.id === country) || {};
                    if (countri.available_regions) {
                        var region = countri.available_regions.find(
                            (r) => r.code === pl.short_name
                        );
                        if (region) {
                            obj.region = region.code;
                            obj.region_id = region.id;
                        }
                    }
                }
            }
            const data = { ...autocomplete, ...obj };
            setAutocomplete(data);
            if (obj?.country !== "") {
                callback(data, region);
            }
        }
    }, [place]);

    useEffect(() => {
        //setAutocomplete({...autocomplete, region_id: autocomplete?.region_id});
    }, [regions]);


    useEffect(() => {
        if (countryReq) {
            reloadRegions();
        }
    }, [country]);

    useEffect(() => {
        if (address) {
            setAutocomplete(address);
        }
    }, [address]);


    useEffect(() => {
        return () => {
            setAutocomplete({});
        };
    }, []);

    
    return (
        <>
            <div className="lg:col-span-12">
                <label className="form-label font-semibold">
                    {FieldTitles("Address")}: <span className="text-red-600">*</span>
                </label>
                <input
                    value={autocomplete?.street || ""}
                    ref={ref}
                    autoComplete="off"
                    className={textFiledsClass}
                    name="street"
                    placeholder={"Enter Address Line 1"}
                    onChange={handleChange}
                />
                {errors.street && <p className="text-red-500">{errors.street}</p>}
            </div>

            <div className="lg:col-span-12">
                <label className="form-label font-semibold"> {FieldTitles("City")}: <span className="text-red-600">*</span> </label>
                <input
                    type="text"
                    autoComplete="off"
                    value={autocomplete?.city || ""}
                    name="city"
                    onChange={handleChange}
                    className={textFiledsClass}
                    placeholder={"Enter Address Line 2"}
                />
                {errors.city && <p className="text-red-500">{errors.city}</p>}
            </div>

            <div className="lg:col-span-6">
                <label className="font-semibold"> {FieldTitles("Country")}: <span className="text-red-600">*</span></label>
                <select className={selectOptionCss} value={autocomplete?.country || autocomplete?.country_code} name="country" onChange={handleChange} >
                    {countries.map((item, index) => {
                        return (
                            <option key={index} value={item.id}>
                                {item.full_name_english}
                            </option>
                        );
                    })}
                </select>
                {errors.country && <p className="text-red-500">{errors.country}</p>}
            </div>

            <div className="lg:col-span-6">
                <label className="font-semibold"> {FieldTitles("State")}: <span className="text-red-600">*</span> </label>
                {regions.length > 0 ?
                    <select className={selectOptionCss} value={autocomplete?.region_id} name='region_id' onChange={handleChange}>
                        {regions.map((item, index) => {
                            return (
                                <option key={index} value={item.id}>
                                    {item.name}
                                </option>
                            );
                        })}
                    </select>
                    :
                    <input
                        name="region"
                        autoComplete="off"
                        value={autocomplete?.region || ""}
                        onChange={handleChange}
                        className={textFiledsClass}
                    />
                }
                {errors.region && <p className="text-red-500">{errors.region}</p>}
            </div>

            <div className="lg:col-span-6">
                <label className="form-label font-semibold">
                    {FieldTitles("ZipCode")} : <span className="text-red-600">*</span>
                </label>
                <input
                    onChange={handleChange}
                    type="number"
                    value={autocomplete?.postcode || ''}
                    className={textFiledsClass}
                    placeholder="Zip:"
                    id="zipcode"
                    name="postcode"
                />
                {errors.postcode && <p className="text-red-500">{errors.postcode}</p>}
            </div>


            <div className="lg:col-span-6">
                <label className="form-label font-semibold">
                    {FieldTitles("PhoneNumber")} : <span className="text-red-600">*</span>
                </label>
                <PhoneInput
                    name="telephone"
                    className="mt-2"
                    onChange={(value) => handleChange({ target: { name: "telephone", value } })}
                    value={autocomplete?.telephone}
                    placeholder={"Phone Number"}
                />
                {errors.telephone && <p className="text-red-500">{errors.telephone}</p>}
            </div>
        </>
    );
}
