import { useState } from "react";
import { toast } from "react-toastify";
import { MdOutlineDocumentScanner } from "react-icons/md";
import { useQuery, useMutation } from "@tanstack/react-query";
import api from "../../../services/api";
import { format } from "date-fns";
import Loading from "../../../loading/Loading";
import { FaEye } from "react-icons/fa";

export default function DocumentReview() {
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [url, setUrl] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);

  const {
    data: documents = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["documents"],
    queryFn: async () => {
      const { data } = await api.get(`/files`);
      return data?.data;
    },
  });

  const { mutate: updateStatus } = useMutation({
    mutationFn: async ({ docId, status, comments }) => {
      const { data } = await api.put(`/files/${docId}`, {
        status,
        comments,
      });
      return data;
    },
    onSuccess: () => {
      toast.success("Document status updated successfully");
      setShowViewModal(false);
      refetch();
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to update document status");
    },
  });

  const handleUpdateStatus = (docId, newStatus, comments = "") => {
    console.log({ docId, status: newStatus, comments });
    updateStatus({ docId, status: newStatus, comments });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-200/70 text-yellow-800";
      case "approved":
        return "bg-green-200/70 text-green-800";
      case "rejected":
        return "bg-red-200/70 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const viewDocument = (doc) => {
    // Convert buffer to base64
    const buffer = new Uint8Array(doc.data.data);
    const blob = new Blob([buffer], { type: doc.contentType });
    const url = URL.createObjectURL(blob);
    setUrl(url);
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Document Review</h1>

      {/* View Document Modal */}
      {showViewModal && selectedDoc && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-4xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Document Details</h2>
              <button
                onClick={() => {
                  setShowViewModal(false);
                  setSelectedDoc(null);
                }}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-3">
              {/* Document Info */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Document Type</p>
                  <p className="font-bold text-sm">{selectedDoc?.fileType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Uploaded By</p>
                  <p className="font-bold text-sm">
                    {selectedDoc.user_id?.fullName ||
                      selectedDoc.user_id?.email}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Upload Date</p>
                  <p className="font-bold text-sm">
                    {format(new Date(selectedDoc?.createdAt), "PP")}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-bold rounded-full ${getStatusColor(
                      selectedDoc?.status
                    )}`}
                  >
                    {selectedDoc?.status}
                  </span>
                </div>
              </div>

              {/* Document Preview */}
              <div className="border rounded-lg p-4">
                {selectedDoc.contentType?.includes("image") ? (
                  <img
                    src={url}
                    alt={selectedDoc?.fileName}
                    className="max-w-full h-auto mx-auto"
                  />
                ) : selectedDoc?.contentType === "application/pdf" ? (
                  <iframe
                    src={url}
                    className="w-full h-[60vh]"
                    title="PDF Preview"
                  />
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    Preview not available for this file type
                  </div>
                )}
              </div>

              {/* Action Buttons */}

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() =>
                    handleUpdateStatus(
                      selectedDoc?._id,
                      "rejected",
                      "Document does not meet requirements"
                    )
                  }
                  className="px-6 py-2 text-base bg-red-100 text-red-600 rounded-lg hover:bg-red-200 font-bold"
                >
                  Reject
                </button>
                <button
                  onClick={() =>
                    handleUpdateStatus(
                      selectedDoc?._id,
                      "approved",
                      "Document verified successfully"
                    )
                  }
                  className="px-6 py-2 text-base bg-green-100 text-green-600 rounded-lg hover:bg-green-200 font-bold"
                >
                  Approve
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Documents Table */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Document Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  File Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Upload Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {documents.map((doc) => (
                <tr key={doc?._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {doc.user_id?.fullName || doc.user_id?.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <MdOutlineDocumentScanner className="text-gray-500 mr-2" />
                      <span className="text-sm font-medium text-gray-900">
                        {doc.fileType}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {doc.fileName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        doc.status
                      )}`}
                    >
                      {doc?.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(new Date(doc?.createdAt), "PP")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      // onClick={() => viewDocument(doc)}
                      onClick={() => {
                        setSelectedDoc(doc);
                        viewDocument(doc);
                        setShowViewModal(true);
                      }}
                      className="text-blue-600 hover:text-blue-900 hover:bg-blue-50 px-3 py-1 rounded-lg flex items-center gap-2"
                    >
                      <FaEye /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
