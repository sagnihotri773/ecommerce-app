import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripKey = process.env.NEXT_PUBLIC_STRIP_KEY;
const stripePromise = loadStripe(stripKey);

export default function Layout({ children }) {
    return (
        <>
            <Elements stripe={stripePromise}>
                {children}
            </Elements>
        </>

    )
}