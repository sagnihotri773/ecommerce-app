"use client";
import { InputNoBorder } from "@/components/Form/input-noborder";
import { SUBSCRIBE_EMAIL_TO_NEWSLETTER } from "@/lib/graphql/queries/newsLetter";
import { useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Subscribe = () => {

    const [subsScribeEmailToNewsLetter, { loading: newsLetterLoading }] =
        useMutation(SUBSCRIBE_EMAIL_TO_NEWSLETTER);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        subsScribeEmailToNewsLetter({
            variables: {
                email: data?.Subscribe,
            },
        })
            .then((res) => {
                toast.success("You have successfully subscribed to the newsletter!");
                reset()
            })
            .catch((error) => {
                toast.error(error?.message);
            });
    };
    return (
        <div className="flex flex-col items-center py-10 bg-white">
            <h2 className="text-5xl mb-2 mb-6 text-[#010101] leading-9">Subscribe</h2>
            <p className="text-center text-base leading-7 text-gray-600 m-0">
                Subscribe to our newsletter to receive news on update
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="text-center">
                    <div className="mt-9">
                        <div>
                            <InputNoBorder register={register} name={"Subscribe"} options={{ required: "This field is required" }} errors={errors} />
                        </div>
                        <button className="bg-[#070508] text-base hover:bg-primary border-none rounded-md text-white font-medium h-auto tracking-wider leading-none px-[55px] py-[17px] uppercase w-auto">
                            SUBSCRIBE
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};
