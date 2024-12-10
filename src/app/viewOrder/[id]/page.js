import OrderDeatils1 from "@/components/AfterOrderDeatils.js/orderDeatils2";

export default function ViewOrder({ guestOrderData = {} }) {

  return (
    <OrderDeatils1 guestOrderData={guestOrderData} />
  );
}
