import type { Dpe, Property } from '@/schemas/property';

/** Une caractéristique à afficher : un libellé et sa valeur. Pour la classe énergie (`kind: 'dpe'`), la page affiche une pastille colorée */
export type Characteristic = { label: string; value: string; kind?: undefined } | { label: string; value: Dpe; kind: 'dpe' };

/**
 * Les caractéristiques d'un bien. Les pages parcourent cette liste en boucle, sans écrire chaque ligne à la main
 * (c'est la version « dans le code » d'une table de champs qu'on lirait dans une base de données).
 */
export const getCharacteristics = (property: Property): Characteristic[] => [
  { label: 'Surface', value: `${property.surface} m²` },
  { label: 'Pièces', value: String(property.pieces) },
  { label: 'Chambres', value: String(property.chambres) },
  { label: 'Salles de bain', value: String(property.sallesDeBain) },
  { label: 'Meublé', value: property.meuble ? 'Oui' : 'Non' },
  { label: 'Classe énergie', value: property.dpe, kind: 'dpe' },
];
