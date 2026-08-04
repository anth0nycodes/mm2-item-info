import { join } from "node:path";
import type { Config } from "./types.js";
import { homedir } from "node:os";
import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import constants from "node:constants";
import chalk from "chalk";

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

const CONFIG_DIR = join(homedir(), ".mm2-item.info");
export const CONFIG_FILE = join(CONFIG_DIR, "config.json");

export async function getConfig() {
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
