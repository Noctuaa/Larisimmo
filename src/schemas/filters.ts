import { z } from 'astro/zod';

import { dpeSchema, equipementSchema, meubleSchema, propertyTypeSchema, transactionSchema } from '@/schemas/property';

/**
 * Filtres de recherche. Un champ de saisie et l'adresse ne donnent que du texte (le texte vide = pas de filtre).
 * Le type de bien et les équipements sont des listes, car on peut en cocher plusieurs.
 */
export const filtersSchema = z.object({
  transaction: transactionSchema,
  ville: z.string(),
  type: z.array(propertyTypeSchema),
  prixMin: z.string(),
  prixMax: z.string(),
  chambresMin: z.string(),
  chambresMax: z.string(),
  piecesMin: z.string(),
  piecesMax: z.string(),
  surfaceMin: z.string(),
  surfaceMax: z.string(),
  dpe: dpeSchema.or(z.literal('')),
  meuble: meubleSchema.or(z.literal('')),
  equipements: z.array(equipementSchema),
});
export type Filters = z.infer<typeof filtersSchema>;