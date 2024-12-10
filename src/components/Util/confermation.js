import React from 'react';
import { confirmable, ConfirmDialog } from 'react-confirm';

const Confirmation = (props) => (
  props.show && (
    <div
      className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center"
      style={{ zIndex: '999', backgroundColor: '#0000006b' , padding:"0 10px"}}
    >
      <div className="bg-white p-4 rounded-lg shadow-lg block w-full max-w-sm flex items-center justify-center mr-5 ml-5">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            {/* <AlertTriangle className="h-6 w-6 text-red-500" /> */}
          </div>
          <div className="flex-grow">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">{props.title}</h2>
            <p className="text-sm text-gray-600 mb-6">{props.confirmation}</p>
            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => props.proceed(false)}
              >
                {props.cancelLabel || 'Cancel'}
              </button>
              <button
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                onClick={() => props.proceed(true)}
              >
                {props.okLabel || 'OK'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
);

export default confirmable(Confirmation);
