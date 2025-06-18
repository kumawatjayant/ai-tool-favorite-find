
export interface AITool {
  id: number;
  name: string;
  category: string;
  description?: string;
  url?: string;
  pricing?: string;
  features?: string[];
}

export interface CategoryData {
  name: string;
  value: number;
}
