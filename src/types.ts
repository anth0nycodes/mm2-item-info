// Data
export interface Items {
  items: Item[];
}

export interface Item {
  name: string;
  value: number;
  category: string;
  type: string;
  stability: string;
  demand: number;
  image_url: string;
}

export interface ItemsData {
  data: Items;
}

// Config
export interface Config {
  apiKey?: string;
}
