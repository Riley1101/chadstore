import { medusaClient } from "./config";
import { Region } from "@medusajs/medusa";
import { cookies } from "next/headers";

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

export async function getMedusaHeaders(tags: string[] = []) {
  const headers = {
    next: {
      tags,
    },
  } as Record<string, any>;

  const token = cookies().get("_medusa_jwt")?.value;

  if (token) {
    headers.authorization = `Bearer ${token}`;
  }

  return headers;
}
