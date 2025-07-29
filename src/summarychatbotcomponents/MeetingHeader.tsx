import React from "react";
import { FileText, Trash2 } from "lucide-react";

interface MeetingHeaderProps {
  title: string;
  date: string;
  duration?: string;
}

export const MeetingHeader: React.FC<MeetingHeaderProps> = ({
  title,
  date,
  duration,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg px-12 py-6 mb-6">
      <div className="flex items-center justify-between">
        {/* Left side - Icon and content */}
        <div className="flex items-center space-x-3">
          {/* Blue file icon */}
          <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
            <FileText className="w-4 h-4 text-white" />
          </div>

          {/* Title and date */}
          <div>
            <h1 className="text-sm font-medium text-gray-900">{title}</h1>
            <p className="text-xs text-gray-500 flex items-center">📅 {date}</p>
          </div>
        </div>

        {/* Right side - Delete button */}
        <div className="flex items-center">
          <button className="w-8 h-8 bg-red-50 hover:bg-red-100 rounded-md flex items-center justify-center transition-colors group">
            <Trash2 className="w-4 h-4 text-red-500 group-hover:text-red-600" />
          </button>
        </div>
      </div>
    </div>
  );
};
