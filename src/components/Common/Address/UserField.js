"use client";
import React from 'react';
import { textFiledsClass } from './Extra';
import { useTranslations } from 'next-intl';

export default function UserField({ setFirstName, setLastName, handleInput, firstName, lastName, errors }) {
    const FieldTitles = useTranslations("FieldTitles");    
    return (
        <>
            <div className="lg:col-span-6">
                <label htmlFor="firstName" className="form-label font-semibold">
                    {FieldTitles("FirstName")}: <span className="text-red-600">*</span>
                </label>
                <input
                    id="firstName"
                    type="text"
                    value={firstName}
                    className={textFiledsClass}
                    autoComplete="off"
                    name="firstName"
                    placeholder="Enter First Name"
                    onChange={(e) => handleInput(setFirstName, 'firstName', e.target.value)}
                    aria-describedby="firstNameError"
                />
                {errors.firstName && (
                    <p id="firstNameError" className="text-red-500">
                        {errors.firstName}
                    </p>
                )}
            </div>

            <div className="lg:col-span-6">
                <label htmlFor="lastName" className="form-label font-semibold">
                {FieldTitles("LastName")}: <span className="text-red-600">*</span>
                </label>
                <input
                    id="lastName"
                    type="text"
                    value={lastName}
                    autoComplete="off"
                    className={textFiledsClass}
                    name="lastName"
                    placeholder="Enter Last Name"
                    onChange={(e) => handleInput(setLastName, 'lastName', e.target.value)}
                    aria-describedby="lastNameError"
                />
                {errors.lastName && (
                    <p id="lastNameError" className="text-red-500">
                        {errors.lastName}
                    </p>
                )}
            </div>
        </>
    );
}
