import { join } from "node:path";
import type { Config, Item } from "./types.js";
import { homedir } from "node:os";
import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import constants from "node:constants";
import chalk from "chalk";
import terminalImage from "terminal-image";
import sharp from "sharp";
import { RARITIES } from "./constants.js";

export async function fileExists(path: string) {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

export function makeTextRainbow(text: string) {
  return text
    .split("")
    .map((char, idx) => {
      const colors = [
        chalk.redBright,
        chalk.yellowBright,
        chalk.greenBright,
        chalk.cyanBright,
        chalk.blueBright,
        chalk.magentaBright,
      ];

      // Skip empty spaces so they don't consume a color index
      if (char === " ") return char;

      const colorFn = colors[idx % colors.length];
      return colorFn(char);
    })
    .join("");
}

export async function displayImage(imageUrl: string, imageFallback?: string) {
  try {
    const response = await fetch(imageUrl);
    const imageBuffer = Buffer.from(await response.arrayBuffer());
    // the imageUrl returns us a .webp image, but terminal-image doesn't support webp, so we need to convert it to png first
    const pngImageBuffer = await sharp(imageBuffer).png().toBuffer();
    const image = await terminalImage.buffer(pngImageBuffer, {
      width: "15%",
      height: "15%",
    });
    return image;
  } catch (error) {
    if (imageFallback) return imageFallback;
    const errorMessage = getErrorMessage(error);
    console.error("Failed to render image:", errorMessage);
    process.exit(1);
  }
}

export function formatDisplayText(str: string | null | undefined) {
  if (!str) return "N/A";
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}

function getItemCategoryAndRarity(item: Item) {
  if (item.category === "pets") {
    // manually returning "Pet" for categoryName because the API returns "pets" but we want to display "pet"
    return { categoryName: "Pet", rarity: formatDisplayText(item.type) };
  }
  if (item.category === "misc") {
    return {
      categoryName: formatDisplayText(item.category),
      rarity: formatDisplayText(item.type),
    };
  }
  return {
    categoryName: formatDisplayText(item.type),
    rarity: formatDisplayText(item.category),
  };
}

function renderRarity(itemRarity: string) {
  const match = RARITIES.find(
    (r) => r.name.toLowerCase() === itemRarity.toLowerCase(),
  );
  return match ? match.colorFn(match.name) : itemRarity;
}

export function renderItemInfo(item: Item) {
  const { rarity: itemRarity, categoryName: itemCategoryName } =
    getItemCategoryAndRarity(item);
  const fields: Record<string, string | number> = {
    Rarity: renderRarity(itemRarity),
    Category: itemCategoryName,
    Value: item.value,
    Demand: item.demand,
    Stability: formatDisplayText(item.stability),
  };
  return Object.entries(fields)
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");
}

const CONFIG_DIR = join(homedir(), ".mm2-item.info");
export const CONFIG_FILE = join(CONFIG_DIR, "config.json");

export async function getConfig(): Promise<Config> {
  try {
    const content = await readFile(CONFIG_FILE, "utf8");
    return JSON.parse(content);
  } catch {
    // config doesn't exist yet, return empty config
    return {};
  }
}

export async function setConfig(config: Config) {
  await mkdir(CONFIG_DIR, { recursive: true });
  const existingConfig = await getConfig();

  // If config has any keys, merge with existing; otherwise use config as-is (for reset)
  const updatedConfig =
    Object.keys(config).length > 0 ? { ...existingConfig, ...config } : config;

  await writeFile(CONFIG_FILE, JSON.stringify(updatedConfig, null, 2), "utf8");
}

export function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}
