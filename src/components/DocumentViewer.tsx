
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ChevronLeft, RotateCcw, Download, FileText, Loader2, BarChart3 } from 'lucide-react';
import { generateDocument } from '../utils/api';
import DownloadButtons from './DownloadButtons';
import type { Provider } from '../pages/Index';

interface DocumentViewerProps {
  provider: Provider;
  model: string;
  apiKey: string;
  prompt: string;
  generatedDocument: string;
  isGenerating: boolean;
  onDocumentGenerated: (document: string) => void;
  onGeneratingStateChange: (isGenerating: boolean) => void;
  onBack: () => void;
  onReset: () => void;
  onViewAnalysis: () => void;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({
  provider,
  model,
  apiKey,
  prompt,
  generatedDocument,
  isGenerating,
  onDocumentGenerated,
  onGeneratingStateChange,
  onBack,
  onReset,
  onViewAnalysis,
}) => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!generatedDocument && !isGenerating) {
      handleGenerate();
    }
  }, []);

  const handleGenerate = async () => {
    setError(null);
    onGeneratingStateChange(true);
    
    try {
      const document = await generateDocument(provider, model, apiKey, prompt);
      onDocumentGenerated(document);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate document');
    } finally {
      onGeneratingStateChange(false);
    }
  };

  const handleViewAnalysis = () => {
    // Navigate to analysis step (step 6)
    window.dispatchEvent(new CustomEvent('navigate-to-analysis'));
  };

  if (isGenerating) {
    return (
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
            Generating Your PRD
          </h2>
          <p className="bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent">
            Please wait while we create your project requirement document...
          </p>
        </div>
        
        <Card className="bg-white/10 border-white/20 p-12">
          <Loader2 className="w-12 h-12 animate-spin text-green-400 mx-auto mb-4" />
          <p className="text-lg bg-gradient-to-r from-gray-300 to-gray-400 bg-clip-text text-transparent">
            This may take a few moments...
          </p>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
            Generation Failed
          </h2>
          <p className="bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent">
            There was an error generating your document
          </p>
        </div>
        
        <Card className="bg-red-500/20 border-red-400/30 p-6 mb-6">
          <p className="text-red-200">{error}</p>
        </Card>

        <div className="flex gap-4">
          <Button
            onClick={onBack}
            variant="ghost"
            className="text-gray-300 hover:bg-white/10"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button
            onClick={handleGenerate}
            className="flex-1 bg-green-700 hover:bg-green-800 text-white"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
          Your PRD is Ready!
        </h2>
        <p className="bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent">
          Review your generated project requirement document below
        </p>
      </div>

      <Card className="bg-white/10 border-white/20 p-6 mb-6">
        <div className="prose prose-invert max-w-none">
          <div className="whitespace-pre-wrap text-sm leading-relaxed text-gray-300">
            {generatedDocument}
          </div>
        </div>
      </Card>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex gap-4">
          <Button
            onClick={onBack}
            variant="ghost"
            className="text-gray-300 hover:bg-white/10"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button
            onClick={handleGenerate}
            variant="ghost"
            className="text-gray-300 hover:bg-white/10"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Regenerate
          </Button>
        </div>
        
        <div className="flex-1">
          <DownloadButtons document={generatedDocument} />
        </div>
        
        <div className="flex gap-2">
          <Button
            onClick={onViewAnalysis}
            className="bg-blue-700 hover:bg-blue-800 text-white"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            View Analysis
          </Button>
          <Button
            onClick={onReset}
            variant="ghost"
            className="text-gray-300 hover:bg-white/10"
          >
            New PRD
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DocumentViewer;
