
import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ChevronLeft } from 'lucide-react';
import type { Provider } from '../pages/Index';

export interface Model {
  id: string;
  name: string;
  description: string;
}

interface ModelSelectProps {
  provider: Provider;
  selectedModel: string | null;
  onModelSelect: (model: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const providerModels: Record<Provider, Model[]> = {
  openai: [
    { id: 'gpt-4o', name: 'GPT-4o', description: 'Most capable model for complex tasks' },
    { id: 'gpt-4o-mini', name: 'GPT-4o Mini', description: 'Fast and efficient for most tasks' },
    { id: 'gpt-4-turbo-preview', name: 'GPT-4 Turbo', description: 'High performance model' },
  ],
  groq: [
    { id: 'mixtral-8x7b-32768', name: 'Mixtral 8x7B', description: 'High quality, fast inference' },
    { id: 'llama2-70b-4096', name: 'Llama 2 70B', description: 'Large context window' },
    { id: 'gemma-7b-it', name: 'Gemma 7B', description: 'Efficient and capable' },
  ],
  gemini: [
    { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro', description: 'Most capable Gemini model' },
    { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash', description: 'Fast and efficient' },
    { id: 'gemini-pro', name: 'Gemini Pro', description: 'Balanced performance' },
  ],
  anthropic: [
    { id: 'claude-3-5-sonnet-20241022', name: 'Claude 3.5 Sonnet', description: 'Most capable Claude model' },
    { id: 'claude-3-opus-20240229', name: 'Claude 3 Opus', description: 'Highest intelligence' },
    { id: 'claude-3-sonnet-20240229', name: 'Claude 3 Sonnet', description: 'Balanced capability and speed' },
  ],
};

const ModelSelect: React.FC<ModelSelectProps> = ({
  provider,
  selectedModel,
  onModelSelect,
  onNext,
  onBack,
}) => {
  const models = providerModels[provider] || [];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
          Select Model
        </h2>
        <p className="bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent">
          Choose the {provider.charAt(0).toUpperCase() + provider.slice(1)} model for your PRD generation
        </p>
      </div>

      <div className="grid gap-4 mb-8">
        {models.map((model) => (
          <Card
            key={model.id}
            className={`p-6 cursor-pointer transition-all duration-200 border-2 ${
              selectedModel === model.id
                ? 'bg-white/20 border-green-400 shadow-lg scale-105'
                : 'bg-white/10 border-white/20 hover:bg-white/15 hover:border-white/40'
            }`}
            onClick={() => onModelSelect(model.id)}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-200">{model.name}</h3>
                <p className="bg-gradient-to-r from-gray-400 to-gray-500 bg-clip-text text-transparent mt-1">
                  {model.description}
                </p>
              </div>
              <div className={`w-4 h-4 rounded-full border-2 ${
                selectedModel === model.id
                  ? 'bg-green-400 border-green-400'
                  : 'border-white/40'
              }`} />
            </div>
          </Card>
        ))}
      </div>

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
          onClick={onNext}
          disabled={!selectedModel}
          className="flex-1 bg-green-700 hover:bg-green-800 text-white disabled:opacity-50"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default ModelSelect;
