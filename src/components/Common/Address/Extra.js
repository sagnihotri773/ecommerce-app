export const showAddress = (data= {}, fieldName) => {
    if (fieldName === 'street') {
        return data[fieldName]?.map((val) => val) + ' ,'
    } else if (fieldName === 'postcode') {
        return data[fieldName] || ""
    } else {
        return data[fieldName] + ' ,' || ''
    }
}

export const textFiledsClass = "w-full custom-select p-[10px] border-[1px] border-solid border-[#eee] leading-[26px] rounded-[10px]";


export const validateFields = (formData, firstName , lastName) => {
    const newErrors = {};
    const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    const streetValue = formData?.street?.length > 0 ? formData?.street[0] : formData?.street ? formData?.street : "";
    
    const region = ![undefined, null, 0].includes(formData.region_id) ? formData.region_id : formData?.region ? formData?.region : false;
    
    if (!firstName?.trim()) newErrors.firstName = "First name is required";
    if (!lastName?.trim()) newErrors.lastName = "Last name is required";
    if (!formData?.city?.trim()) newErrors.city = "City is required";
    if (!formData?.country?.trim()) newErrors.country = "Country is required";
    if (!formData?.postcode?.trim()) newErrors.postcode = "Postcode is required";
    // if (formData?.region) {
        if (!region ) newErrors.region = "State is required";
    // }
    if (!streetValue?.trim()) newErrors.street = "Address address is required";
    if (!formData?.telephone?.trim()) {
        newErrors.telephone = "Telephone is required";
    } else if (!phoneRegex.test(formData?.telephone.trim())) {
        newErrors.telephone = "Please enter a valid telephone number (e.g., +1234567890 )";
    }

    return newErrors;
}