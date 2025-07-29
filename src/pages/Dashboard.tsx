import React, { useState, useRef } from "react";
import {
  Mic,
  FileText,
  Users,
  BarChart3,
  Download,
  Share2,
  Clock,
  Upload,
  Youtube,
  File,
  X,
  CheckCircle,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import SummaryChat from "./SummaryChat";

interface UploadedFile {
  id: string;
  name: string;
  type: "audio" | "video" | "youtube";
  size?: string;
  duration?: string;
  status: "processing" | "completed" | "error";
  progress?: number;
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = (files: FileList) => {
    Array.from(files).forEach((file) => {
      if (file.type.startsWith("audio/") || file.type.startsWith("video/")) {
        const newFile: UploadedFile = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          name: file.name,
          type: file.type.startsWith("audio/") ? "audio" : "video",
          size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
          status: "processing",
          progress: 0,
        };

        setUploadedFiles((prev) => [...prev, newFile]);

        // Simulate processing
        simulateProcessing(newFile.id);
      }
    });
  };

  const simulateProcessing = (fileId: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        setUploadedFiles((prev) =>
          prev.map((file) =>
            file.id === fileId
              ? {
                  ...file,
                  status: "completed",
                  progress: 100,
                  duration: "2:34",
                }
              : file
          )
        );
        clearInterval(interval);
      } else {
        setUploadedFiles((prev) =>
          prev.map((file) =>
            file.id === fileId ? { ...file, progress } : file
          )
        );
      }
    }, 200);
  };

  const handleYoutubeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (youtubeUrl.trim()) {
      const newFile: UploadedFile = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: "YouTube Video",
        type: "youtube",
        status: "processing",
        progress: 0,
      };

      setUploadedFiles((prev) => [...prev, newFile]);
      setYoutubeUrl("");
      simulateProcessing(newFile.id);
    }
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, {user?.name}!
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Upload your audio/video files or record directly to get accurate
            transcriptions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-lg rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                    <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <div className="ml-4 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Total Transcriptions
                    </dt>
                    <dd className="text-2xl font-bold text-gray-900 dark:text-white">
                      142
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-lg rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                    <Clock className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <div className="ml-4 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Hours Transcribed
                    </dt>
                    <dd className="text-2xl font-bold text-gray-900 dark:text-white">
                      24.5
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-lg rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
                <div className="ml-4 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Team Members
                    </dt>
                    <dd className="text-2xl font-bold text-gray-900 dark:text-white">
                      8
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-lg rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                  </div>
                </div>
                <div className="ml-4 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Accuracy Rate
                    </dt>
                    <dd className="text-2xl font-bold text-gray-900 dark:text-white">
                      99.2%
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="gap-8 mb-8">
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Upload Files
            </h2>

            <div
              className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                dragActive
                  ? "border-blue-400 bg-blue-50 dark:bg-blue-900/20"
                  : "border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-400"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="audio/*,video/*"
                onChange={(e) => e.target.files && handleFiles(e.target.files)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Drop your files here
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                or click to browse (MP3, MP4, WAV, MOV)
              </p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                <File className="mr-2 h-4 w-4" />
                Choose Files
              </button>
            </div>

            <div className="mt-6">
              <form onSubmit={handleYoutubeSubmit} className="flex gap-3">
                <div className="flex-1">
                  <div className="relative">
                    <Youtube className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="url"
                      value={youtubeUrl}
                      onChange={(e) => setYoutubeUrl(e.target.value)}
                      placeholder="Paste YouTube URL here..."
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
                >
                  Process
                </button>
              </form>
            </div>
          </div>
        </div>

        {uploadedFiles.length > 0 && (
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Processing Files
            </h2>
            <div className="space-y-4">
              {uploadedFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex items-center space-x-4 flex-1">
                    <div
                      className={`p-2 rounded-lg ${
                        file.type === "youtube"
                          ? "bg-red-100 dark:bg-red-900/20"
                          : file.type === "video"
                          ? "bg-purple-100 dark:bg-purple-900/20"
                          : "bg-blue-100 dark:bg-blue-900/20"
                      }`}
                    >
                      {file.type === "youtube" ? (
                        <Youtube className="h-5 w-5 text-red-600 dark:text-red-400" />
                      ) : (
                        <File
                          className={`h-5 w-5 ${
                            file.type === "video"
                              ? "text-purple-600 dark:text-purple-400"
                              : "text-blue-600 dark:text-blue-400"
                          }`}
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                        {file.name}
                      </h3>
                      <div className="flex items-center space-x-4 mt-1">
                        {file.size && (
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {file.size}
                          </p>
                        )}
                        {file.duration && (
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Duration: {file.duration}
                          </p>
                        )}
                        <div className="flex items-center space-x-2">
                          {file.status === "processing" && (
                            <>
                              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                              <span className="text-xs text-blue-600 dark:text-blue-400">
                                Processing... {Math.round(file.progress || 0)}%
                              </span>
                            </>
                          )}
                          {file.status === "completed" && (
                            <>
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="text-xs text-green-600 dark:text-green-400">
                                Completed
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      {file.status === "processing" && (
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1.5 mt-2">
                          <div
                            className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                            style={{ width: `${file.progress || 0}%` }}
                          ></div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {file.status === "completed" && (
                      <>
                        <button className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                          <Download className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                          <Share2 className="h-4 w-4" />
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => removeFile(file.id)}
                      className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Transcriptions */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="px-6 py-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Recent Transcriptions
            </h2>
            <div className="space-y-4">
              {[
                {
                  id: 1,
                  title: "Team Standup - March 15",
                  duration: "15:30",
                  accuracy: "99.1%",
                  type: "recording",
                },
                {
                  id: 2,
                  title: "Client Call - ProjectX.mp3",
                  duration: "45:20",
                  accuracy: "98.8%",
                  type: "upload",
                },
                {
                  id: 3,
                  title: "Board Meeting Q1 Review",
                  duration: "1:20:15",
                  accuracy: "99.5%",
                  type: "recording",
                },
                {
                  id: 4,
                  title: "Product Demo - YouTube",
                  duration: "32:45",
                  accuracy: "99.2%",
                  type: "youtube",
                },
              ].map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
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
                        <Link to="/SummaryChat" className="hover:underline">
                          {item.title}
                        </Link>
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Duration: {item.duration} • Accuracy: {item.accuracy}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      <Download className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
