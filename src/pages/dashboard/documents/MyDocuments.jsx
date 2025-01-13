import { useState } from "react";
import { toast } from "react-toastify";
import { FiUpload } from "react-icons/fi";
import { MdOutlineDocumentScanner } from "react-icons/md";
import useAuth from "../../../hooks/useAuth";
import api from "../../../services/api";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../loading/Loading";
import { format } from "date-fns";

export default function MyDocuments() {
  const { user } = useAuth();
  const {
    data: documents = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["documents", user?._id],
    queryFn: async () => {
      const { data } = await api.get(`/files/user/${user?._id}`);
      console.log({ data: data?.data });
      return data?.data;
    },
  });

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newDocument, setNewDocument] = useState({
    type: "ID Card",
    file: null,
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Check file type
      const validTypes = ["application/pdf", "image/jpeg", "image/png"];
      if (!validTypes.includes(file.type)) {
        toast.error("Please upload PDF, JPG, or PNG files only");
        return;
      }
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size should be less than 5MB");
        return;
      }
      setNewDocument({ ...newDocument, file });
    }
  };
  console.log({ newDocument });
  const handleUpload = async (e) => {
    e.preventDefault();

    try {
      const user_id = user?._id;
      const fileName = newDocument.type;
      const contentType = newDocument?.file?.type;

      const formData = new FormData();
      formData.append("user_id", user_id);
      formData.append("fileType", fileName);
      formData.append("fileName", newDocument.file.name);
      formData.append("contentType", contentType);
      formData.append("data", newDocument.file);
      const { data } = await api.post("/files", formData);
      console.log({ data });
      refetch();
      setShowUploadModal(false);
      setNewDocument({ type: "ID Card", file: null });
      toast.success("Document uploaded successfully");
    } catch (error) {
      toast.error(error?.message || "Failed to upload document");
    }
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Documents</h1>
        <button
          onClick={() => setShowUploadModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <FiUpload />
          Upload Document
        </button>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Upload Document</h2>
            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Document Type
                </label>
                <select
                  name="document-type"
                  value={newDocument.type}
                  onChange={(e) =>
                    setNewDocument({ ...newDocument, type: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="ID Card">ID Card</option>
                  <option value="Image">Image</option>
                  <option value="Proof of Address">Proof of Address</option>
                  <option value="Bank Statement">Bank Statement</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Document File
                </label>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  className="w-full"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Accepted formats: PDF, JPG, PNG (max 5MB)
                </p>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Documents List */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
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
                  Comments
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {documents.map((doc) => (
                <tr key={doc?._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <MdOutlineDocumentScanner className="text-gray-500 mr-2" />
                      <span className="text-sm font-medium text-gray-900">
                        {doc?.fileType}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {doc.fileName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        doc?.status
                      )}`}
                    >
                      {doc?.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(new Date(doc?.createdAt), "PP")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {doc?.comments || "No comments"}
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
