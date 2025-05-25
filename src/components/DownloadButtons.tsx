
import React from 'react';
import { Button } from './ui/button';
import { Download, FileText } from 'lucide-react';
import { downloadAsPDF, downloadAsMarkdown } from '../utils/formatters';

interface DownloadButtonsProps {
  document: string;
}

const DownloadButtons: React.FC<DownloadButtonsProps> = ({ document }) => {
  const handleDownloadPDF = () => {
    downloadAsPDF(document);
  };

  const handleDownloadMarkdown = () => {
    downloadAsMarkdown(document);
  };

  return (
    <div className="flex gap-2">
      <Button
        onClick={handleDownloadPDF}
        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
      >
        <Download className="w-4 h-4 mr-2" />
        Download PDF
      </Button>
      <Button
        onClick={handleDownloadMarkdown}
        className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
      >
        <FileText className="w-4 h-4 mr-2" />
        Download MD
      </Button>
    </div>
  );
};

export default DownloadButtons;
