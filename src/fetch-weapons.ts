import axios, { isAxiosError } from "axios";
import { Weapon, WeaponDataResponse } from "./types";
import { sleep, writeWeaponDataToFile, truncate } from "./helpers";

const MAX_ATTEMPTS = 3;

export async function fetchWeaponData(weaponType: Weapon) {
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const weaponsUrl = `https://mm2.cheap/collections/${weaponType}/products.json?limit=200`;
      const { data }: WeaponDataResponse = await axios.get(weaponsUrl);
      const cleanedWeaponData = data.products.map((product) => ({
        title: product.title,
        handle: product.handle,
        price: product.variants[0].price,
        compare_at_price: product.variants[0].compare_at_price,
        available: product.variants[0].available,
      }));
      const weaponData = await writeWeaponDataToFile(
        cleanedWeaponData,
        weaponType,
      );
      const weaponDataString = truncate(`${weaponData}`, 872);
      console.log(
        `Fetched ${cleanedWeaponData.length} ${weaponType} from MM2 Cheap:\n${weaponDataString}`,
      );
      return weaponData;
    } catch (error) {
      const is429Error = isAxiosError(error) && error.response?.status === 429;
      if (!is429Error || attempt === MAX_ATTEMPTS) throw error;

      const retryAfter = Number(error.response?.headers["retry-after"]);
      const waitMs = Number.isFinite(retryAfter)
        ? retryAfter * 1000
        : 2 ** attempt * 1000;
      console.warn(
        `Too many requests for fetching MM2 Cheap ${weaponType}. Retrying in ${waitMs / 1000}s. (Attempt ${attempt}/${MAX_ATTEMPTS})`,
      );
      await sleep(waitMs);
    }
  }
}
