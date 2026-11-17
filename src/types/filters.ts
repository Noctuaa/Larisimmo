/**
 * Filtres de recherche. Tout est en texte : un champ de saisie et l'adresse ne donnent que du texte
 * (le texte vide = pas de filtre). Le type de bien et les équipements sont des listes, car on peut en cocher plusieurs.
 */
export type Filters = {
  transaction: string;
  ville: string;
  type: string[];
  prixMin: string;
  prixMax: string;
  chambresMin: string;
  chambresMax: string;
  piecesMin: string;
  piecesMax: string;
  surfaceMin: string;
  surfaceMax: string;
  dpe: string;
  meuble: string;
  equipements: string[];
};