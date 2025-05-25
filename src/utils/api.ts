
import type { Provider } from '../pages/Index';

const API_ENDPOINTS = {
  openai: 'https://api.openai.com/v1/chat/completions',
  groq: 'https://api.groq.com/openai/v1/chat/completions',
  gemini: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent',
  anthropic: 'https://api.anthropic.com/v1/messages',
};

const PRD_PROMPT = `You are a Senior Software Architect and Product Strategist. Your mission is to author an exhaustive, machine-readable Product Requirements Document (PRD) that a Vibe Coding engine can consume to scaffold a fully functional application. Be as precise and granular as possible—define every assumption, dependency, and deliverable in enough detail that no human intervention is required beyond code generation. With the following structure:

# Project Requirement Document

## 1. Project Overview
- What problem does this project solve?
- A concise yet comprehensive summary of the product’s purpose, vision, and key value proposition.
- Scope boundaries: what’s in-scope vs. out-of-scope.
- Core user problems to solve.

## 2. Target Audience
- Detailed user personas (role, demographics, technical proficiency, pain points).
- Usage contexts and environments.
- Accessibility and localization considerations.

## 3. Features
- A prioritized list (High/Medium/Low) of discrete features.
- For each feature: Unique identifier (e.g., “F-001”)
- Name and brief summary

## 4. Use Cases
- End-to-end user scenarios, each with: Title, actor(s), preconditions, trigger, step-by-step flow, and postconditions.
- Alternative and error flows.
- Performance criteria
- Security considerations

## 5. Tech Stack
- Frontend frameworks/libraries (including versions).
-Backend platform/language, database(s), caching, messaging, and storage.
-CI/CD, testing frameworks, infrastructure (Cloud provider, containerization, serverless, etc.).

## 6. File and Folder Structure
- Hierarchical tree of all files and directories.
- Purpose of each top-level folder and sample file naming conventions.
- Configuration, assets, component/services separation.

## 7. Resources Available
- Links of Existing code repositories, SDKs, APIs, design systems, style guides.
- Third-party services and credentials.
-  If any API or service is needed then provide link of there documantation and also provide the links of the documantation of the languages and frameworks suggested in tech stack heading.

## 8. Future Considerations
- Scalability plans
- Potential enhancements
- Long-term roadmap   


User's Project Description:`;

// const ANALYSIS_PROMPT = `You are a business analyst and market researcher. Analyze the following project idea and provide a comprehensive analysis. Return your response as a JSON object with the following structure:

// {
//   "pros": ["array of strengths and advantages"],
//   "cons": ["array of challenges and disadvantages"],
//   "uniqueness": "string describing what makes this idea unique",
//   "existingCompetitors": ["array of existing competitors or similar products"],
//   "successRate": "string describing the potential success rate and factors",
//   "suggestions": ["array of actionable recommendations"],
//   "marketOpportunity": "string describing the market size and opportunity"
// }

// Be thorough, realistic, and provide actionable insights. Consider market trends, technical feasibility, competition, and business viability. 

const ANALYSIS_PROMPT =` You are an expert business analyst and market researcher. Analyze the following project idea in detail and return your findings in a structured JSON format. 

{
  "pros": ["List key strengths, advantages, and value propositions of the idea."],
  "cons": ["List challenges, risks, and potential limitations."],
  "uniqueness": "Explain what makes the idea different or innovative compared to current solutions.",
  "existingCompetitors": ["List major competitors or similar solutions already in the market."],
  "successRate": "Estimate the idea’s potential for success based on current market conditions, with reasoning.",
  "suggestions": ["Provide actionable suggestions to improve the business idea or increase its success potential."],
  "marketOpportunity": "Describe the size, demand, and potential of the target market, including trends and growth."
}


Your analysis should be data-driven, realistic, and actionable. Consider current market trends, customer needs, competitive landscape, technical feasibility, and business viability.

Project Description:`;

export async function generateDocument(provider: Provider, model: string, apiKey: string, prompt: string): Promise<string> {
  console.log(`Generating document using ${provider} provider with model ${model}`);
  
  try {
    switch (provider) {
      case 'openai':
        return await generateWithOpenAI(apiKey, model, prompt);
      case 'groq':
        return await generateWithGroq(apiKey, model, prompt);
      case 'gemini':
        return await generateWithGemini(apiKey, model, prompt);
      case 'anthropic':
        return await generateWithAnthropic(apiKey, model, prompt);
      default:
        throw new Error('Unsupported provider');
    }
  } catch (error) {
    console.error('Error generating document:', error);
    throw error;
  }
}

export async function generateAnalysis(provider: Provider, model: string, apiKey: string, prompt: string): Promise<any> {
  console.log(`Generating analysis using ${provider} provider with model ${model}`);
  
  try {
    let response: string;
    switch (provider) {
      case 'openai':
        response = await generateWithOpenAI(apiKey, model, `${ANALYSIS_PROMPT}\n\n${prompt}`, true);
        break;
      case 'groq':
        response = await generateWithGroq(apiKey, model, `${ANALYSIS_PROMPT}\n\n${prompt}`, true);
        break;
      case 'gemini':
        response = await generateWithGemini(apiKey, model, `${ANALYSIS_PROMPT}\n\n${prompt}`, true);
        break;
      case 'anthropic':
        response = await generateWithAnthropic(apiKey, model, `${ANALYSIS_PROMPT}\n\n${prompt}`, true);
        break;
      default:
        throw new Error('Unsupported provider');
    }
    
    // Parse JSON response
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error('Invalid JSON response from API');
  } catch (error) {
    console.error('Error generating analysis:', error);
    throw error;
  }
}

async function generateWithOpenAI(apiKey: string, model: string, prompt: string, isAnalysis = false): Promise<string> {
  const response = await fetch(API_ENDPOINTS.openai, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: model,
      messages: [
        {
          role: 'user',
          content: isAnalysis ? prompt : `${PRD_PROMPT}\n\n${prompt}`
        }
      ],
      max_tokens: 4000,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Failed to generate document with OpenAI');
  }

  const data = await response.json();
  return data.choices[0]?.message?.content || 'No content generated';
}

async function generateWithGroq(apiKey: string, model: string, prompt: string, isAnalysis = false): Promise<string> {
  const response = await fetch(API_ENDPOINTS.groq, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: model,
      messages: [
        {
          role: 'user',
          content: isAnalysis ? prompt : `${PRD_PROMPT}\n\n${prompt}`
        }
      ],
      max_tokens: 4000,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Failed to generate document with Groq');
  }

  const data = await response.json();
  return data.choices[0]?.message?.content || 'No content generated';
}

async function generateWithGemini(apiKey: string, model: string, prompt: string, isAnalysis = false): Promise<string> {
  const modelName = model === 'gemini-pro' ? 'gemini-1.5-pro' : model;
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: isAnalysis ? prompt : `${PRD_PROMPT}\n\n${prompt}`
        }]
      }],
      generationConfig: {
        maxOutputTokens: 4000,
        temperature: 0.7,
      },
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Failed to generate document with Gemini');
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || 'No content generated';
}

async function generateWithAnthropic(apiKey: string, model: string, prompt: string, isAnalysis = false): Promise<string> {
  const response = await fetch(API_ENDPOINTS.anthropic, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: model,
      max_tokens: 4000,
      messages: [
        {
          role: 'user',
          content: isAnalysis ? prompt : `${PRD_PROMPT}\n\n${prompt}`
        }
      ],
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Failed to generate document with Anthropic');
  }

  const data = await response.json();
  return data.content?.[0]?.text || 'No content generated';
}
