"use server";
import { listRegions } from "@/lib/medusa/utils";
import { Region } from "@medusajs/medusa";

/**
 * Retrieve a region based on country code
 * @param countryCode - The country code to retrieve the region for
 * @returns The region object
 */
export async function getRegions(countryCode: string) {
  try {
    const regions = await listRegions();
    if (!regions) {
      return null;
    }
    const regionMap = new Map<string, Region>();

    regions.forEach((region) => {
      region.countries.forEach((c) => {
        regionMap.set(c.iso_2, region);
      });
    });

    const region = countryCode
      ? regionMap.get(countryCode)
      : regionMap.get("us");
    return region;
  } catch (e: any) {
    console.warn(e.toString());
    return null;
  }
}
