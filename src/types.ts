// Data
export interface ItemsData {
  total: number;
  items: Item[];
}

export interface Item {
  name: string;
  value: number;
  category: string;
  type: string | null;
  stability: string;
  demand: number;
  image_url: string;
}

// Config
export interface Config {
  apiKey?: string;
}
