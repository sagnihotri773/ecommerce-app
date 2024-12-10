import { useTranslations } from "next-intl";
import React from "react";

export default function ProductAdditionalInformation({ productsDetails }) {
const t=useTranslations("ProductDetail")  
  const configData = productsDetails?.items[0]?.configurable_options;
 
  const getLabels = (data) => {
    const label = data?.values?.map((value) => value.label) || []
    return label
  }

  const getValues = (data, fieldName) => {
    const value = data?.find((item) => item?.attribute_code === fieldName);
    return value
  }

  return (
    <table className="w-full text-start">
      <tbody>
        <tr className="bg-white dark:bg-slate-900">
          <td className="font-semibold pb-4" style={{ width: 100 }}>
            {t("Color")}
          </td>
          <td className="text-slate-400 pb-4">
            {getLabels(getValues(configData , 'color')).length > 0 ? (
              <div className="flex gap-3">
                {getLabels(getValues(configData , 'color')).map((colorLabel, index) => (
                  <span key={index} className="text-slate-400">
                    {colorLabel}
                  </span>
                ))}
              </div>
            ) : (
              <span>{t("NoColorsAvailable")}</span>
            )}
          </td>
        </tr>
        <tr className="bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-gray-700">
          <td className="font-semibold py-4">{t("Material")}</td>
          <td className="text-slate-400 py-4">
            {getValues(productsDetails?.aggregations , 'material')?.options?.length > 0 ? (
              <div className="flex gap-3">
                {getValues(productsDetails?.aggregations , 'material')?.options.map((item, index) => (
                  <span className="text-slate-400" key={index}>
                    {item?.label}
                  </span>
                ))}
              </div>
            ) : (
              <span>{t("NoMaterialsAvailable")}</span>
            )}
          </td>
        </tr>
        <tr className="bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-gray-700 align-baseline">
          <td className="font-semibold pt-4">{t("Size")}</td>
          <td className="text-slate-400 pt-4">
            {getLabels(getValues(configData , 'size')).length > 0 ? (
              <div className="flex gap-3">
                {getLabels(getValues(configData , 'size'))?.map((item, index) => (
                  <span key={index} className="text-slate-400">
                    {item}
                  </span>
                ))}
              </div>
            ) : (
              <span>{t("NoSizeAvailable")}</span>
            )}
          </td>
        </tr>
      </tbody>
    </table>
  );
}
