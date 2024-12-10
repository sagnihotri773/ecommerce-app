import { NextResponse } from "next/server";
import {
  forgotPasswordConfirmUrl,
  forgotPasswordUrl,
  loginUrl,
  registerUrl,
  passwordResetSuccessUrl,
  userAccountUrl,
  userInvoiceUrl,
  userPaymentUrl,
  userSettingUrl,
  userAddressUrl,
  userFavouriteUrl,
  userAccountOrderUrl,
  downloadableProductUrl,
} from "./components/RouteManager";

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const pathname = req.nextUrl.pathname;

  const url = req.nextUrl.clone();
  const validPaths = [
    loginUrl,
    registerUrl,
    forgotPasswordUrl,
    "/sales/guest/form",
    passwordResetSuccessUrl,
    forgotPasswordConfirmUrl,
  ];
  if (token && validPaths.includes(url.pathname)) {
    url.pathname = `/`;
    return NextResponse.redirect(url);
  }

  const protectedPaths = [
    "/protected",
    "/another-protected-path",
    userAccountUrl,
    "/user-account/billing_info",
    userPaymentUrl,
    userInvoiceUrl,
    "/user-account/social_profile",
    userSettingUrl,
    "/user-account/notifications",
    userAddressUrl,
    userFavouriteUrl,
    userAccountOrderUrl,
    downloadableProductUrl
  ];
  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );

  if (isProtectedPath && !token) {
    const loginUrls = new URL(loginUrl, req.url);
    return NextResponse.redirect(loginUrls);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/:path*", "/protected", "/another-protected-path"],
};
