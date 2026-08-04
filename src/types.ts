// Data
export interface ItemsData {
  items: Item[];
}

export interface Item {
  name: string;
  value: number;
  value_source_a: number;
  value_source_b: number;
  category: string;
  type: string;
  stability: string;
  demand: number;
  rarity: number;
}

// Config
export interface Config {
  apiKey?: string;
}
