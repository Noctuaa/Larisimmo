import { computed, map } from 'nanostores';
import type { Filters } from '../types/filters';
import { countActiveFilters } from '../utils/countActiveFilters';

// #region State

/** État de départ : tous les filtres vides. On le garde à part pour pouvoir remettre le formulaire à zéro */
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

/** Clé du navigateur (localStorage) où l'on garde la dernière recherche. */
const LAST_SEARCH_KEY = 'larisimmo:lastSearch';

/** Page de recherche (utilisée pour fabriquer les adresses) */
const SEARCH_PATH = '/biens';

export const $filters = map<Filters>({ ...initialFilters });

// #endregion

// #region Actions

/** Remet tous les filtres à zéro, sauf la ville (elle est dans la barre du haut, pas dans le panneau). */
export const resetFilters = () => $filters.set({ ...initialFilters, ville: $filters.get().ville });

// #endregion

// #region Getters

/** Nombre de filtres actifs (badge du bouton « Filtres »), recalculé tout seul à chaque changement */
export const $activeFiltersCount = computed($filters, countActiveFilters);

/** Adresse de la recherche : `/biens?type=maison&…`, ou `/biens` quand aucun filtre n'est rempli */
export const $searchUrl = computed($filters, (filters) => {
  const urlParams = new URLSearchParams();

  // On ajoute chaque filtre rempli à l'adresse ; une liste (équipements) donne un paramètre par élément, un filtre vide est ignoré.
  for (const [key, value] of Object.entries(filters)) {
    if (Array.isArray(value)) value.forEach((v) => urlParams.append(key, v));
    else if (value) urlParams.append(key, value);
  }

  const qs = urlParams.toString();
  return qs ? `${SEARCH_PATH}?${qs}` : SEARCH_PATH;
});

/** Dernière recherche mémorisée dans le navigateur (lue par « Continuer ma recherche » sur l'accueil) */
export const getLastSearch = () => localStorage.getItem(LAST_SEARCH_KEY);

// #endregion

// #region Effects

// Écoute permanente (pas liée à un composant) : à chaque changement de recherche, on la mémorise
$searchUrl.listen((url) => localStorage.setItem(LAST_SEARCH_KEY, url));

// #endregion