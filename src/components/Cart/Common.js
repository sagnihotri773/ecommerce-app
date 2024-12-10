import Link from "next/link"
import { CART_TYPE, truncateTitle } from "../Util/commonFunctions"
import dynamic from "next/dynamic";
const Price = dynamic(() => import('@/components/Currency/Price'), { ssr: false });


export const ConfigOption = ({ product }) => {
  return product?.product?.name ? <Link className="hover:text-muted-foreground" href={`/${product.product?.url_key}${product.product.url_suffix}`} as={`/${product.product?.url_key}${product.product?.url_suffix}`}>
    <span title={product?.product?.name} style={{ cursor: 'pointer' }}>
        {truncateTitle(product?.product?.name)}
      </span>
    <ul className="list-none list-disc">
      {product?.__typename === CART_TYPE.CONFIGURABLE ? product?.configurable_options.map((config, index) => (
        <li key={index}>
          {config.option_label}: ${config.value_label}
        </li>
      )) : product?.__typename === CART_TYPE.BUNDLECARTITEM ?
        product?.bundle_options.map((bundle, i) => (
          <li key={i}>
            {bundle.label} {bundle?.values?.map((val, index) => (
              <span key={index}>
                {val?.quantity}x {val.label} - <Price amount={val?.price} /> {index < bundle.values.length - 1 && ', '}
              </span>
            ))}
          </li>
        )) : null
      }
    </ul>
  </Link> : ''

}