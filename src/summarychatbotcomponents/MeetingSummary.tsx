import React from "react";
import { CheckCircle, Clock, Users } from "lucide-react";

interface SummarySection {
  id: string;
  title: string;
  icon: React.ReactNode;
  decisions: string[];
  actionItems: string[];
}

interface MeetingSummaryProps {
  sections: SummarySection[];
}

export const MeetingSummary: React.FC<MeetingSummaryProps> = ({ sections }) => {
  return (
    <div className="space-y-6">
      {sections.map((section) => (
        <div
          key={section.id}
          className="bg-white rounded-lg border border-gray-200 p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              {section.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              {section.title}
            </h3>
          </div>

          {section.decisions.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                <CheckCircle size={16} className="mr-2 text-green-500" />
                Decisions:
              </h4>
              <ul className="space-y-2">
                {section.decisions.map((decision, index) => (
                  <li
                    key={index}
                    className="text-sm text-gray-600 flex items-start"
                  >
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {decision}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {section.actionItems.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Clock size={16} className="mr-2 text-orange-500" />
                Action Items:
              </h4>
              <ul className="space-y-2">
                {section.actionItems.map((item, index) => (
                  <li
                    key={index}
                    className="text-sm text-gray-600 flex items-start"
                  >
                    <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
