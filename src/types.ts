// Data (RBLXValue API v2)
export interface ItemsData {
  total: number;
  limit: number;
  offset: number;
  count: number;
  items: Item[];
  credit: string | null;
}

// Nullability below reflects what the live API returns, which is looser than
// the published v2 docs (e.g. `type` is documented as non-null but isn't always).
export interface Item {
  id: number;
  name: string;
  slug: string;
  acronym: string | null;
  value: number;
  value_source_a: number; // MM2Values
  value_source_b: number; // Supreme Values
  // For weapons this holds the rarity (e.g. "godly") and `type` holds the weapon
  // type (e.g. "knife"). For pets/misc it's "pets"/"misc" and `type` holds the rarity.
  category: string;
  type: string | null;
  tier: number | null;
  stability: string | null;
  demand: number | null;
  rarity: number | null;
  range: string | null;
  event_name: string | null;
  description: string | null;
  image_url: string | null;
  fandom_url: string | null;
  last_updated: string | null;
}

export interface ApiError {
  error: true;
  message: string;
}

// Config
export interface Config {
  apiKey?: string;
}
