import type { Filters } from '../types/filters';

/** Les filtres qui fonctionnent par plage : `prix` donne `prixMin` et `prixMax` */
export const RANGE_NAMES = ['prix', 'surface', 'chambres', 'pieces'] as const;

/** Remet un minimum et un maximum (en texte) dans le bon ordre ; si l'un des deux est vide, on ne change rien */
export const orderRange = (min: string, max: string): [string, string] => {
  if (!min || !max) return [min, max];
  return Number(min) > Number(max) ? [max, min] : [min, max];
};

/** Rend une copie de tous les filtres, avec le minimum et le maximum de chaque plage (prix, surface, chambres, pièces) dans le bon ordre */
export const withOrderedRanges = (filters: Filters): Filters => {
  const ordered = { ...filters };

  for (const name of RANGE_NAMES) {
    const [min, max] = orderRange(filters[`${name}Min`], filters[`${name}Max`]);
    ordered[`${name}Min`] = min;
    ordered[`${name}Max`] = max;
  }

  return ordered;
};
