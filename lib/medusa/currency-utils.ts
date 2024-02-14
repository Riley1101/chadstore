import { Region } from "@medusajs/medusa";
import { isEmpty } from "../isEmpty";
import { noDivisionCurrencies } from "./constants";

export type RegionInfo = Pick<
  Region,
  "currency_code" | "tax_code" | "tax_rate"
>;

type FormatAmountParams = {
  amount: number;
  region: RegionInfo;
  includeTaxes?: boolean;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  locale?: string;
};

type ConvertToLocaleParams = {
  amount: number;
  currency_code: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  locale?: string;
};

type ComputeAmountParams = {
  amount: number;
  region: RegionInfo;
  includeTaxes?: boolean;
};

function getTaxRate(region?: RegionInfo) {
    return region && !isEmpty(region) ? region?.tax_rate / 100 : 0;
}

function convertToDecimal(amount: number, region: RegionInfo) {
  const divisor = noDivisionCurrencies.includes(
    region?.currency_code?.toLowerCase(),
  )
    ? 1
    : 100;

  return Math.floor(amount) / divisor;
}

export function computeAmount({
  amount,
  region,
  includeTaxes = true,
}: ComputeAmountParams) {
  const toDecimal = convertToDecimal(amount, region);
  const taxRate = includeTaxes ? getTaxRate(region) : 0;
  const amountWithTaxes = toDecimal * (1 + taxRate);
  return amountWithTaxes;
}

function convertToLocale({
  amount,
  currency_code,
  minimumFractionDigits,
  maximumFractionDigits,
  locale = "en-US",
}: ConvertToLocaleParams) {
  return currency_code && !isEmpty(currency_code)
    ? new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency_code,
        minimumFractionDigits,
        maximumFractionDigits,
      }).format(amount)
    : amount.toString();
}

/**
 * Takes an amount and a region, and converts the amount to a localized decimal format
 */
export function formatAmount({
  amount,
  region,
  includeTaxes = true,
  ...rest
}: FormatAmountParams) {
  const taxAwareAmount = computeAmount({
    amount,
    region,
    includeTaxes,
  });

  return convertToLocale({
    amount: taxAwareAmount,
    currency_code: region.currency_code,
    ...rest,
  });
}

export const getPercentageDiff = (original: number, calculated: number) => {
  const diff = original - calculated
  const decrease = (diff / original) * 100

  return decrease.toFixed()
}
