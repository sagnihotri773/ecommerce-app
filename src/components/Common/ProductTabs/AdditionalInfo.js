import { useEffect, useState } from "react";

export default function AdditionalInfo ({ data }) {
    

    return (
        <>
            <ul className="flex flex-col space-y-2 p-9">
                {data?.configurable_options?.map((item) => (
                    <li key={item.attribute_id} className="border-gray-200 pb-2 flex">
                        <strong className="mr-6 min-w-[85px]">{item.label}:</strong>
                        <ul className="ml-4 flex gap-5">
                            {item.values.map((value) => (
                                <li key={value.value_index}>{value.label}</li>
                            ))}
                        </ul>
                    </li>
                ))}
                
                {/* Add the Material aggregation */}
                {data?.aggregations?.find(item => item.attribute_code === "material") && (
                    <li className="border-gray-200 pb-2 flex">
                        <strong className="mr-6 min-w-[85px]">Material:</strong>
                        <ul className="ml-4 flex gap-5">
                            {data?.aggregations?.find(item => item.attribute_code === "material")?.options?.map((option) => (
                                <li key={option.value}>{option.label}</li>
                            ))}
                        </ul>
                    </li>
                )}
            </ul>
        </>
    );
};
