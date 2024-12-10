import { fetchCurrency } from "@/lib/redux/slices/currency";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Price = (props) => {
  const { amount = 0 } = props;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCurrency());
  }, []);

  const currency = useSelector((state) => ({ ...state.currency }));

  const rate =
    currency?.exchangeRates?.find(
      ({ currency_to }) => currency_to === currency.storeCurrency
    )?.rate || 1;

  let _currency = "USD";
  if (currency?.storeCurrency) {
    _currency = currency.storeCurrency;
  } else if ( typeof window !== "undefined" && localStorage.getItem("currency")) {
    _currency = localStorage.getItem("currency");
  }
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    // currency: currency.storeCurrency || "USD",
    currency: _currency,
    currencyDisplay: "symbol",
  }).format(amount * rate);

  if (!amount) {
    return <span className={props.className}>{formattedPrice} </span>;
  }

  return <span className={props.className}> {formattedPrice}</span>;
};

export default Price;
