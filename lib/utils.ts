import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import slugify from "slugify";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRupiah(value: number) {
  const rupiahFormatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  return rupiahFormatter.format(value ?? 0);
}

export function formatShortDate(input: Date | string | number) {
  const shortDateFormatter = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const date = input instanceof Date ? input : new Date(input);
  if (Number.isNaN(date.getTime())) return "";
  return shortDateFormatter.format(date);
}

export function buildIncrementalId({
  lastId,
  prefix,
  date = new Date(),
  pad = 4,
}: {
  lastId?: string | null | undefined;
  prefix: string;
  date?: Date;
  pad?: number;
}) {
  if (lastId) {
    const [, lastPrefix, lastStamp, lastCount] = lastId.match(/^(\w+)_([0-9]{8})_(\d+)$/) ?? [];

    if (lastPrefix && lastStamp && lastCount) {
      const next = String(Number(lastCount) + 1).padStart(pad, "0");
      return `${lastPrefix}_${lastStamp}_${next}`;
    }
  }

  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${prefix}_${y}${m}${d}_${String(1).padStart(pad, "0")}`;
}

export function buildSlug(title: string, id: string) {
  const [, suffix] = id.match(/_(\d+)$/) ?? [];
  const baseSlug = slugify(title, { lower: true, strict: true });

  return suffix ? `${baseSlug}-${suffix}` : baseSlug;
}
