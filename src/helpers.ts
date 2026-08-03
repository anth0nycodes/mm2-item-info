import type { Config } from "./types";

export async function getConfig() {}
export async function setConfig(config: Config) {}

export function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}
