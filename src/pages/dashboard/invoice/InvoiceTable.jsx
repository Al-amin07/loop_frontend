/* eslint-disable react/prop-types */

import { useState } from "react";
import axios from "axios";
import InvoicePDFDownload from "./InvoicePDFDownload";
import { toast } from "react-toastify";

const InvoiceTable = ({ invoice, index }) => {
  const [invoiceData, setInvoiceData] = useState(null);

  //   const handleViewInvoice = async () => {
  //     // Fetching the invoice data from the backend
  //     try {
  //       const { data } = await axios.get(
  //         `${import.meta.env.VITE_API_URL}/config/invoice/${invoice?.id}`
  //       );
  //       console.log(data);
  //       setInvoiceData(data?.data); // Store the fetched invoice data
  //     } catch (error) {
  //       console.error("Error fetching invoice data:", error);
  //     }
  //   };

  const handleViewInvoice = async () => {
    try {
      console.log(invoice?.status);
      if (invoice?.status === "DRAFT") {
        toast.error(`${invoice?.status} Invoice. Can not see pdf`);
        return;
      }
      // Fetch the invoice data
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/config/invoice/${invoice?.id}`
      );

      // Check if the recipient view URL exists
      const recipientViewUrl = data?.data?.detail?.metadata?.recipient_view_url;

      if (recipientViewUrl) {
        window.open(recipientViewUrl, "_blank");
      } else {
        alert("Invoice PDF not available.");
      }
    } catch (error) {
      console.error("Error fetching invoice data:", error);
      alert("Failed to fetch invoice details.");
    }
  };

  return (
    <>
      <tr className="hover:bg-gray-50 ">
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">{index}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">{invoice.amount.value}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">
            {invoice.amount.currency_code}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">{invoice.status}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm truncate max-w-[200px] text-gray-900">
            {invoice.primary_recipients[0]?.billing_info?.email_address}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">
            {invoice.detail.invoice_date}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <button
            onClick={handleViewInvoice}
            className=" text-sm py-2 px-4 bg-blue-100 text-blue-600 rounded-2xl"
            // className="text-blue-500 underline"
          >
            View
          </button>
        </td>
      </tr>

      {/* {invoiceData && <InvoicePDFDownload invoice={invoiceData} />} */}
    </>
  );
};

export default InvoiceTable;
