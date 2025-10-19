import z from "zod";

export const requiredDate = (message: string) =>
  z.preprocess((value) => {
    if (value === "" || value === null || value === undefined) return undefined;
    if (value instanceof Date) return value;
    if (typeof value === "string" || typeof value === "number") {
      const parsed = new Date(value);
      return Number.isNaN(parsed.getTime()) ? value : parsed;
    }
    return value;
  }, z.date({ error: message }));
