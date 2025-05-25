import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Loader2, CheckCircle, XCircle, TrendingUp, Lightbulb } from 'lucide-react';
import { generateAnalysis } from '../utils/api';
import type { Provider } from '../pages/Index';

interface AnalysisProps {
  provider: Provider;
  model: string;
  apiKey: string;
  prompt: string;
}

interface AnalysisData {
  pros: string[];
  cons: string[];
  uniqueness: string;
  existingCompetitors: string[];
  successRate: string;
  suggestions: string[];
  marketOpportunity: string;
}

const Analysis: React.FC<AnalysisProps> = ({ provider, model, apiKey, prompt }) => {
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const result = await generateAnalysis(provider, model, apiKey, prompt);
        setAnalysis(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to generate analysis');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalysis();
  }, [provider, model, apiKey, prompt]);

  if (isLoading) {
    return (
      <Card className="bg-white/10 border-white/20 p-8">
        <div className="flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-green-400 mr-3" />
          <span className="text-gray-300">Analyzing your project idea...</span>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-red-500/20 border-red-400/30 p-6">
        <p className="text-red-200">{error}</p>
      </Card>
    );
  }

  if (!analysis) return null;

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
        Project Analysis
      </h3>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Pros */}
        <Card className="bg-white/10 border-white/20 p-6">
          <div className="flex items-center mb-4">
            <CheckCircle className="w-6 h-6 text-green-400 mr-2" />
            <h4 className="text-lg font-semibold text-gray-200">Strengths</h4>
          </div>
          <ul className="space-y-2">
            {analysis.pros.map((pro, index) => (
              <li key={index} className="text-gray-300 flex items-start">
                <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                {pro}
              </li>
            ))}
          </ul>
        </Card>

        {/* Cons */}
        <Card className="bg-white/10 border-white/20 p-6">
          <div className="flex items-center mb-4">
            <XCircle className="w-6 h-6 text-red-400 mr-2" />
            <h4 className="text-lg font-semibold text-gray-200">Challenges</h4>
          </div>
          <ul className="space-y-2">
            {analysis.cons.map((con, index) => (
              <li key={index} className="text-gray-300 flex items-start">
                <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                {con}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Success Rate & Market Opportunity */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-white/10 border-white/20 p-6">
          <div className="flex items-center mb-4">
            <TrendingUp className="w-6 h-6 text-blue-400 mr-2" />
            <h4 className="text-lg font-semibold text-gray-200">Success Potential</h4>
          </div>
          <p className="text-gray-300">{analysis.successRate}</p>
        </Card>

        <Card className="bg-white/10 border-white/20 p-6">
          <div className="flex items-center mb-4">
            <TrendingUp className="w-6 h-6 text-purple-400 mr-2" />
            <h4 className="text-lg font-semibold text-gray-200">Market Opportunity</h4>
          </div>
          <p className="text-gray-300">{analysis.marketOpportunity}</p>
        </Card>
      </div>

      {/* Uniqueness */}
      <Card className="bg-white/10 border-white/20 p-6">
        <h4 className="text-lg font-semibold text-gray-200 mb-3">Uniqueness Factor</h4>
        <p className="text-gray-300">{analysis.uniqueness}</p>
      </Card>

      {/* Existing Competitors */}
      <Card className="bg-white/10 border-white/20 p-6">
        <h4 className="text-lg font-semibold text-gray-200 mb-3">Existing Competition</h4>
        {analysis.existingCompetitors.length > 0 ? (
          <ul className="space-y-1">
            {analysis.existingCompetitors.map((competitor, index) => (
              <li key={index} className="text-gray-300">• {competitor}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-300">No direct competitors identified</p>
        )}
      </Card>

      {/* Suggestions */}
      <Card className="bg-white/10 border-white/20 p-6">
        <div className="flex items-center mb-4">
          <Lightbulb className="w-6 h-6 text-yellow-400 mr-2" />
          <h4 className="text-lg font-semibold text-gray-200">Recommendations</h4>
        </div>
        <ul className="space-y-2">
          {analysis.suggestions.map((suggestion, index) => (
            <li key={index} className="text-gray-300 flex items-start">
              <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              {suggestion}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default Analysis;
