#!/usr/bin/env node

import { intro } from "@clack/prompts";
import { program } from "commander";
import {
  CONFIG_FILE,
  fileExists,
  getConfig,
  getErrorMessage,
  setConfig,
} from "./helpers.js";
import { dirname, join } from "path";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import color from "picocolors";

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

  program.option("-i, --info <item-name>", "show information of an item");
  program.option("--lit, --list-item-types", "list all item types");
  program.option("--lr, --list-rarities", "list all rarities");
  program.option("--aki, --api-key-info", "show how to obtain an api key");
  program.option("--sak, --set-api-key <api-key>", "set your api key");
  program.option("--sc, --show-config", "displays your current config");
  program.option("--rc, --reset-config", "resets your current config");

  program.parse();

  const opts = program.opts();

  if (opts.apiKeyInfo) {
    console.log(`To obtain an API key:`);
    console.log(
      `  1. Visit ${color.yellow("https://rblxvalue.com/developer")} and log in with your Roblox account.`,
    );
    console.log(
      `  2. Allow RBLXValue access (it only reads your Roblox User ID, username, display name, avatar, and profile link).`,
    );
    console.log(
      `  3. Back on ${color.yellow("https://rblxvalue.com/developer")} (in case you were redirected), scroll to the ${color.yellow("Create New API Key")} section.`,
    );
    console.log(
      `  4. Fill in the required fields, then click ${color.yellow("Create API Key")}.`,
    );
    console.log(
      `  5. Copy the generated key and set it with ${color.yellow("mm2-item-info --sak <api-key>")} / ${color.yellow("mm2-item-info --set-api-key <api-key>")}.`,
    );
    return;
  }

  if (opts.setApiKey) {
    const apiKey = opts.setApiKey;
    try {
      await setConfig({ apiKey: apiKey });
      console.log(`${color.green("API key set successfully!")}`);
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
        `${color.yellow("No config file found.")} No config to display. You can create a config by setting your API key with ${color.cyan("--sak <api-key>")} / ${color.cyan("--set-api-key <api-key>")}.`,
      );
      process.exit(0);
    }

    try {
      const config = await getConfig();
      const configString = JSON.stringify(config, null, 2);
      const isConfigEmpty = Object.keys(config).length === 0;
      console.log(`${color.yellow("Your current config:\n")}${configString}`);
      if (isConfigEmpty) {
        console.log(
          `\n${color.yellow("Note:")} Your config file is empty. You can set your API key with ${color.cyan("--sak <api-key>")} / ${color.cyan("--set-api-key <api-key>")}.`,
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
        `${color.yellow("No config file found.")} Nothing to reset. You can create a config by setting your API key with ${color.cyan("--sak <api-key>")} / ${color.cyan("--set-api-key <api-key>")}.`,
      );
      process.exit();
    }
    try {
      await setConfig({});
      console.log(`${color.green("Config reset successfully!")}`);
      process.exit();
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      console.error("Error resetting config:", errorMessage);
      process.exit(1);
    }
  }

  intro(color.greenBright("Murder Mystery 2 Item Info\n"));
  console.log(
    `${color.yellow("mm2-item-info")} is a command-line tool for looking up details about Murder Mystery 2 weapons, pets, and miscellaneous items.\n`,
  );
  console.log(
    `Get started by running ${color.yellow("mm2-item-info -i <item-name>")}, where ${color.yellow("<item-name>")} is the item you want to look up.\n`,
  );
  console.log(
    `Run ${color.yellow("mm2-item-info -h")} to view all available options.\n`,
  );
  console.log(
    `All data is provided by RBLXValue (${color.yellow("https://docs.rblxvalue.com/getting-started")}).`,
  );
}

try {
  await main();
} catch (error) {
  const errorMessage = getErrorMessage(error);
  console.error("An error occurred in main():", errorMessage);
  process.exit(1);
}
