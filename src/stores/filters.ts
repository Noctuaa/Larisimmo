import { computed, map } from 'nanostores';
import type { Filters } from '../types/filters';
import { countActiveFilters } from '../utils/countActiveFilters';

// === State ===

const initialFilters: Filters = {
  transaction: '',
  ville: '',
  type: '',
  prixMin: '',
  prixMax: '',
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

const LAST_SEARCH_KEY = 'larisimmo:lastSearch';

export const $filters = map<Filters>({ ...initialFilters });

if (typeof window !== 'undefined') {
  const params = new URLSearchParams(window.location.search);
  for (const key of Object.keys(initialFilters) as (keyof Filters)[]) {
    $filters.setKey(key, key === 'equipements' ? params.getAll(key) : (params.get(key) ?? ''));
  }
}

// === Actions ===



export const resetFilters = () => $filters.set({ ...initialFilters, ville: $filters.get().ville });

// === Getters ===

export const $activeFiltersCount = computed($filters, countActiveFilters);

export const $searchUrl = computed($filters, (filters) => {
  const urlParams = new URLSearchParams();

  for (const [key, value] of Object.entries(filters)) {
    if (Array.isArray(value)) value.forEach((v) => urlParams.append(key, v));
    else if (value) urlParams.append(key, value);
  }

  const qs = urlParams.toString();
  return qs ? `/biens?${qs}` : '/biens';
});

export const getLastSearch = () => localStorage.getItem(LAST_SEARCH_KEY);

// === Setters ===

$searchUrl.listen((url) => localStorage.setItem(LAST_SEARCH_KEY, url));