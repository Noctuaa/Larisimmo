import type { LucideIcon } from '@lucide/vue';

import type { Dpe, Property } from '@/schemas/property';
import { fieldMeta } from '@/data/fieldMeta';

/** Une caractéristique à afficher : un libellé, une icône et sa valeur. Pour la classe énergie (`kind: 'dpe'`), la page affiche une pastille colorée */
export type Characteristic =
  | { label: string; icon: LucideIcon; value: string; kind?: undefined }
  | { label: string; icon: LucideIcon; value: Dpe; kind: 'dpe' };

/**
 * Les caractéristiques d'un bien. Les pages parcourent cette liste en boucle, sans écrire chaque ligne à la main
 * (c'est la version « dans le code » d'une table de champs qu'on lirait dans une base de données).
 */
export const getCharacteristics = (property: Property): Characteristic[] => [
  { ...fieldMeta.surface, value: `${property.surface} m²` },
  { ...fieldMeta.pieces, value: String(property.pieces) },
  { ...fieldMeta.chambres, value: String(property.chambres) },
  { ...fieldMeta.sallesDeBain, value: String(property.sallesDeBain) },
  { ...fieldMeta.meuble, value: property.meuble ? 'Oui' : 'Non' },
  { ...fieldMeta.dpe, value: property.dpe, kind: 'dpe' },
];
