import { medusaClient } from "./config";
import { Region } from "@medusajs/medusa";

export type RegionInfo = Pick<
  Region,
  "currency_code" | "tax_code" | "tax_rate"
>;

export async function listRegions() {
  return await medusaClient.regions
    .list()
    .then(({ regions }) => regions)
    .catch((e) => {
      throw e;
    });
}
