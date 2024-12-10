import React from 'react'
import { confirmable, ConfirmDialog } from 'react-confirm';

export interface Props {
    okLabel?: string;
    cancelLabel?: string;
    title?: string;
    confirmation?: string;
    popupType?: string;
};

const Confirmation: ConfirmDialog<Props, boolean> = (props) => (
    props.show &&
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center" style={{ zIndex: "999" , backgroundColor:"#0000006b"}}>
        <div className="bg-white p-6 rounded-lg shadow-lg">
            {/* <div className="flex justify-center items-center mb-4">
                <span className="bg-green-100 text-green-500 rounded-full p-2">
                    ✔️
                </span>
            </div> */}
            <h2 className="text-xl font-bold text-center"> {props.title} </h2>
            <p className="text-gray-500 text-center mt-2 mb-6">
                {props.confirmation}
            </p>

            <div className="flex justify-center gap-4">
                <button
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                    onClick={() => props.proceed(false)}
                >
                    {props.okLabel || "Ok"}
                </button>
            </div>
        </div>
    </div>
);

export default confirmable(Confirmation);