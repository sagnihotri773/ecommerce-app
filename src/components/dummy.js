import {
  AccountSvg,
  AddWishListSvg,
  BillingInfoSvg,
  InvoiceSvg,
  PaymentSvg,
  SettingsSvg,
  SignOutSvg,
} from "./SvgFiles/SvgFile";
import { Package } from "lucide-react";

import {
  userAccountOrderUrl,
  userAccountUrl,
  userAddressUrl,
  userFavouriteUrl,
  userInvoiceUrl,
  userPaymentUrl,
  userSettingUrl,
  userShopingCartUrl,
  downloadableProductUrl,
} from "./RouteManager";

export const AddresArray = [
  {
    country: " Cartzio, U.S.A.",
    address: " 268 St, South New York/NY 98944, United States",
    phone: "+152 534-468-854",
    img: "https://cartzio.vercel.app/static/media/ab1.e4e2aa508b3a0454a18a.jpg",
  },
  {
    country: " Cartzio, U.S.A.",
    address: " 268 St, South New York/NY 98944, United States",
    phone: "+152 534-468-854",
    img: "https://cartzio.vercel.app/static/media/ab3.32b45bebeb700a3b45aa.jpg",
  },
  {
    country: " Cartzio, U.S.A.",
    address: " 268 St, South New York/NY 98944, United States",
    phone: "+152 534-468-854",
    img: "https://cartzio.vercel.app/static/media/ab4.16a16cadd249f93ba59f.jpg",
  },
];

export const userAccountMenu = [
  { title: "Account", value: userAccountUrl, icon: <AccountSvg /> },
  {
    title: "Orders",
    value: userAccountOrderUrl,
    icon: <AddWishListSvg className="me-2 mb-0" />,
  },
  {
    title: "DownloadableOrder",
    value: downloadableProductUrl,
    icon: <AddWishListSvg className="me-2 mb-0" />,
  },
  {
    title: "DefaultAddress",
    value: userAddressUrl,
    icon: <BillingInfoSvg />,
  },
  {
    title: "ShopingCart",
    value: userShopingCartUrl,
    icon: <Package className="h-5 w-4 mr-2" />,
  },
  {
    title: "Favourite",
    value: userFavouriteUrl,
    icon: <AddWishListSvg className="me-2 mb-0" />,
  },
  { title: "Settings", value: userSettingUrl, icon: <SettingsSvg /> },
  { title: "Payment", value: userPaymentUrl, icon: <PaymentSvg /> },
  { title: "Invoice", value: userInvoiceUrl, icon: <InvoiceSvg /> },
  {
    title: "Signout",
    icon: <SignOutSvg />,
  },
];
