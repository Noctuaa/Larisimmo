import { z } from "astro/zod";

export const statusSchema = z.enum(['disponible', 'vendu', 'en pause']);
export type Status = z.infer<typeof statusSchema>;

export const tagSchema = z.enum(['Nouveau', 'Bon plan', 'Coup de cœur']);
export type Tag = z.infer<typeof tagSchema>;

export const transactionSchema = z.enum(['sale', 'rent']);
export type Transaction = z.infer<typeof transactionSchema>;

export const propertyTypeSchema = z.enum(['apartment', 'house', 'chalet']);
export type PropertyType = z.infer<typeof propertyTypeSchema>;

export const meubleSchema = z.enum(['true', 'false']);
export type Meuble = z.infer<typeof meubleSchema>;

export const dpeSchema = z.enum(['A', 'B', 'C', 'D', 'E', 'F', 'G']);
export type Dpe = z.infer<typeof dpeSchema>;

export const equipementSchema = z.enum([
  'parking',
  'terrace',
  'garden',
  'pool',
  'elevator',
  'cellar',
  'attic',
  'air_conditioning',
  'fireplace',
  'underfloor_heating',
  'equipped_kitchen',
]);
export type Equipement = z.infer<typeof equipementSchema>;

export const propertySchema = z.object({
  id: z.string(),
  titre: z.string(),
  type: propertyTypeSchema,
  transaction: transactionSchema,
  prix: z.number(),
  ville: z.string(),
  adresse: z.string(),
  surface: z.number(),
  pieces: z.number(),
  chambres: z.number(),
  sallesDeBain: z.number(),
  meuble: z.boolean(),
  description: z.string(),
  photos: z.array(z.object({ compacte: z.string(), grande: z.string() })),
  equipements: z.array(equipementSchema),
  dpe: dpeSchema,
  etiquettes: z.array(tagSchema),
  statut: statusSchema,
});
export type Property = z.infer<typeof propertySchema>;