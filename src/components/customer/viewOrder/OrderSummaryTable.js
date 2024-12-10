import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
const Price = dynamic(() => import('@/components/Currency/Price'), { ssr: false });

export const OrderSummaryTable=({customerOrderData})=>{
    const tableHeading = [
        { heading: "ProductName" },
        { heading: "Sku" },
        { heading: "Price" },
        { heading: "Qty" },
        { heading: "Subtotal" },
      ];

      const t=useTranslations("viewOrder")
    return(
        <>
        <div className="border border-[#cccccc] p-6 mb-10 overflow-auto">
          <table className="w-full">
            <thead className="border-b border-[#cccccc]">
              <tr>
                {tableHeading.map((item, index) => (
                  <th key={index} className="text-left text-base py-2 text-center border-[1px]">
                    {t(item.heading)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {customerOrderData?.items?.map((item, index) => (
                <tr key={index} className="leading-10">
                  <td className="align-top border-[1px] text-nowrap text-center" data-th="Product Name">
                    <span>{item?.product_name}</span>
                  </td>
                  <td className="align-top border-[1px] text-nowrap text-center" data-th="SKU">
                    {item?.product_sku}
                  </td>
                  <td className="align-top border-[1px] text-nowrap text-center" data-th="Price">
                    <Price amount={item?.product_sale_price?.value} />
                  </td>
                  <td className="align-top border-[1px] text-nowrap text-center">
                    <span>{item?.quantity_ordered}</span>
                  </td>
                  <td className="align-top border-[1px] text-nowrap text-center">
                    <Price
                      amount={
                        item?.quantity_ordered * item?.product_sale_price?.value
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-[#f5f5f5] py-4">
              <tr className="text-right">
                <th colSpan={4} className="pt-5" scope="row">
                  {t("Subtotal")}
                </th>
                <td className="pt-5">
                  <Price amount={customerOrderData?.total?.subtotal?.value} />
                </td>
              </tr>
              {customerOrderData?.total?.discounts?.length > 0 && (
                <tr className="text-right">
                  <th colSpan={4} className="pt-5" scope="row">
                    {t("Discount")}
                  </th>
                  <td className="pt-5">
                    -
                    <Price
                      amount={customerOrderData?.total?.discounts[0]?.amount?.value}
                    />
                  </td>
                </tr>
              )}
              <tr className="text-right">
                <th colSpan={4} className="pt-5" scope="row">
                  {t("Shipping")} &amp; {t("Handling")}
                </th>
                <td className="pt-5">
                  <Price
                    amount={
                      customerOrderData?.total?.shipping_handling?.total_amount?.value
                    }
                  />
                </td>
              </tr>
              <tr className="text-right">
                <th colSpan={4} className="pt-5" scope="row">
                  <span>{t("GrandTotal")}</span>
                </th>
                <td className="pt-5">
                  <strong>
                    <Price amount={customerOrderData?.total?.grand_total?.value} />
                  </strong>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        </>
    )
}