// LLM abstraction: GPT-5 (OpenAI-compatible), Claude (Anthropic), Groq (OpenAI-compatible), and Demo
// Env keys: VITE_OPENAI_API_KEY, VITE_ANTHROPIC_API_KEY, VITE_GROQ_API_KEY
// Export: getCareerAdvisorClient(provider)

import OpenAI from 'openai';

export type ModelProvider = 'gpt5' | 'claude' | 'groq' | 'demo';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface CareerAdvisorClient {
  chat(messages: ChatMessage[], options?: { temperature?: number; maxTokens?: number }): Promise<string>;
}

const SYSTEM_PROMPT = `You are CareerAdvisor. Output strictly JSON when asked. The app uses React Flow to visualize career paths. Keep responses concise and structured.`;

export function getCareerAdvisorClient(provider: ModelProvider): CareerAdvisorClient {
  if (provider === 'gpt5') {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    const client = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });
    return {
      async chat(messages, options) {
        const completion = await client.chat.completions.create({
          model: 'gpt-5',
          temperature: options?.temperature ?? 0.7,
          max_tokens: options?.maxTokens ?? 1200,
          messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
        });
        return completion.choices[0]?.message?.content ?? '';
      },
    };
  }

  if (provider === 'claude') {
    const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
    return {
      async chat(messages, options) {
        const res = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'x-api-key': apiKey ?? '',
            'anthropic-version': '2023-06-01',
          },
          body: JSON.stringify({
            model: 'claude-3-5-sonnet-latest',
            max_tokens: options?.maxTokens ?? 1200,
            temperature: options?.temperature ?? 0.7,
            system: SYSTEM_PROMPT,
            messages: messages.map((m) => ({ role: m.role, content: m.content })),
          }),
        });
        if (!res.ok) throw new Error(`Claude error: ${res.status}`);
        const data = await res.json();
        const content = data?.content?.[0]?.text ?? '';
        return content;
      },
    };
  }

  if (provider === 'groq') {
    const apiKey = import.meta.env.VITE_GROQ_API_KEY;
    const client = new OpenAI({ apiKey, baseURL: 'https://api.groq.com/openai/v1', dangerouslyAllowBrowser: true });
    return {
      async chat(messages, options) {
        const completion = await client.chat.completions.create({
          model: 'llama-3.1-8b-instant',
          temperature: options?.temperature ?? 0.5,
          max_tokens: options?.maxTokens ?? 900,
          messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
        });
        return completion.choices[0]?.message?.content ?? '';
      },
    };
  }

  // demo provider: return deterministic sample JSON
  if (provider === 'demo') {
    return {
      async chat(_messages, _options) {
        return JSON.stringify({
          career_goal: 'AI/ML Engineer',
          education_path: {
            current_education: 'B.Tech CSE',
            next_steps: ['MSc AI', 'Deep Learning course', 'Kaggle projects'],
            certifications: ['TensorFlow Developer', 'AWS ML Specialty'],
            skills_to_learn: ['PyTorch', 'Computer Vision', 'NLP']
          },
          career_progression: {
            entry_level: ['Jr ML Engineer', 'Data Scientist I'],
            mid_level: ['Senior ML Engineer', 'ML Architect'],
            senior_level: ['AI Director', 'Chief AI Officer']
          }
        });
      },
    };
  }

  throw new Error('Unknown provider');
}
