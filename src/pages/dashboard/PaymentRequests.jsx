import { useState, useMemo } from "react";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../../services/api";
import Loading from "../../loading/Loading";
import { format } from "date-fns";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./stripe/CheckoutForm";
import PayNow from "./payment/PayNow";
// import PayNow from "./payment/PayNow";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export default function PaymentRequests() {
  const { user } = useAuth();

  const url = user?.role === "admin" ? "/payments" : `/payments/${user?._id}`;
  console.log({ user, url });
  const isAdmin = user?.role === "admin";
  const {
    data: requests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["requestss"],
    // enabled: !!user.role,
    queryFn: async () => {
      const { data } = await api.get(url);
      console.log({ data });
      return data.data;
    },
  });
  console.log({ requests });
  const { mutate: createRequest } = useMutation({
    mutationFn: async (payload) => {
      const { data } = await api.put(`/payments/${payload.id}`, {
        status: payload?.status,
      });
      return data.data;
    },
    onSuccess: (data) => {
      console.log({ data });
      toast.success(`Payment ${data?.status}  successfully`);
      refetch();
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to update status");
    },
  });

  const [showForm, setShowForm] = useState(false);
  const [newRequest, setNewRequest] = useState({
    title: "",
    amount: "",
  });

  const summary = useMemo(() => {
    return requests.reduce(
      (acc, request) => {
        const amount = Number(request.amount) || 0;
        acc.total += amount;

        switch (request.status) {
          case "pending":
            acc.pending += amount;
            break;
          case "approved":
            acc.approved += amount;
            break;
          case "rejected":
            acc.rejected += amount;
            break;
          default:
            break;
        }
        return acc;
      },
      { total: 0, pending: 0, approved: 0, rejected: 0 }
    );
  }, [requests]);

  const handleStatusChange = async (requestId, newStatus) => {
    createRequest({ id: requestId, status: newStatus });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-4">
      {isAdmin && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Payment Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-sm font-medium text-gray-500">
                Total Amount
              </h3>
              <p className="text-2xl font-bold text-blue-600">
                ${summary.total.toFixed(2)}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-sm font-medium text-gray-500">
                Pending Amount
              </h3>
              <p className="text-2xl font-bold text-yellow-600">
                ${summary.pending.toFixed(2)}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-sm font-medium text-gray-500">
                Approved Amount
              </h3>
              <p className="text-2xl font-bold text-green-600">
                ${summary.approved.toFixed(2)}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-sm font-medium text-gray-500">
                Rejected Amount
              </h3>
              <p className="text-2xl font-bold text-red-600">
                ${summary.rejected.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Payment Requests</h1>
        {!isAdmin && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-orange-600 text-white px-4 py-2 text-sm rounded-lg hover:bg-orange-700 transition-colors"
          >
            New Request
          </button>
        )}
      </div>

      {/* Payment Request Modal with Stripe */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white  p-6 rounded-lg w-full max-w-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">New Payment Request</h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-500 text-2xl hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              {/* Payment Form */}
              <form className="space-y-4">
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    required
                    value={newRequest.title}
                    onChange={(e) =>
                      setNewRequest({ ...newRequest, title: e.target.value })
                    }
                    className="w-full text-base border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="Enter request title"
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-1">
                    Amount
                  </label>
                  <input
                    type="number"
                    required
                    value={newRequest.amount}
                    onChange={(e) =>
                      setNewRequest({ ...newRequest, amount: e.target.value })
                    }
                    className="w-full text-base border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="Enter amount"
                    min="1"
                    step="0.01"
                  />
                </div>
                <button type="submit" className="w-full mt-2">
                  <PayNow details={newRequest} user={user} />
                </button>
              </form>

              {/* Stripe Payment Section */}
              <div className="border-t pt-6">
                {/* <Elements stripe={stripePromise}>
                  <CheckoutForm
                    refetch={refetch}
                    amount={Number(newRequest.amount) || 0}
                    title={newRequest.title || "Payment Request"}
                    onSuccess={() => {
                      setShowForm(false);
                      setNewRequest({ title: "", amount: "" });
                      refetch();
                    }}
                  />
                </Elements> */}
                {/* <button type="submit">
                  <PayNow />
                </button> */}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Requests Table */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-base font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                {isAdmin && (
                  <th className="px-6 py-3 text-left text-base font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                )}
                <th className="px-6 py-3 text-left text-base font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-base font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-base font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                {isAdmin && (
                  <th className="px-6 py-3 text-left text-base font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {requests?.map((request) => (
                <tr key={request._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {request.title}
                    </div>
                  </td>
                  {isAdmin && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {request.user_id?.fullName || request.user_id?.email}
                      </div>
                    </td>
                  )}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      ${Number(request.amount).toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-4 py-2 inline-flex text-sm leading-5 font-semibold rounded-full ${getStatusColor(
                        request.status
                      )}`}
                    >
                      {request.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(new Date(request.createdAt), "PP")}
                  </td>
                  {isAdmin && request.status === "pending" && (
                    <td className="px-6 py-4  whitespace-nowrap text-sm">
                      <button
                        onClick={() =>
                          handleStatusChange(request._id, "approved")
                        }
                        className="text-green-600 hover:text-green-900 hover:bg-green-200 px-3 py-1.5 rounded-lg font-bold mr-2"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() =>
                          handleStatusChange(request._id, "rejected")
                        }
                        className="text-red-600 hover:text-red-900 hover:bg-red-200 px-3 py-1.5 rounded-lg font-bold"
                      >
                        Reject
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
