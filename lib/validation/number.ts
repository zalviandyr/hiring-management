import { z } from "zod";

export const requiredNumber = (message: string) =>
  z.preprocess((value) => {
    if (value === "" || value === null || value === undefined) return undefined;
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : value;
  }, z.number({ error: message }));
