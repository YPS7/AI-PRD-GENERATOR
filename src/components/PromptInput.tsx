
import React from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Card } from './ui/card';
import { ChevronLeft, Lightbulb } from 'lucide-react';

interface PromptInputProps {
  prompt: string;
  onPromptChange: (prompt: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const promptSuggestions = [
  "A mobile app for fitness tracking with social features",
  "An e-commerce platform for sustainable products",
  "A project management tool for remote teams",
  "A learning management system for online courses",
  "A food delivery app with restaurant partnerships",
];

const PromptInput: React.FC<PromptInputProps> = ({
  prompt,
  onPromptChange,
  onNext,
  onBack,
}) => {
  return (
    <div className="text-white max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-4">Describe Your Project</h2>
        <p className="text-emerald-100">Enter a detailed description of the project you want to create a PRD for</p>
      </div>

      <Card className="bg-white/10 border-white/20 p-6 mb-6">
        <div className="mb-4">
          <label htmlFor="prompt" className="block text-sm font-medium text-emerald-100 mb-2">
            Project Description
          </label>
          <Textarea
            id="prompt"
            value={prompt}
            onChange={(e) => onPromptChange(e.target.value)}
            placeholder="Describe your project idea in detail. Include the target audience, main features, goals, and any specific requirements..."
            className="min-h-32 bg-white/10 border-white/30 text-white placeholder-white/50 resize-none"
            maxLength={2000}
          />
          <div className="text-right text-sm text-white/60 mt-1">
            {prompt.length}/2000 characters
          </div>
        </div>

        <div className="border-t border-white/20 pt-4">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-4 h-4 text-yellow-300" />
            <span className="text-sm font-medium text-emerald-100">Prompt Suggestions</span>
          </div>
          <div className="space-y-2">
            {promptSuggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                className="text-left justify-start h-auto p-2 text-white/70 hover:text-white hover:bg-white/10 w-full"
                onClick={() => onPromptChange(suggestion)}
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      <div className="flex gap-4">
        <Button
          onClick={onBack}
          variant="ghost"
          className="text-white hover:bg-white/10"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button
          onClick={onNext}
          disabled={prompt.trim().length < 10}
          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-50"
        >
          Generate PRD
        </Button>
      </div>
    </div>
  );
};

export default PromptInput;
