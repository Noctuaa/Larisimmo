import { z } from "astro/zod";

export const dpeSchema = z.enum(['A', 'B', 'C', 'D', 'E', 'F', 'G']);
export const transactionSchema = z.enum(['vente', 'location']);
export const propertyTypeSchema = z.enum(['appartement', 'maison', 'chalet']);

export type Dpe = z.infer<typeof dpeSchema>;
export type Transaction = z.infer<typeof transactionSchema>;
export type PropertyType = z.infer<typeof propertyTypeSchema>;