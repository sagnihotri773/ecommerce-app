import { TransParentInput } from "@/components/Util/Form/transParentInput";
import { useForm } from "react-hook-form";
import { memo } from "react";

// Static data arrays - moved outside the component
const newsletterData = {
    title: "Newsletter Signup",
    description: "Sign up for exclusive offers, original stories, activism awareness, events, and more.",
    placeholder: "E-Mail *",
    buttonText: "Sign Me Up",
};

const helpItems = [
    "Help Center", "Order Status", "Size & Fit Guide", "Returns & Exchanges",
    "DIY Care & Repair", "Login", "Accessibility Statement"
];

const moreInfoItems = [
    "Patagonia Action Works™", "Patagonia Pro Program", "Patagonia Provisions®",
    "Our Acknowledgment", "Worn Wear®", "International Orders", "Events",
    "Group Sales", "1% For The Planet®", "Privacy Notice", "Gift Cards",
    "Statement on Modern Slavery in Supply Chain", "Find a Store", "Sitemap",
    "Careers", "UPF Recall", "Press", "Infant Product Recall"
];

const StyleThree = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        // Handle form submission logic here
    };

    return (
        <div className="p-8 text-white bg-gray-500 flex flex-col md:flex-row justify-between gap-8 relative">

            {/* Newsletter Signup Section */}
            <div className="flex-1 flex flex-col justify-start items-start min-h-[300px] bg-gray-700 p-6 rounded-lg shadow-lg">
                <h2 className="text-lg font-bold mb-4">{newsletterData.title}</h2>
                <p className="mb-6 text-base">{newsletterData.description}</p>
                <form className="flex flex-col w-full" onSubmit={handleSubmit(onSubmit)}>
                    <TransParentInput 
                        register={register} 
                        name="newsletter" 
                        options={{ required: "This field is required" }} 
                        errors={errors} 
                    />
                    <button type="submit" className="w-full py-2 bg-white text-gray-800 font-bold rounded-full mt-4 hover:bg-gray-200 transition duration-300">
                        {newsletterData.buttonText}
                    </button>
                </form>
            </div>

            {/* Help Center Section */}
            <div className="flex-1 min-h-[300px] bg-gray-700 p-6 rounded-lg shadow-lg flex flex-col justify-start">
                <h2 className="text-lg font-bold mb-4">Need Help?</h2>
                <div className="flex flex-wrap gap-4">
                    {helpItems.map((item) => (
                        <a
                            key={item}
                            href="#"
                            className="bg-gray-600 text-white text-center py-2 px-6 rounded-full hover:bg-gray-500 transition duration-300"
                        >
                            {item}
                        </a>
                    ))}
                </div>
                <p className="text-white mt-6">
                    If you are using a screen reader and having difficulty, please call us at <span className="font-bold">1-800-638-6464</span>
                </p>
                <p className="text-white mt-2">
                    <a href="#" className="underline">Do Not Sell or Share My Data</a>
                </p>
            </div>

            {/* More Info Section */}
            <div className="flex-1 min-h-[300px] bg-gray-700 p-6 rounded-lg shadow-lg">
                <h2 className="text-lg font-bold mb-4">More Info</h2>
                <ul className="space-y-2">
                    {moreInfoItems.map((item) => (
                        <li key={item}>
                            <a href="#" className="text-white hover:text-gray-300 text-left transition duration-300">
                                {item}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 text-center text-sm mt-10">
                © 2024 Patagonia, Inc. All Rights Reserved.
            </div>
        </div>
    );
};

// Memoize the component to avoid unnecessary re-renders
export default memo(StyleThree);
