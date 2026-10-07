import { computed, map } from 'nanostores';
import type { Filters } from '../types/filters';
import { countActiveFilters } from '../utils/countActiveFilters';

const initialFilters: Filters = {
  transaction: '',
  ville: '',
  type: '',
  chambresMin: '',
  chambresMax: '',
  piecesMin: '',
  piecesMax: '',
  surfaceMin: '',
  surfaceMax: '',
  dpe: '',
  meuble: '',
  equipements: [],
};

export const $filters = map<Filters>({ ...initialFilters });

if (typeof window !== 'undefined') {
  const params = new URLSearchParams(window.location.search);
  for (const key of Object.keys(initialFilters) as (keyof Filters)[]) {
    $filters.setKey(key, key === 'equipements' ? params.getAll(key) : (params.get(key) ?? ''));
  }
}

export const $activeFiltersCount = computed($filters, countActiveFilters);

export const resetFilters = () => $filters.set({ ...initialFilters, ville: $filters.get().ville });