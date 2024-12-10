"use client"
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DELETE_CUSTOMER_ADDRESS } from '@/lib/graphql/queries/customer';
import { GET_CUSTOMER_DATA } from '@/lib/graphql/queries/checkout';
import { useMutation, useQuery } from '@apollo/client';
import { confirm } from "@/components/Util/confirm";
import { toast } from 'react-toastify';
import dynamic from 'next/dynamic';
import AddresForm from '@/components/Common/Address/BillingAddresCheckout';
import { addAddressFunction, updateAddressFunction } from '@/components/Util/commonFunctions';

const PopoverLayout = dynamic(() => import("@/components/Layout/Popover"), { ssr: false });


export default function List() {
    const [addresses, setAddresses] = useState([])
    const [popoverOpen, setPopoverOpen] = useState(false);
    const [selectedAddress, setSlectedAddress] = useState({});
    const [isLoading, setIsLoading] = useState(false)
    const [deleteCustomerAddress] = useMutation(DELETE_CUSTOMER_ADDRESS);
    const { data: getCustomerData, refetch, loading, error } = useQuery(GET_CUSTOMER_DATA, {
        variables: {
            currentPage: 1,
        },
    });

    useEffect(() => {
        const filteredAddresses = findAddressesWithNoDefaults(getCustomerData?.customer?.addresses);
        setAddresses(filteredAddresses);
    }, [getCustomerData])

    useEffect(() => {

        return () => {
            setSlectedAddress({});
            setPopoverOpen(false);
        };
    }, [])

    const findAddressesWithNoDefaults = (addresses) => {
        return addresses?.filter(address =>
            address.default_billing === false && address.default_shipping === false
        );
    };

    const handleDelete = async (id) => {
        try {
            const confirmDelete = await confirm({
                title: "Delete Confirmation",
                confirmation:
                    "Are you sure you want to delete this address?",
            });
            if (confirmDelete) {
                const { data } = await deleteCustomerAddress({ variables: { id } });
                if (data.deleteCustomerAddress) {
                    toast.success("Address deleted successfully!");
                    refetch();
                } else {
                    toast.error("Failed to delete address.");
                }
            }
        } catch (error) {
            toast.error("Failed to remove item from the cart.");
        }
    };

    const popoverOpenHide = () => {
        setPopoverOpen(!popoverOpen)
        if (popoverOpen) {
            setSlectedAddress({});
        }
    }

    const handleBillingAddress = (data) => {

        if (![undefined, null, ""].includes(data?.id)) {
            const res = updateAddressFunction(data, getCustomerData, refetch);
            if (res.success) {
                updateState("billingAddress", true);

            } else {
                toast.error(res.message);
            }
        } else {
            const res = addAddressFunction(data, false, false, getCustomerData, refetch);


        }
    };

    const onCancel = () => {
        setPopoverOpen(!popoverOpen)
    }

    useEffect(() => {
        return () => {
            setAddresses({})

        };
    }, [])

    const editAddress = (id) => {
        const selectedAddress = addresses?.find((x) => x.id == id) || {}
        setSlectedAddress(selectedAddress);
        popoverOpenHide();
    }

    return (
        <div className="w-full md:px-4 px-1 py-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Address List</h2>
                <Button className='text-white' onClick={() => {
                    setSlectedAddress({});
                    popoverOpenHide();
                }}>
                    Add Address
                </Button>
            </div>
            {addresses?.length > 0 && (
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>First Name</TableHead>
                                <TableHead>Last Name</TableHead>
                                <TableHead>Street Address</TableHead>
                                <TableHead>Country</TableHead>
                                <TableHead>State</TableHead>
                                <TableHead>Zip/Postal Code</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {addresses?.map((address) => (
                                <>
                                    <TableRow key={address.id}>
                                        <TableCell>{address.firstname}</TableCell>
                                        <TableCell>{address.lastname}</TableCell>
                                        <TableCell>{address.street?.map((x) => x)}</TableCell>

                                        <TableCell>{address.country_code}</TableCell>
                                        <TableCell>{address.region?.region}</TableCell>
                                        <TableCell>{address.postcode}</TableCell>
                                        <TableCell>{address.telephone}</TableCell>
                                        <TableCell className="text-right space-x-2 md:space-x-4">
                                            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="text-blue-600 hover:text-blue-700"
                                                    onClick={() => editAddress(address.id)}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="text-red-600 hover:text-red-700"
                                                    onClick={() => handleDelete(address.id)}
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        </TableCell>

                                    </TableRow>
                                </>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
            <PopoverLayout closeLayout={() => popoverOpenHide()} openLayout={popoverOpen}>
                <div className="flex justify-center w-full h-full">
                    <div className="dropdown-menu absolute px-4 md:px-8 overflow-hidden md:top-[93px] end-0 m-0 mt-5 z-10 w-full rounded-md dark:bg-slate-900">
                        <div className="flex md:w-[80%] m-auto flex-wrap bg-white p-4 md:h-[698px] h-[578px] overflow-y-auto">
                            <section className="px-4 md:px-16">
                                <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                                    {selectedAddress?.id ? "Edit" : "New"} Address
                                </h2>
                                <AddresForm
                                    address={selectedAddress?.id ? selectedAddress : {}}
                                    onSubmit={handleBillingAddress}
                                    editMode={selectedAddress?.id != undefined ? true : false}
                                    onCancel={(e) => onCancel()}
                                    isBillingLoading={isLoading}
                                />
                            </section>
                        </div>
                    </div>
                </div>
            </PopoverLayout>
        </div>
    )
}
