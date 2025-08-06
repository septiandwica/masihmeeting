import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  getUserTranscriptions,
  deleteTranscription,
  downloadTranscriptionPDF,
} from "../../services/transcribeApi";
import { Download, Share2, Trash2, File, Youtube, Mic } from "lucide-react";

const TranscriptionList: React.FC = () => {
  const { user } = useAuth();
  const [recentTranscriptions, setRecentTranscriptions] = useState<any[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTranscriptionId, setSelectedTranscriptionId] = useState<
    string | null
  >(null);

  useEffect(() => {
    // Fetch user transcriptions on mount
    if (user?.id) {
      const fetchTranscriptions = async () => {
        try {
          const response = await getUserTranscriptions({
            userId: user.id,
            token: user.token || "",
          });
          const transcriptions = response.transcriptions;
          const sortedTranscriptions = transcriptions.sort(
            (a: any, b: any) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          setRecentTranscriptions(sortedTranscriptions);
        } catch (error) {
          console.error("Failed to fetch transcriptions:", error);
        }
      };
      fetchTranscriptions();
    }
  }, [user]);

  const openDeleteModal = (id: string) => {
    setSelectedTranscriptionId(id);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedTranscriptionId(null);
  };

  const handleDelete = async () => {
    if (!selectedTranscriptionId || !user?.token) return;

    try {
      await deleteTranscription(selectedTranscriptionId, user.token);
      setRecentTranscriptions((prev) =>
        prev.filter(
          (transcription) => transcription._id !== selectedTranscriptionId
        )
      );
      closeDeleteModal();
      alert("Transcription deleted successfully");
    } catch (error: any) {
      console.error("Error deleting transcription:", error);
      alert("Failed to delete transcription");
    }
  };
  const handleDownload = async (transcriptionId: string) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      await downloadTranscriptionPDF(transcriptionId, token);
    } catch (error) {
      const errorMessage = "Terjadi kesalahan saat mengunduh PDF transkrip";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            All Transcriptions
          </h1>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="px-6 py-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              All of your Transcriptions
            </h2>

            {/* Check if the number of cards exceeds 10 and apply scroll if necessary */}
            <div
              className={`${
                recentTranscriptions.length > 10
                  ? "max-h-96 overflow-y-auto"
                  : ""
              }`}
            >
              {recentTranscriptions.slice(0, 10).map((item) => (
                <Link
                  to={`/dashboard/transcription/${item._id}`}
                  key={item._id}
                >
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors my-4">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`p-2 rounded-lg ${
                          item.type === "youtube"
                            ? "bg-red-100 dark:bg-red-900/20"
                            : item.type === "upload"
                            ? "bg-purple-100 dark:bg-purple-900/20"
                            : "bg-blue-100 dark:bg-blue-900/20"
                        }`}
                      >
                        {item.type === "youtube" ? (
                          <Youtube className="h-5 w-5 text-red-600 dark:text-red-400" />
                        ) : item.type === "upload" ? (
                          <File className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                        ) : (
                          <Mic className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Duration: {Math.floor(item.duration / 60)}m{" "}
                          {item.duration % 60}s • Accuracy:{" "}
                          {item.quizResults && item.quizResults.percentage
                            ? `${(item.quizResults.percentage * 100).toFixed(
                                0
                              )}%`
                            : "Not taken yet"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleDownload(item._id)}
                        className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        <Share2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault(); // Prevent link navigation
                          e.stopPropagation(); // Prevent event from propagating to Link
                          openDeleteModal(item._id);
                        }}
                        className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Delete Confirmation Modal */}

        {isDeleteModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50 z-50 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Are you sure?
              </h2>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                Do you really want to delete this transcription? This action
                cannot be undone.
              </p>

              <div className="flex justify-end space-x-4">
                <button
                  onClick={closeDeleteModal}
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TranscriptionList;
