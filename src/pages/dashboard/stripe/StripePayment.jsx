import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useState } from "react";

// Load stripe outside of component render
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

export default function StripePayment() {
  const [amount, setAmount] = useState("");
  const [showCheckout, setShowCheckout] = useState(false);

  const handleProceed = (e) => {
    e.preventDefault();
    if (amount && amount > 0) {
      setShowCheckout(true);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Make a Payment</h1>

      {!showCheckout ? (
        <div className="max-w-md mx-auto">
          <form onSubmit={handleProceed} className="space-y-4">
            <div>
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Payment Amount ($)
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter amount"
                min="1"
                step="0.01"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Proceed to Payment
            </button>
          </form>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <button
              onClick={() => setShowCheckout(false)}
              className="text-blue-600 hover:text-blue-800"
            >
              ← Change Amount
            </button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Payment Summary</h2>
              <p className="text-gray-600">Amount to pay: ${amount}</p>
            </div>
            <Elements stripe={stripePromise}>
              <CheckoutForm amount={parseFloat(amount)} />
            </Elements>
          </div>
        </div>
      )}
    </div>
  );
}
