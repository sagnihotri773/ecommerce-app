"use client"
import React, { useEffect, useState } from 'react'
import BillingAddresCheckout from '@/components/Common/Address/BillingAddresCheckout';
import { useTranslations } from 'next-intl';
import { GET_CUSTOMER_DATA } from '@/lib/graphql/queries/checkout';
import { useQuery } from '@apollo/client';
import { addAddressFunction, updateAddressFunction } from '@/components/Util/commonFunctions';
import ShippingBillingAddresses from '@/components/Common/Address/Address';
import ShippingAddresCheckout from '@/components/Common/Address/ShippingAddresCheckout';
import { toast } from 'react-toastify';
import AddressList from '@/components/customer/AddressList/List';

export default function page() {
    const [billingAddress, setBillingAddress] = useState({});
    const [shippingAddress, setShippingAddress] = useState({});
    const [isEditable, setIsEditable] = useState({
        billingAddress: false,
        shippingAddress: false,
    });
    const t = useTranslations("Address");

    const { data: getCustomerData, refetch } = useQuery(GET_CUSTOMER_DATA, {
        variables: {
            currentPage: 1,
        },
    });

    useEffect(() => {
        if (getCustomerData?.customer) {

            const address = getCustomerData?.customer?.addresses;
            const billAddres = address?.find((val) => val.default_billing === true);
            const shippAddres = address?.find((val) => val.default_shipping === true);

            if (billAddres?.id) {
                setBillingAddress(billAddres);
                updateState("billingAddress", true);
            } else if (!billAddres) {
                updateState("billingAddress", false);
            }
            if (shippAddres?.id) {
                setShippingAddress(shippAddres);
                updateState("shippingAddress", true);
            } else if (!shippAddres) {
                updateState("shippingAddress", false);
            }
        }
    }, [getCustomerData]);

    const handleBillingAddressFunction = () => {
        updateState("billingAddress", false);
    };

    const handleShippingAddressFunction = () => {
        updateState("shippingAddress", false);
    };

    const updateState = (fieldName, value) => {
        setIsEditable((prevState) => ({
            ...prevState,
            [fieldName]: value,
        }));
    };

    const handleBillingAddress = (data) => {
        if (![undefined, null, ""].includes(data?.id)) {
            const res = updateAddressFunction(data, getCustomerData, refetch);
            if (res.success) {
                updateState("billingAddress", true);
            } else {
                toast.error(res.message);
            }
        } else {
            addAddressFunction(data, true, false, getCustomerData, refetch);
        }
    };

    const handleShippingAddress = async (data) => {
        if (![undefined, null, ""].includes(data?.id)) {
            const res = await updateAddressFunction(data, getCustomerData, refetch);
            if (res.success) {
                updateState("shippingAddress", true);
            } else {
                toast.error(res.message);
            }
        } else {
            addAddressFunction(data, false, true, getCustomerData, refetch);
        }
    };

    const onCancel = (fieldName) => {
        updateState(fieldName, true);
    }

    return (
        <>
            <h6 className="text-slate-400 mb-0">
                {t("DefaultCheckoutAddresses")}
            </h6>
            {!isEditable?.shippingAddress ? (
                <>
                    <h3 className="text-2xl leading-normal font-semibold pt-5">
                        {t("ShippingAddress")}
                    </h3>
                    <ShippingAddresCheckout
                        address={shippingAddress}
                        onSubmit={handleShippingAddress}
                        editMode={shippingAddress?.id != undefined ? true : false}
                        onCancel={(e) => onCancel("shippingAddress")}
                    />
                </>
            ) : (
                <ShippingBillingAddresses
                    data={shippingAddress}
                    title={t("ShippingAddress")}
                    showHide={isEditable.shippingAddress}
                    headingTitle={true}
                    callback={(e) => handleShippingAddressFunction()}
                />
            )}

            {!isEditable?.billingAddress ? (
                <>
                    <h3 className="text-2xl leading-normal font-semibold pt-5">
                        {t("BillingAddress")}
                    </h3>
                    <BillingAddresCheckout
                        address={billingAddress}
                        onSubmit={handleBillingAddress}
                        editMode={billingAddress?.id != undefined ? true : false}
                        onCancel={(e) => onCancel('billingAddress')}
                    />
                </>
            ) : (
                <ShippingBillingAddresses
                    data={billingAddress}
                    title={t("BillingAddress")}
                    showHide={isEditable.billingAddress}
                    callback={(e) => handleBillingAddressFunction()}
                />
            )}
            <AddressList /> 
        </>
    )
}
