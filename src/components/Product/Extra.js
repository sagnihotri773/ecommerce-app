export const validateProductOptions = (product) => {
    let isValid = true;
    let errors = {};

    if (product.__typename === "ConfigurableProduct") {
        product.configurable_options.forEach((option) => {
            if (!selectedOptions[product.sku]) {
                isValid = false;
                errors[option.attribute_id] = `Please select a ${option.label}.`;
            }
        });
    }

    if (product.__typename === "BundleProduct") {
        product.items.forEach((item) => {
            if (!selectedOptions[product.sku]?.[item.option_id]) {
                isValid = false;
                errors[item.option_id] = `Please select an option for ${item.title}.`;
            }
        });
    }

    if (product.__typename === "GroupedProduct") {
        const allEmpty = product.items.every(
            (item) => !selectedOptions[product.sku]?.[item.product.sku]
        );
        if (allEmpty) {
            isValid = false;
            errors.general = "Please select at least one item.";
        }
    }

    if (!isValid) {
        setErrorMessages({
            ...errorMessages,
            [product.sku]: errors,
        });
    }

    return isValid;
};

export const getValueFind = (options, findWith, fieldName) => {
    return options?.find((val) => val[findWith] == fieldName);
  };

  export const getOtprionValue = (
    options,
    findWith,
    sku,
    fieldName,
    selectedOptions = {}
  ) => {
    return options?.find(
      (val) => val[findWith] == selectedOptions[sku][fieldName]
    )?.label;
  };
  

 export const OtherDetails = [
    { value: 0, title: "Description" },
    { value: 1, title: "AdditonalInformation" },
    { value: 2, title: "Review" },
  ];