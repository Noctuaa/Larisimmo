import { computed, map } from 'nanostores';
import type { Filters } from '../types/filters';
import { countActiveFilters } from '../utils/countActiveFilters';
import { buildSearchUrl } from '../utils/filtersUrl';

// #region State

/** État de départ : tous les filtres vides. On le garde à part pour pouvoir remettre le formulaire à zéro */
const initialFilters: Filters = {
  transaction: 'vente',
  ville: '',
  type: [],
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

/** Clé du navigateur (localStorage) où l'on garde la dernière recherche. */
const LAST_SEARCH_KEY = 'larisimmo:lastSearch';

/** Page de recherche (utilisée pour fabriquer les adresses) */
const SEARCH_PATH = '/biens';

export const $filters = map<Filters>({ ...initialFilters });

// #endregion

// #region Actions

/** Remet tous les filtres à zéro, sauf la ville et le type de transaction. */
export const resetFilters = () => $filters.set({ ...initialFilters, ville: $filters.get().ville, transaction: $filters.get().transaction });

// #endregion

// #region Getters

/** Nombre de filtres actifs (badge du bouton « Filtres »), recalculé tout seul à chaque changement */
export const $activeFiltersCount = computed($filters, countActiveFilters);

/** Adresse de la recherche : `/biens?type=maison&prix=15500-20000`, ou `/biens` quand aucun filtre n'est rempli (voir `buildSearchUrl`) */
export const $searchUrl = computed($filters, (filters) => buildSearchUrl(filters, SEARCH_PATH));

/** Dernière recherche mémorisée dans le navigateur (lue par « Continuer ma recherche » sur l'accueil) */
export const getLastSearch = () => localStorage.getItem(LAST_SEARCH_KEY);

// #endregion

// #region Effects

// Écoute permanente (pas liée à un composant) : à chaque changement de recherche, on la mémorise
$searchUrl.listen((url) => localStorage.setItem(LAST_SEARCH_KEY, url));

// #endregion