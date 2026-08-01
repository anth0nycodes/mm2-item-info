import { fetchWeaponData } from "./fetch-weapons";

async function main() {
  await Promise.all([fetchWeaponData("guns"), fetchWeaponData("knives")]);
}

try {
  await main();
} catch (error) {
  console.error(
    "An error occurred trying to fetch MM2 Cheap guns and knives:",
    error,
  );
}
