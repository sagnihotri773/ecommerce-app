"use client"
import React, { useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import {
    updateCartItemsQuantity,
} from "@/lib/redux/slices/cartSlice";
import { useDispatch, useSelector } from 'react-redux';
import { Minus, Plus } from 'lucide-react';
import { Button } from '../ui/button';

export default function QuantityUpdate({ val, quantities, setQuantities }) {
    const { cart_id: cartId, cart } = useSelector((state) => state.customer);
    const dispatch = useDispatch();

    const debouncedUpdateCartItem = useDebouncedCallback((id, count) => {
        dispatch(updateCartItemsQuantity({ id, count, cartId }));
    }, 300);

    useEffect(() => {
        const initialQuantities = cart?.itemsV2?.items.reduce((acc, item) => {
            acc[item.id] = item.quantity;
            return acc;
        }, {});
        setQuantities(initialQuantities);
    }, [cart]);

    const handleInputChange = (id, value) => {
        setQuantities((prev) => ({
            ...prev,
            [id]: value,
        }));
        debouncedUpdateCartItem(id, value);
    };

    return (
        <div className="flex items-center justify-center">
            <Button variant="outline" size="icon" onClick={() => handleInputChange(val?.id, Math.max(0, (quantities[val?.id] || val?.quantity) - 1))}>
                <Minus size={10} className="h-4 w-4" />
            </Button>
            <input
                min={0}
                name="quantity"
                type="number"
                onChange={(e) => handleInputChange(val?.id, Number(e.target.value))}
                className="h-9 inline-flex text-base rounded-md w-10 text-center  quantity mx-1"
                value={quantities[val.id] || val?.quantity}
            />
            <Button variant="outline" size="icon" onClick={() => handleInputChange(val?.id, (quantities[val?.id] || val?.quantity) + 1)}>
                <Plus size={10} className="h-4 w-4" />
            </Button>
        </div>
    )
}