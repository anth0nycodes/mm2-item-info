import chalk from "chalk";
import { makeTextRainbow } from "./helpers.js";

export const RBLX_VALUE_BASE_URL = "https://rblxvalue.com/api/v1";
export const ITEM_CATEGORIES = ["Knife", "Gun", "Pet", "Miscellaneous"];
export const RARITIES = [
  { name: "Ancient", colorFn: chalk.hex("#5f02ef") }, // Purple
  { name: "Vintage", colorFn: chalk.hex("#E5C500") }, // Gold
  { name: "Unique", colorFn: chalk.hex("#CD7F32") }, // Bronze
  { name: "Chroma", colorFn: makeTextRainbow }, // Rainbow
  { name: "Godly", colorFn: chalk.hex("#FF02B3") }, // Hot pink
  { name: "Legendary", colorFn: chalk.redBright },
  { name: "Rare", colorFn: chalk.cyanBright },
  { name: "Uncommon", colorFn: chalk.greenBright },
  { name: "Common", colorFn: chalk.gray },
];
