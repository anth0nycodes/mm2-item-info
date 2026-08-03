#!/usr/bin/env node

import { program } from "commander";
import { getErrorMessage } from "./helpers.js";
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

  program.parse();

  console.log(`${color.cyan("Murder Mystery 2 Item Info\n")}`);
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
