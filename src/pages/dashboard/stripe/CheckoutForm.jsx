import { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import api from "../../../services/api";
import PropTypes from "prop-types";
import useAuth from "../../../hooks/useAuth";

export default function CheckoutForm({ amount, title, onSuccess, refetch }) {
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    try {
      // Create payment intent on the server
      const { data } = await api.post("/payments/client-secret", {
        amount: amount,
        title: title,
        user_id: user?._id,
      });

      const clientSecret = data.data;

      // Confirm payment with Stripe
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      if (error) {
        toast.error(error.message);
      } else if (paymentIntent.status === "succeeded") {
        toast.success("Payment request created successfully!");
        onSuccess && onSuccess();
      }
      const { data: paymentData } = await api.post("/payments", {
        amount: amount,
        title: title,
        user_id: user?._id,
      });
      console.log({ paymentData });
      refetch();
    } catch (err) {
      toast.error("Failed to create payment request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
      <div className="bg-white px-4 py-3 rounded-lg shadow-sm border">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
      </div>

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full text-base bg-orange-600 text-white py-2.5 px-4 rounded-lg hover:bg-orange-700 
        transition-colors disabled:bg-orange-400 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            Processing...
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </span>
        ) : (
          `Submit Payment Request ($${amount})`
        )}
      </button>
    </form>
  );
}

CheckoutForm.propTypes = {
  amount: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  onSuccess: PropTypes.func,
  refetch: PropTypes.func,
};
