#!/usr/bin/env node

import { intro } from "@clack/prompts";
import { program } from "commander";
import axios from "axios";
import {
  capitalizeWords,
  CONFIG_FILE,
  displayImage,
  fileExists,
  getConfig,
  getErrorMessage,
  renderItemInfo,
  setConfig,
} from "./helpers.js";
import { dirname, join } from "path";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import chalk from "chalk";
import { ITEM_CATEGORIES, RARITIES, RBLX_VALUE_BASE_URL } from "./constants.js";
import { ItemsData } from "./types.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageJson = JSON.parse(
  readFileSync(join(__dirname, "../package.json"), "utf8"),
);

async function main() {
  program
    .name("MM2 Item Info")
    .description(
      "A CLI application that returns you the information of a weapon/pet/misc item in Murder Mystery 2.",
    )
    .version(packageJson.version);

  program.option("-i, --info <item-name>", "get information about an item");
  program.option("--lc, --list-categories", "list all item categories");
  program.option("--lr, --list-rarities", "list all item rarities");
  program.option("--aki, --api-key-info", "show how to obtain an API key");
  program.option("--sak, --set-api-key <api-key>", "set your API key");
  program.option("--sc, --show-config", "displays your current config");
  program.option("--rc, --reset-config", "resets your current config");

  program.parse();

  const opts = program.opts();

  if (opts.apiKeyInfo) {
    console.log(`To obtain an API key:`);
    console.log(
      `  1. Visit ${chalk.bold(chalk.underline(chalk.yellow("https://rblxvalue.com/developer")))} and log in with your Roblox account.`,
    );
    console.log(
      `  2. Allow RBLXValue access (it only reads your Roblox User ID, username, display name, avatar, and profile link).`,
    );
    console.log(
      `  3. Back on ${chalk.bold(chalk.underline(chalk.yellow("https://rblxvalue.com/developer")))} (in case you were redirected), scroll to the ${chalk.yellow("Create New API Key")} section.`,
    );
    console.log(
      `  4. Fill in the required fields, then click ${chalk.yellow("Create API Key")}.`,
    );
    console.log(
      `  5. Copy the generated key and set it with ${chalk.yellow("mm2-item-info --sak <api-key>")} / ${chalk.yellow("mm2-item-info --set-api-key <api-key>")}.`,
    );
    return;
  }

  if (opts.info) {
    const config = await getConfig();
    if (!config.apiKey) {
      console.error(
        `You do not currently have an API key set. Please set your API key with ${chalk.yellow("mm2-item-info --sak <api-key>")} / ${chalk.yellow("mm2-item-info --set-api-key <api-key>")}.`,
      );
      process.exit();
    }

    const apiKey = config.apiKey;
    const searchQuery: string = opts.info.replace(/\s+/g, " ").trim();

    try {
      const { data }: { data: ItemsData } = await axios.get(
        `${RBLX_VALUE_BASE_URL}/items?search=${encodeURIComponent(searchQuery)}`,
        {
          headers: {
            "X-Api-Key": apiKey,
          },
        },
      );

      if (data.items.length === 0) {
        console.log(
          `No items found for "${chalk.yellow(searchQuery)}". Please check the item name and try again.`,
        );
        process.exit();
      }

      for (const item of data.items) {
        const itemImageFallback = chalk.gray("No Image Available");
        const itemImage = await displayImage(item.image_url, itemImageFallback);
        console.log(itemImage);
        console.log(
          chalk.cyanBright(`${capitalizeWords(item.name)} Information:`),
        );
        console.log(`${renderItemInfo(item)}\n`);
      }

      process.exit();
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      console.error("Error fetching item info:", errorMessage);
      process.exit(1);
    }
  }

  if (opts.listCategories) {
    const itemCategories = ITEM_CATEGORIES.map(
      (category) => `- ${chalk.yellow(category)}`,
    ).join("\n");
    console.log(`Available item categories:\n${itemCategories}`);
    process.exit();
  }

  if (opts.listRarities) {
    const rarities = RARITIES.map(
      (rarity) => `- ${chalk.bold(rarity.colorFn(rarity.name))}`,
    ).join("\n");
    console.log(`List of rarities:\n${rarities}`);
    process.exit();
  }

  if (opts.setApiKey) {
    const apiKey = opts.setApiKey;
    try {
      await setConfig({ apiKey: apiKey });
      console.log(`${chalk.green("API key set successfully!")}`);
      process.exit();
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      console.error("Error setting API key:", errorMessage);
      process.exit(1);
    }
  }

  if (opts.showConfig) {
    if (!(await fileExists(CONFIG_FILE))) {
      console.log(
        `${chalk.yellow("No config file found.")} No config to display. You can create a config by setting your API key with ${chalk.cyan("--sak <api-key>")} / ${chalk.cyan("--set-api-key <api-key>")}.`,
      );
      process.exit(0);
    }

    try {
      const config = await getConfig();
      const configString = JSON.stringify(config, null, 2);
      const isConfigEmpty = Object.keys(config).length === 0;
      console.log(`${chalk.yellow("Your current config:\n")}${configString}`);
      if (isConfigEmpty) {
        console.log(
          `\n${chalk.yellow("Note:")} Your config file is empty. You can set your API key with ${chalk.cyan("--sak <api-key>")} / ${chalk.cyan("--set-api-key <api-key>")}.`,
        );
      }
      process.exit();
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      console.error("Error reading config:", errorMessage);
      process.exit(1);
    }
  }

  if (opts.resetConfig) {
    if (!(await fileExists(CONFIG_FILE))) {
      console.log(
        `${chalk.yellow("No config file found.")} Nothing to reset. You can create a config by setting your API key with ${chalk.cyan("--sak <api-key>")} / ${chalk.cyan("--set-api-key <api-key>")}.`,
      );
      process.exit();
    }
    try {
      await setConfig({});
      console.log(`${chalk.green("Config reset successfully!")}`);
      process.exit();
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      console.error("Error resetting config:", errorMessage);
      process.exit(1);
    }
  }

  intro(chalk.greenBright("Murder Mystery 2 Item Info\n"));
  console.log(
    `${chalk.yellow("mm2-item-info")} is a command-line tool for looking up details about Murder Mystery 2 weapons, pets, and miscellaneous items.\n`,
  );
  console.log(
    `Get started by running ${chalk.yellow("mm2-item-info -i <item-name>")}, where ${chalk.yellow("<item-name>")} is the item you want to look up.\n`,
  );
  console.log(
    `Run ${chalk.yellow("mm2-item-info -h")} to view all available options.\n`,
  );
  console.log(
    `All data is provided by RBLXValue (${chalk.bold(chalk.underline(chalk.yellow("https://docs.rblxvalue.com/getting-started")))}).`,
  );
}

try {
  await main();
} catch (error) {
  const errorMessage = getErrorMessage(error);
  console.error("An error occurred in main():", errorMessage);
  process.exit(1);
}
