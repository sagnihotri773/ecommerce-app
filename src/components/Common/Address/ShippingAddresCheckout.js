'use client'
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from "react-hook-form";
import { useTranslations } from 'next-intl';
import { textFiledsClass, validateFields } from './Extra';
import dynamic from 'next/dynamic'
import { useSelector } from 'react-redux';
const UserField = dynamic(() => import('./UserField'), { ssr: false });
const AutoCompleteAddressForm = dynamic(() => import('@/components/Common/Address/AutoCompleteAddressForm'), { ssr: false });

export default function ShippingAddresCheckout(props) {
    const t = useTranslations("Checkout")
    const [postcode, setPostcode] = useState('');
    const [formData, setFormData] = useState('');
    const [addressFields, setAddressFields] = useState({});
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const { onSubmit, address, editMode, isShippingLoading, onCancel } = props;
    const methods = useForm();
    const { register, handleSubmit } = useForm();
    const [errors, setErrors] = useState({});

    const { data } = useSelector((state) => state.customerData);
    const token = localStorage.getItem('token') || false;

    useEffect(() => {
        setFirstName(data?.customer?.firstname);
        setLastName(data?.customer?.firstname);
    }, [data])

    const handleCallback = (data) => {
        if (data?.country) {
            setFormData(data);
        }
    }

    const changePinCode = (val) => {
        setPostcode(val)
    }

    const onSubmit1 = (val) => {
        const formDataValues = ![null, undefined].includes(formData.region) ? { region: formData.region } : { region_id: formData.region_id };
        let obj = addressFields;
        delete obj.region;
        delete obj.region_id;
        if (formDataValues.region_id) {
            obj.region_id = formDataValues.region_id;
        } else {
            obj.region = formDataValues.region;
        }

        const validationErrors = validateFields(editMode ? { ...obj } : formData, firstName, lastName);
        if (Object.keys(validationErrors).length) {
            setErrors(validationErrors);
        } else {
            setErrors({});
            onSubmit({ ...val, ...formData, postcode: formData?.postcode || postcode, region: addressFields?.region, firstName: firstName, lastName: lastName })
        }
    }

    const handleInput = (setter, fieldName, value) => {
        setter(value);
        if (value.trim()) {
            setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: undefined }));
        }
    }

    const handleInputChange = (field, value) => {
        if (value.trim()) {
            setErrors((prevErrors) => ({ ...prevErrors, [field]: undefined }));
        }
    }


    useEffect(() => {
        getAddressData(address)
    }, [address])

    const getAddressData = (values) => {
        let value = {
            id: values?.id,
            city: values?.city,
            country: values?.country_code,
            country_code: values?.country_code,
            postcode: values?.postcode,
            street: values?.street,
            telephone: values?.telephone,
            default_shipping: values?.default_shipping,
            default_billing: values?.default_billing
        }
        if (token) {
            if (![null, undefined, ''].includes(values?.region?.region) && [null, undefined, ''].includes(values.region?.region_code)) {
                value = { ...value, region: values?.region?.region };
            } else if (![null, undefined, ''].includes(values?.region_id) && values.region?.region_code) {
                value = { ...value, region_id: values?.region_id };
            }
        } 
        else {
            if (![null, undefined, ''].includes(values?.region) && values?.region?.length !== 2 && !values?.region_id) {
                value = { ...value, region: values?.region };
            } else if (![null, undefined, 0].includes(values?.region_id)) {
                value = { ...value, region_id: values?.region_id };
            }
        }
        setAddressFields(value);
        setFirstName(values?.firstname);
        setLastName(values?.lastname);
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit1)} autocomplete="off"
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                    }
                }}>
                <div className="grid lg:grid-cols-12 grid-cols-1 mt-6 gap-5">
                    <UserField
                        setFirstName={setFirstName}
                        setLastName={setLastName}
                        firstName={firstName}
                        lastName={lastName}
                        errors={errors}
                        handleInput={handleInput}
                    />

                    <AutoCompleteAddressForm callback={handleCallback} editMode={editMode} address={addressFields} changePinCode={changePinCode} errors={errors} handleInputChange={handleInputChange} />
                    <div className="flex mt-6 gap-2">
                        <button
                            className="bg-primary text-black text-lg px-4 py-1 rounded-md hover:bg-gray-400 text-white rounded-md"
                            type={"submit"}
                            disabled={isShippingLoading} >
                            {isShippingLoading ? t('Processing') : t('Continue')}
                        </button>
                        {addressFields?.id && (
                        <button
                            className="bg-gray-300 text-black text-md px-4 py-1 rounded-md hover:bg-gray-400"
                            type="button"
                            onClick={onCancel}
                        >
                            {t('Cancel')}
                        </button>
                        )}
                    </div>
                </div>
            </form>
        </FormProvider>
    )
}
