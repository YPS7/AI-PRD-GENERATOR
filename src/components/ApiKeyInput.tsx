
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { ChevronLeft, Eye, EyeOff, ExternalLink } from 'lucide-react';
import type { Provider } from '../pages/Index';

interface ApiKeyInputProps {
  provider: Provider;
  apiKey: string;
  onApiKeyChange: (apiKey: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const providerInfo = {
  openai: {
    name: 'OpenAI',
    docsUrl: 'https://platform.openai.com/docs',
    keyFormat: 'sk-...',
  },
  groq: {
    name: 'Groq',
    docsUrl: 'https://docs.groq.com',
    keyFormat: 'gsk_...',
  },
  gemini: {
    name: 'Google Gemini',
    docsUrl: 'https://ai.google.dev/docs',
    keyFormat: 'AI...',
  },
  anthropic: {
    name: 'Anthropic',
    docsUrl: 'https://docs.anthropic.com',
    keyFormat: 'sk-ant-...',
  },
};

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({
  provider,
  apiKey,
  onApiKeyChange,
  onNext,
  onBack,
}) => {
  const [showKey, setShowKey] = useState(false);
  const info = providerInfo[provider];

  return (
    <div className="text-white max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-4">Enter API Key</h2>
        <p className="text-emerald-100">Enter your {info.name} API key to continue</p>
      </div>

      <Card className="bg-white/10 border-white/20 p-6 mb-6">
        <div className="mb-4">
          <label htmlFor="apiKey" className="block text-sm font-medium text-emerald-100 mb-2">
            {info.name} API Key
          </label>
          <div className="relative">
            <Input
              id="apiKey"
              type={showKey ? 'text' : 'password'}
              value={apiKey}
              onChange={(e) => onApiKeyChange(e.target.value)}
              placeholder={`Enter your ${info.name} API key (${info.keyFormat})`}
              className="bg-white/10 border-white/30 text-white placeholder-white/50 pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1 h-8 w-8 p-0 text-white/70 hover:text-white"
              onClick={() => setShowKey(!showKey)}
            >
              {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <div className="bg-blue-500/20 border border-blue-400/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <p className="text-sm text-blue-100 mb-2">
                <strong>Security Notice:</strong> Your API key is only used for this session and is never stored or logged.
              </p>
              <a
                href={info.docsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-blue-300 hover:text-blue-200"
              >
                Get your API key from {info.name}
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </div>
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
          disabled={!apiKey.trim()}
          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-50"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default ApiKeyInput;
