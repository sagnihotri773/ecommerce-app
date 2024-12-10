'use client'
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from "react-hook-form";
import { useTranslations } from 'next-intl';
import { validateFields } from './Extra';
import dynamic from 'next/dynamic'
import { useSelector } from 'react-redux';
const UserField = dynamic(() => import('./UserField'), { ssr: false });
const AutoCompleteAddressForm = dynamic(() => import('@/components/Common/Address/AutoCompleteAddressForm'), { ssr: false });

export default function BillingAddresCheckout(props) {
    const [postcode, setPostcode] = useState('');
    const [formData, setFormData] = useState({});
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const [addressFields, setAddressFields] = useState({});
    const { onSubmit, address, editMode, isBillingLoading, onCancel } = props;
    const methods = useForm();
    const t = useTranslations("Checkout")
    const { register, handleSubmit, reset } = useForm();
    const [errors, setErrors] = useState({});
    const token = localStorage.getItem('token') || false;
    
    const { data } = useSelector((state) => state.customerData);

    useEffect(() => {
        setFirstName(data?.customer?.firstname);
        setLastName(data?.customer?.firstname);
    }, [data])

    const handleCallback = (data) => {
        if (data?.country || data?.country_code) {
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

    useEffect(() => {
        if (address?.city) {
            getAddressData(address)
        }
        return () => {
            setAddressFields({});
        };
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

  
    return (

        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit1)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                    }
                }}>
                <div className="grid lg:grid-cols-12 grid-cols-1 mt-6 gap-5">
                    <UserField
                        handleInput={handleInput}
                        firstName={firstName}
                        lastName={lastName}
                        errors={errors}
                        setFirstName={setFirstName}
                        setLastName={setLastName}
                    />

                    <AutoCompleteAddressForm callback={handleCallback} editMode={editMode} address={addressFields} changePinCode={changePinCode} errors={errors} handleInputChange={handleInputChange} />
                    <div className="flex mt-6 gap-2">
                        <button
                            className="bg-primary text-black text-lg px-4 py-1 rounded-md hover:bg-gray-400 text-white rounded-md"
                            type={"submit"}
                            disabled={isBillingLoading} >
                            {isBillingLoading ? t('Processing') : t('Continue')}
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
        </FormProvider >

    )
}
