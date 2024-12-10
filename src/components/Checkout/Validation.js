const STATUS = {
    ZERO: 0,
}
export const checkValidation = ({ cart, billingAddress, shippingAddress }) => {
    const token = localStorage.getItem('token');
    if (token) {
        if (cart?.items?.length === STATUS.ZERO) {
            return 'Please add item on cart'
        }
        if ([null, undefined, ''].includes(cart?.billing_address?.city)) {
            return 'Please add Billing Address'
        }
        if ([null, undefined, 0].includes(cart?.shipping_addresses?.length)) {
            return 'Please add Shipping Address'
        }
    } else if (!token) {
        if (cart?.items?.length === STATUS.ZERO) {
            return 'Please add item on cart'
        }
        if ([null, undefined, ''].includes(cart?.email)) {
            return 'Please Enter your email'
        }
        if ([null, undefined, ''].includes(cart?.billing_address?.city)) {
            return 'Please add Billing Address'
        }
        if ([null, undefined, 0].includes(cart?.shipping_addresses?.length)) {
            return 'Please add Shipping Address'
        }
    }
    if ([undefined, "", null].includes(cart?.shipping_addresses[0]?.selected_shipping_method?.method_code)) {
        return 'Please select Delivery Shipping Method'
    }
    return ''
}