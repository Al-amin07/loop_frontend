import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import InvoiceTable from "./InvoiceTable";
import Loading from "../../../loading/Loading";
import { useState } from "react";

const Invoices = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const invoicesPerPage = 5; // Number of invoices per page

  const { data: invoices = [], isLoading } = useQuery({
    queryKey: ["invoice"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/config/invoice`
      );
      console.log(data);
      return data?.data?.items;
    },
  });

  if (isLoading) return <Loading />;

  // Pagination logic
  const indexOfLastInvoice = currentPage * invoicesPerPage;
  const indexOfFirstInvoice = indexOfLastInvoice - invoicesPerPage;
  const currentInvoices = invoices.slice(
    indexOfFirstInvoice,
    indexOfLastInvoice
  );

  const totalPages = Math.ceil(invoices.length / invoicesPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Invoices</h1>
      <div className="bg-white rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-base font-medium text-gray-500 uppercase tracking-wider">
                  Item No.
                </th>
                <th className="px-6 py-3 text-left text-base font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-base font-medium text-gray-500 uppercase tracking-wider">
                  Currency
                </th>
                <th className="px-6 py-3 text-left text-base font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-base font-medium text-gray-500 uppercase tracking-wider">
                  Recipient Email
                </th>
                <th className="px-6 py-3 text-left text-base font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-base font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentInvoices?.map((invoice, index) => (
                <InvoiceTable
                  key={invoice?.id}
                  invoice={invoice}
                  index={(currentPage - 1) * 5 + index + 1}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Pagination Controls */}
      {/* <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <p className="text-sm text-gray-700">
          Page {currentPage} of {totalPages}
        </p>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div> */}

      <div className="flex mt-10">
        <div className="flex  mx-auto   ">
          <button
            disabled={currentPage === 1}
            onClick={handlePreviousPage}
            className="px-4 py-2 mx-1 disabled:cursor-not-allowed text-gray-500 capitalize disabled:bg-slate-200 hover:bg-orange-500 hover:text-white bg-white rounded-md  dark:bg-gray-800 dark:text-gray-600"
          >
            <div className="flex items-center -mx-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-1 rtl:-scale-x-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>

              <span className="mx-1">previous</span>
            </div>
          </button>
          {Array.from({ length: totalPages }).map((el, ind) => (
            <button
              onClick={() => setCurrentPage(ind + 1)}
              key={el}
              className={`hidden px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform  rounded-md sm:inline dark:bg-gray-800 dark:text-gray-200 hover:bg-orange-500 dark:hover:bg-orange-500 hover:text-white dark:hover:text-gray-200 ${
                currentPage === ind + 1 && "bg-orange-500 text-white"
              }`}
            >
              {ind + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={handleNextPage}
            className="px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md dark:bg-gray-800 dark:text-gray-200 disabled:bg-slate-200 disabled:cursor-not-allowed hover:bg-orange-500 dark:hover:bg-orange-500 hover:text-white dark:hover:text-gray-200"
          >
            <div className="flex items-center -mx-1">
              <span className="mx-1">Next</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-1 rtl:-scale-x-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Invoices;
