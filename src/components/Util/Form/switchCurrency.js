import React from "react";

const SimpleSelect = ({ data, value, onSelect , className}) => {
  return (
      <select
        value={value}
        onChange={(e) => onSelect(e.target.value)}
        className={` ${data?.length === 1 ? "!cursor-not-allowed" : ""} ${className ? 'text-black bg-transparent hover:text-secondary' : 'text-white bg-primary hover:bg-primary '} block cursor-pointer w-[60px] px-1 py-1 rounded-md focus:outline-none`}
        disabled={data?.length===1}
        aria-label="Choose Currency"
      >
        {data?.available_currency_codes?.map((item, idx) => (
          <option key={idx} value={item} className="cursor-pointer hover:bg-primary focus:border-primary">
            {item}
          </option>
        ))}
      </select>
  );
};

export default SimpleSelect;
