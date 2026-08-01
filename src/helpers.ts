import { writeFile } from "node:fs/promises";
import { CleanedWeaponData, Weapon } from "./types";

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function truncate(str: string, maxLength: number) {
  const remainingChars = str.length - maxLength;
  return str.length > maxLength
    ? str.slice(0, maxLength) + `...${remainingChars} more chars`
    : str;
}

export async function writeWeaponDataToFile(
  weaponData: CleanedWeaponData,
  weaponType: Weapon,
) {
  const jsonWeaponData = JSON.stringify(weaponData, null, 2);
  await writeFile(`mm2-${weaponType}.json`, jsonWeaponData, "utf-8");
  return jsonWeaponData;
}
