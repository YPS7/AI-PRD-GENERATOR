
import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ChevronLeft } from 'lucide-react';
import type { Provider } from '../pages/Index';

interface ProviderSelectProps {
  selectedProvider: Provider | null;
  onProviderSelect: (provider: Provider) => void;
  onNext: () => void;
  onBack: () => void;
}

const providers = [
  { id: 'openai' as Provider, name: 'OpenAI', description: 'GPT-4o and GPT-4o Mini models' },
  { id: 'groq' as Provider, name: 'Groq', description: 'Ultra-fast inference speed' },
  { id: 'gemini' as Provider, name: 'Google Gemini', description: 'Google\'s latest AI model' },
  { id: 'anthropic' as Provider, name: 'Anthropic', description: 'Claude AI assistant' },
];

const ProviderSelect: React.FC<ProviderSelectProps> = ({
  selectedProvider,
  onProviderSelect,
  onNext,
  onBack,
}) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
          Select AI Provider
        </h2>
        <p className="bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent">
          Choose your preferred AI provider to generate the PRD
        </p>
      </div>

      <div className="grid gap-4 mb-8">
        {providers.map((provider) => (
          <Card
            key={provider.id}
            className={`p-6 cursor-pointer transition-all duration-200 border-2 ${
              selectedProvider === provider.id
                ? 'bg-white/20 border-green-400 shadow-lg scale-105'
                : 'bg-white/10 border-white/20 hover:bg-white/15 hover:border-white/40'
            }`}
            onClick={() => onProviderSelect(provider.id)}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-200">{provider.name}</h3>
                <p className="bg-gradient-to-r from-gray-400 to-gray-500 bg-clip-text text-transparent mt-1">
                  {provider.description}
                </p>
              </div>
              <div className={`w-4 h-4 rounded-full border-2 ${
                selectedProvider === provider.id
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
          disabled={!selectedProvider}
          className="flex-1 bg-green-700 hover:bg-green-800 text-white disabled:opacity-50"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default ProviderSelect;
