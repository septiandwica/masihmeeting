import React from "react";
import { Download, Share2, Play } from "lucide-react";

interface FileItem {
  id: string;
  name: string;
  duration: string;
  type: "audio" | "video" | "document";
}

interface RecentFilesProps {
  files: FileItem[];
}

const getFileIcon = (type: string) => {
  switch (type) {
    case "audio":
      return <div className="w-6 h-6 bg-purple-500 rounded"></div>;
    case "video":
      return <Play size={16} className="text-red-500" />;
    default:
      return <div className="w-6 h-6 bg-blue-500 rounded"></div>;
  }
};

export const RecentFiles: React.FC<RecentFilesProps> = ({ files }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Files</h3>
      <div className="space-y-3">
        {files.map((file) => (
          <div
            key={file.id}
            className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                {getFileIcon(file.type)}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{file.name}</p>
                <p className="text-xs text-gray-500">
                  Duration: {file.duration}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
                <Download size={16} />
              </button>
              <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
                <Share2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
