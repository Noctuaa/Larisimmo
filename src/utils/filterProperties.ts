import { DPE_CLASSES, type Property } from '../types/property';
import type { Filters } from '../types/filters';

export const PER_PAGE = 12;

export const filterProperties = (properties: Property[], filters: Filters, page = 1) => {
  const filtered = properties.filter((p) => {
    if (filters.ville && p.ville !== filters.ville) return false;
    if (filters.type && p.type !== filters.type) return false;
    if (filters.transaction && p.transaction !== filters.transaction) return false;
    if (filters.prixMin && p.prix < Number(filters.prixMin)) return false;
    if (filters.prixMax && p.prix > Number(filters.prixMax)) return false;
    if (filters.chambresMin && p.chambres < Number(filters.chambresMin)) return false;
    if (filters.chambresMax && filters.chambresMax !== '8' && p.chambres > Number(filters.chambresMax)) return false;
    if (filters.piecesMin && p.pieces < Number(filters.piecesMin)) return false;
    if (filters.piecesMax && filters.piecesMax !== '8' && p.pieces > Number(filters.piecesMax)) return false;
    if (filters.surfaceMin && p.surface < Number(filters.surfaceMin)) return false;
    if (filters.surfaceMax && p.surface > Number(filters.surfaceMax)) return false;
    if (filters.dpe && DPE_CLASSES.indexOf(p.dpe) > DPE_CLASSES.indexOf(filters.dpe as (typeof DPE_CLASSES)[number])) return false;
    if (filters.meuble && String(p.meuble) !== filters.meuble) return false;
    if (filters.equipements.length && !filters.equipements.every((e) => p.equipements.includes(e))) return false;
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const items = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  return { items, total: filtered.length, page: currentPage, totalPages };
};
