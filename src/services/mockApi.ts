
import { AITool } from '../types/types';

// Mock AI Tools data
const aiToolsData: AITool[] = [
  {
    id: 1,
    name: "ChatGPT",
    category: "Conversational AI",
    description: "Advanced conversational AI assistant for various tasks",
    url: "https://chat.openai.com",
    pricing: "Free tier available",
    features: ["Natural language processing", "Code generation", "Writing assistance"]
  },
  {
    id: 2,
    name: "Midjourney",
    category: "Image Generation",
    description: "AI-powered image generation from text prompts",
    url: "https://midjourney.com",
    pricing: "Subscription based",
    features: ["Text-to-image", "Art generation", "Style transfer"]
  },
  {
    id: 3,
    name: "GitHub Copilot",
    category: "Code Assistant",
    description: "AI pair programmer that helps write code",
    url: "https://github.com/features/copilot",
    pricing: "$10/month",
    features: ["Code completion", "Bug fixing", "Test generation"]
  },
  {
    id: 4,
    name: "Jasper",
    category: "Content Creation",
    description: "AI writing assistant for marketing and content",
    url: "https://jasper.ai",
    pricing: "Starting at $29/month",
    features: ["Blog writing", "Ad copy", "Social media content"]
  },
  {
    id: 5,
    name: "Runway ML",
    category: "Video Generation",
    description: "AI-powered video editing and generation tools",
    url: "https://runwayml.com",
    pricing: "Free tier available",
    features: ["Video editing", "Motion graphics", "Real-time collaboration"]
  },
  {
    id: 6,
    name: "Stable Diffusion",
    category: "Image Generation",
    description: "Open-source text-to-image generation model",
    url: "https://stability.ai",
    pricing: "Free and open source",
    features: ["Text-to-image", "Image-to-image", "Inpainting"]
  },
  {
    id: 7,
    name: "Notion AI",
    category: "Productivity",
    description: "AI-powered writing and brainstorming in Notion",
    url: "https://notion.so",
    pricing: "$10/month",
    features: ["Writing assistance", "Brainstorming", "Content summarization"]
  },
  {
    id: 8,
    name: "Grammarly",
    category: "Writing Assistant",
    description: "AI-powered writing enhancement and grammar checking",
    url: "https://grammarly.com",
    pricing: "Free tier available",
    features: ["Grammar checking", "Style suggestions", "Tone detection"]
  },
  {
    id: 9,
    name: "Loom AI",
    category: "Video Generation",
    description: "AI-enhanced video recording and editing",
    url: "https://loom.com",
    pricing: "Free tier available",
    features: ["Auto-transcription", "Video summaries", "Smart editing"]
  },
  {
    id: 10,
    name: "Copy.ai",
    category: "Content Creation",
    description: "AI copywriting tool for marketing content",
    url: "https://copy.ai",
    pricing: "Free tier available",
    features: ["Ad copy", "Email templates", "Blog posts"]
  },
  {
    id: 11,
    name: "Replit Ghostwriter",
    category: "Code Assistant",
    description: "AI code completion and generation in Replit",
    url: "https://replit.com",
    pricing: "Subscription based",
    features: ["Code completion", "Debugging", "Code explanation"]
  },
  {
    id: 12,
    name: "Synthesia",
    category: "Video Generation",
    description: "AI avatar video generation platform",
    url: "https://synthesia.io",
    pricing: "Starting at $30/month",
    features: ["AI avatars", "Multi-language support", "Custom branding"]
  }
];

// In-memory favorites storage
let favorites: number[] = [];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApiService = {
  async getTools(category?: string): Promise<AITool[]> {
    await delay(500); // Simulate network delay
    
    if (category && category !== '') {
      const filtered = aiToolsData.filter(tool => 
        tool.category.toLowerCase() === category.toLowerCase()
      );
      return filtered;
    }
    
    return aiToolsData;
  },

  async getFavorites(): Promise<AITool[]> {
    await delay(300);
    
    const favoriteTools = aiToolsData.filter(tool => 
      favorites.includes(tool.id)
    );
    
    return favoriteTools;
  },

  async addFavorite(toolId: number): Promise<void> {
    await delay(200);
    
    // Check if tool exists
    const toolExists = aiToolsData.some(tool => tool.id === toolId);
    if (!toolExists) {
      throw new Error('Tool not found');
    }
    
    // Check if already favorited
    if (favorites.includes(toolId)) {
      throw new Error('Tool already favorited');
    }
    
    favorites.push(toolId);
  },

  async removeFavorite(toolId: number): Promise<void> {
    await delay(200);
    
    favorites = favorites.filter(id => id !== toolId);
  },

  getCategories(): string[] {
    const categories = [...new Set(aiToolsData.map(tool => tool.category))];
    return categories.sort();
  }
};
