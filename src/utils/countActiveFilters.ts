import { type Filters } from '../types/filters';

export const countActiveFilters = (f: Filters): number =>
  [
    f.transaction,
    f.type,
    f.chambresMin || f.chambresMax,
    f.piecesMin || f.piecesMax,
    f.surfaceMin || f.surfaceMax,
    f.meuble,
    f.dpe,
    f.equipements.length,
  ].filter(Boolean).length;
