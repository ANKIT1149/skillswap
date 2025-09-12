import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';

interface ReportPopupProps {
  onClose: () => void;
  onSubmit: (reportType: string) => void;
}

const ReportPopup: React.FC<ReportPopupProps> = ({ onClose, onSubmit }) => {
  const [selectedReport, setSelectedReport] = useState('');

  const reportOptions = [
    'Inappropriate Behavior',
    'Spam',
    'Harassment',
    'Offensive Content',
    'Other',
  ];

  const handleSubmit = () => {
    if (selectedReport) {
      onSubmit(selectedReport);
      onClose();
    } else {
      toast.error('Please select a report type');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.8, y: -20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: -20 }}
        className="bg-teal-950 rounded-lg shadow-2xl shadow-teal-800 p-6 w-96 relative top-[210px]"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white">Report User</h3>
          <button onClick={onClose} className="text-teal-200">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-3">
          {reportOptions.map((option) => (
            <label key={option} className="flex items-center text-teal-200">
              <input
                type="radio"
                name="reportType"
                value={option}
                checked={selectedReport === option}
                onChange={(e) => setSelectedReport(e.target.value)}
                className="mr-2"
              />
              {option}
            </label>
          ))}
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-teal-200 hover:bg-teal-800 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-teal-600 text-white hover:bg-teal-700 rounded"
          >
            Submit Report
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ReportPopup;