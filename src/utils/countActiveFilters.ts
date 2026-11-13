import { type Filters } from '../types/filters';

/**
 * Nombre de filtres actifs, pour le badge du bouton « Filtres ».
 * Prix, chambres, pièces et surface comptent chacun pour 1 (même avec min et max) ; le type de bien et les équipements aussi (même à plusieurs).
 * (Achat ou Location n'est pas compté : il est toujours rempli)
 */
export const countActiveFilters = (f: Filters): number =>
  [
    f.type.length,
    f.prixMin || f.prixMax,
    f.chambresMin || f.chambresMax,
    f.piecesMin || f.piecesMax,
    f.surfaceMin || f.surfaceMax,
    f.meuble,
    f.dpe,
    f.equipements.length,
  ].filter(Boolean).length;
