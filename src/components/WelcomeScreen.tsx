
import React from 'react';
import { Button } from './ui/button';
import { FileText, Zap, Download, Shield } from 'lucide-react';

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onGetStarted }) => {
  return (
    <div className="text-center">
      <div className="mb-8">
        <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-gray-200 to-gray-500 bg-clip-text text-transparent">
          PRD Generator
        </h1>
        <p className="text-xl bg-gradient-to-r from-gray-300 to-gray-400 bg-clip-text text-transparent max-w-2xl mx-auto leading-relaxed">
          Create comprehensive project requirement documents using AI. Select your provider, enter your API key, and generate professional PRDs instantly.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
          <FileText className="h-8 w-8 text-green-300 mx-auto mb-3" />
          <h3 className="font-semibold mb-2 text-gray-300">Professional PRDs</h3>
          <p className="text-sm bg-gradient-to-r from-gray-400 to-gray-500 bg-clip-text text-transparent">Generate comprehensive project requirement documents</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
          <Zap className="h-8 w-8 text-green-300 mx-auto mb-3" />
          <h3 className="font-semibold mb-2 text-gray-300">Multiple AI Providers</h3>
          <p className="text-sm bg-gradient-to-r from-gray-400 to-gray-500 bg-clip-text text-transparent">Choose from OpenAI, Groq, Gemini, or Anthropic</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
          <Download className="h-8 w-8 text-green-300 mx-auto mb-3" />
          <h3 className="font-semibold mb-2 text-gray-300">Export Options</h3>
          <p className="text-sm bg-gradient-to-r from-gray-400 to-gray-500 bg-clip-text text-transparent">Download as PDF or Markdown format</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
          <Shield className="h-8 w-8 text-green-300 mx-auto mb-3" />
          <h3 className="font-semibold mb-2 text-gray-300">Secure & Private</h3>
          <p className="text-sm bg-gradient-to-r from-gray-400 to-gray-500 bg-clip-text text-transparent">API keys are never stored or logged</p>
        </div>
      </div>

      <Button 
        onClick={onGetStarted}
        size="lg"
        className="bg-white/20 hover:bg-white/30 text-white border border-white/30 px-8 py-3 text-lg font-medium transition-all duration-200 hover:scale-105"
      >
        Get Started
      </Button>
    </div>
  );
};

export default WelcomeScreen;
