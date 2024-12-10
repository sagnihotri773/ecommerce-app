import { GET_PRODUCT } from '@/lib/graphql/queries/products';
import { removeItemFromCart } from '@/lib/redux/slices/cartSlice';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getDynamicData } from '../Util/commonGraphQuery';
import { openPopover } from '@/lib/redux/slices/popOverSlice';
import { Button } from '../ui/button';
import { Edit, Trash2 } from 'lucide-react';

export default function ActionButton({ val }) {
    const [updateProduct, setUpdateProduct] = useState({});
    const dispatch = useDispatch();
    const { cart_id: cartId } = useSelector((state) => state.customer);

    const removeCartItem = (cart_item_id) => {
        dispatch(removeItemFromCart({ cart_id: cartId, cart_item_id }));
    };

    const openProductPopover = async (item) => {
        if (item?.product?.sku !== updateProduct?.sku) {
            const products = await getDynamicData(GET_PRODUCT, { sku: item?.product?.sku });
            dispatch(openPopover({ ...products?.products?.items[0], type: 'Edit' }));
            setUpdateProduct({ ...products?.products?.items[0], type: 'Edit' })
        } else {
            dispatch(openPopover(updateProduct));
        }
    };

    return (
        <div className="flex justify-center gap-2 ">
            <Button variant="outline" size="icon" onClick={(e) => openProductPopover(val)}>
                <Edit size={20} />
            </Button>
            <Button variant="outline" size="icon" className='text-red-500' onClick={() => removeCartItem(val?.id)}>
                <Trash2 className="h-4 w-4" />
            </Button>
        </div>
    )
}
