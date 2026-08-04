// Data
export interface ItemsData {
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

export interface ItemsResponse {
  data: ItemsData;
}

// Config
export interface Config {
  apiKey?: string;
}
