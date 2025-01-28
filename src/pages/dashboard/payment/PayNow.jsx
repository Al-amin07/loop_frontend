import axios from "axios";
import React from "react";

import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const PayNow = ({ details, user }) => {
  const navigate = useNavigate();
  const initialOptions = {
    clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
  };

  const onCreateOrder = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/config/paypal`,
        { ...details }
      );
      console.log({ data });
      return data?.orderId;
    } catch (error) {
      console.log("Error at creating order", error?.message);
    }
  };

  const onApproved = async (data) => {
    console.log("Order data", data);
    try {
      const orderId = data?.orderID;
      if (!orderId) {
        throw new Error("Invalid Order id");
      }
      const { data: orderData } = await axios.get(
        `${import.meta.env.VITE_API_URL}/config/capture-payment/${orderId}`
      );
      console.log(orderData);
      toast.success("Payment Successfull");
      navigate("/complete-order");
    } catch (error) {
      console.log("Error at verifing order", error);
      toast.error(error?.message);
      navigate("/cancle-order");
    }
  };
  const onError = (error) => {
    console.log("Error in onerror", error);
    navigate("/cancle-order");
  };
  return (
    <PayPalScriptProvider
      options={{ clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID }}
    >
      <PayPalButtons
        disabled={!details?.title || !details?.amount}
        onApprove={onApproved}
        onError={onError}
        createOrder={onCreateOrder}
        fundingSource="paypal"
        style={{ shape: "pill", layout: "vertical" }}
      />
    </PayPalScriptProvider>
  );
};

export default PayNow;
