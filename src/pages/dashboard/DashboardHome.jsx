import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import api from "../../services/api";
import Loading from "../../loading/Loading";

export default function DashboardHome() {
  const { user } = useAuth();
  const url = user?.role === "admin" ? "/payments" : `/payments/${user?._id}`;
  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["requests"],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await api.get(url);
      return data.data;
    },
  });
  if (isLoading) return <Loading />;
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Total Requests</h2>
          <p className="text-3xl font-bold text-blue-600">{requests?.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Pending</h2>
          <p className="text-3xl font-bold text-yellow-600">
            {requests?.filter((request) => request.status === "pending").length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Approved</h2>
          <p className="text-3xl font-bold text-green-600">
            {
              requests?.filter((request) => request.status === "approved")
                .length
            }
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Rejected</h2>
          <p className="text-3xl font-bold text-red-600">
            {
              requests?.filter((request) => request.status === "rejected")
                .length
            }
          </p>
        </div>
      </div>
    </div>
  );
}
