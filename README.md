# mm2-weapons-scraper

A simple data scraper for [mm2.cheap](https://mm2.cheap) that retrieves Murder Mystery 2 (MM2) weapon listings for price and value analysis.

> ⚠️ **Work in progress.** Core scraping works; more features are planned.

## What it does

Fetches guns and knives from the mm2.cheap storefront (Shopify `products.json` endpoints), cleans the response down to the fields that matter, and writes each weapon type to its own JSON file:

- `mm2-guns.json`
- `mm2-knives.json`

Each entry looks like:

```json
{
  "title": "Harvester Gun",
  "handle": "harvester_gun",
  "price": "8.49",
  "compare_at_price": "15.99",
  "available": true
}
```

## Getting started

Requires [Node.js](https://nodejs.org) (with `npx`/`tsx` support).

```bash
# install dependencies
npm install

# run the scraper
npm run dev
```

Output JSON files are written to the project root.

## How it works

- `src/index.ts` — entry point; fetches guns and knives in parallel.
- `src/fetch-weapons.ts` — fetches a weapon type, cleans the data, retries on HTTP 429 (respects `Retry-After`, else exponential backoff, up to 3 attempts).
- `src/helpers.ts` — `sleep`, `truncate`, and file writing helpers.
- `src/types.ts` — shared TypeScript types.

## Tech stack

- TypeScript
- [axios](https://axios-http.com) for HTTP requests
- [tsx](https://github.com/privatenumber/tsx) for running TS directly

## License

MIT

## Author

Anthony Hoang ([@anth0nycodes](https://github.com/anth0nycodes))
