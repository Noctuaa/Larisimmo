import type { Filters } from '../types/filters';
import { RANGE_NAMES, withOrderedRanges } from './orderRange';

/** Nom de chaque filtre simple dans l'adresse (dans le code, ils gardent leur nom français) */
const URL_KEYS = {
  ville: 'city',
  transaction: 'transaction',
  type: 'type',
  dpe: 'energy',
  meuble: 'furnished',
  equipements: 'amenities',
} as const;

/** Nom de chaque plage dans l'adresse : `price=15500-20000` pour `prixMin` et `prixMax`
 * (`15500-max` ou `min-20000` quand il en manque un) */
const RANGE_URL_KEYS = {
  prix: 'price',
  surface: 'area',
  chambres: 'bedrooms',
  pieces: 'rooms',
} as const;

/** Lit une plage de l'adresse, comme Leboncoin : `15500-20000` donne `['15500', '20000']`,
 * `15500-max` donne `['15500', '']` (minimum seul), `min-20000` donne `['', '20000']` (maximum seul),
 * et une valeur seule sans tiret (`500`) veut dire exactement cette valeur.
 * On ne garde que les chiffres : `min` et `max` deviennent vides */
const readRange = (value: string | null): [string, string] => {
  if (!value) return ['', ''];
  const [min = '', max = ''] = value.includes('-') ? value.split('-') : [value, value];
  return [min.replace(/\D/g, ''), max.replace(/\D/g, '')];
};

/** Lit les filtres dans l'adresse (côté serveur).
 * Un minimum plus grand que le maximum, écrit à la main, est remis dans l'ordre */
export const parseFilters = (params: URLSearchParams): Filters => {
  const [prixMin, prixMax] = readRange(params.get(RANGE_URL_KEYS.prix));
  const [surfaceMin, surfaceMax] = readRange(params.get(RANGE_URL_KEYS.surface));
  const [chambresMin, chambresMax] = readRange(params.get(RANGE_URL_KEYS.chambres));
  const [piecesMin, piecesMax] = readRange(params.get(RANGE_URL_KEYS.pieces));

  return withOrderedRanges({
    ville: params.get(URL_KEYS.ville) ?? '',
    transaction: params.get(URL_KEYS.transaction) ?? '',
    // Types de bien : coché = plusieurs `type=` dans l'adresse, le bien doit être de l'un d'eux
    type: params.getAll(URL_KEYS.type),
    prixMin,
    prixMax,
    chambresMin,
    chambresMax,
    piecesMin,
    piecesMax,
    surfaceMin,
    surfaceMax,
    dpe: params.get(URL_KEYS.dpe) ?? '',
    meuble: params.get(URL_KEYS.meuble) ?? '',
    // Équipements : coché = plusieurs `amenities=` dans l'adresse, le bien doit tous les avoir
    equipements: params.getAll(URL_KEYS.equipements),
  });
};

/** Fabrique l'adresse d'une recherche : `/biens?city=Lyon&price=15500-20000`,
 * ou `/biens` quand aucun filtre n'est rempli.
 * Un minimum plus grand que le maximum est remis dans l'ordre ici,
 * sans toucher aux champs que l'utilisateur est en train de remplir */
export const buildSearchUrl = (filters: Filters, path: string): string => {
  const ordered = withOrderedRanges(filters);
  const urlParams = new URLSearchParams();

  // Les filtres simples d'abord ; une liste (équipements) donne un paramètre par élément, un filtre vide est ignoré
  for (const key of Object.keys(URL_KEYS) as (keyof typeof URL_KEYS)[]) {
    const value = ordered[key];
    if (Array.isArray(value)) value.forEach((v) => urlParams.append(URL_KEYS[key], v));
    else if (value) urlParams.append(URL_KEYS[key], value);
  }

  // Puis chaque plage en un seul paramètre, dès qu'il y a un minimum ou un maximum (`min` ou `max` s'il en manque un)
  for (const name of RANGE_NAMES) {
    const min = ordered[`${name}Min`];
    const max = ordered[`${name}Max`];
    if (min || max) urlParams.append(RANGE_URL_KEYS[name], `${min || 'min'}-${max || 'max'}`);
  }

  const qs = urlParams.toString();
  return qs ? `${path}?${qs}` : path;
};
