
import React, { useState } from 'react';
import WelcomeScreen from '../components/WelcomeScreen';
import ProviderSelect from '../components/ProviderSelect';
import ModelSelect from '../components/ModelSelect';
import ApiKeyInput from '../components/ApiKeyInput';
import PromptInput from '../components/PromptInput';
import DocumentViewer from '../components/DocumentViewer';
import Analysis from '../components/Analysis';
import { Button } from '../components/ui/button';
import { ChevronLeft, Github, Linkedin } from 'lucide-react';

export type Provider = 'openai' | 'groq' | 'gemini' | 'anthropic';

interface AppState {
  currentStep: number;
  provider: Provider | null;
  model: string;
  apiKey: string;
  prompt: string;
  generatedDocument: string;
  isGenerating: boolean;
}

const Index = () => {
  const [state, setState] = useState<AppState>({
    currentStep: 0,
    provider: null,
    model: '',
    apiKey: '',
    prompt: '',
    generatedDocument: '',
    isGenerating: false,
  });

  const updateState = (updates: Partial<AppState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    updateState({ currentStep: state.currentStep + 1 });
  };

  const prevStep = () => {
    updateState({ currentStep: state.currentStep - 1 });
  };

  const goToAnalysis = () => {
    updateState({ currentStep: 6 });
  };

  const resetApp = () => {
    setState({
      currentStep: 0,
      provider: null,
      model: '',
      apiKey: '',
      prompt: '',
      generatedDocument: '',
      isGenerating: false,
    });
  };

  const renderCurrentStep = () => {
    switch (state.currentStep) {
      case 0:
        return <WelcomeScreen onGetStarted={nextStep} />;
      case 1:
        return (
          <ProviderSelect
            selectedProvider={state.provider}
            onProviderSelect={(provider) => updateState({ provider })}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 2:
        return (
          <ModelSelect
            provider={state.provider!}
            selectedModel={state.model}
            onModelSelect={(model) => updateState({ model })}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 3:
        return (
          <ApiKeyInput
            provider={state.provider!}
            apiKey={state.apiKey}
            onApiKeyChange={(apiKey) => updateState({ apiKey })}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 4:
        return (
          <PromptInput
            prompt={state.prompt}
            onPromptChange={(prompt) => updateState({ prompt })}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 5:
        return (
          <DocumentViewer
            provider={state.provider!}
            model={state.model}
            apiKey={state.apiKey}
            prompt={state.prompt}
            generatedDocument={state.generatedDocument}
            isGenerating={state.isGenerating}
            onDocumentGenerated={(document) => updateState({ generatedDocument: document })}
            onGeneratingStateChange={(isGenerating) => updateState({ isGenerating })}
            onBack={prevStep}
            onReset={resetApp}
            onViewAnalysis={goToAnalysis}
          />
        );
      case 6:
        return (
          <div className="max-w-6xl mx-auto">
            <Analysis
              provider={state.provider!}
              model={state.model}
              apiKey={state.apiKey}
              prompt={state.prompt}
            />
            <div className="flex gap-4 mt-8">
              <Button
                onClick={prevStep}
                variant="ghost"
                className="text-gray-300 hover:bg-white/10"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back to PRD
              </Button>
              <Button
                onClick={resetApp}
                className="bg-green-700 hover:bg-green-800 text-white"
              >
                New Project
              </Button>
            </div>
          </div>
        );
      default:
        return <WelcomeScreen onGetStarted={nextStep} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-green-900 to-green-950 flex flex-col">
      {/* Header with social links */}
      <header className="absolute top-4 right-4 flex gap-2 z-10">
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white/70 hover:text-white hover:bg-white/10"
          onClick={() => window.open('https://github.com/YPS7', '_blank')}
        >
          <Github className="h-5 w-5" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white/70 hover:text-white hover:bg-white/10"
          onClick={() => window.open('https://www.linkedin.com/in/yashpratapsingh07/', '_blank')}
        >
          <Linkedin className="h-5 w-5" />
        </Button>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          {renderCurrentStep()}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-white/50 text-sm py-4">
        <p>© 2024 PRD Generator. Create professional project requirement documents with AI.</p>
      </footer>
    </div>
  );
};

export default Index;
