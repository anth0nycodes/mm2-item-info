interface Variant {
  price: string;
  compare_at_price: string;
  available: boolean;
}

interface Product {
  title: string;
  handle: string;
  variants: Variant[];
}

export interface WeaponData {
  products: Product[];
}

export interface WeaponDataResponse {
  data: WeaponData;
}

export interface CleanedWeapon {
  title: string;
  handle: string;
  price: string;
  compare_at_price: string;
}

export type CleanedWeaponData = CleanedWeapon[];

export type Weapon = "guns" | "knives";
