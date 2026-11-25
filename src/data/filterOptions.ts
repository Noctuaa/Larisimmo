import type { PropertyType } from '@/schemas/property';

/** `label` : texte affiché à l'utilisateur ; `value` : ce qui circule dans l'adresse et les données */
export const filterOptions = {
  ville: [
    { label: 'Annecy', value: 'Annecy' },
    { label: 'Bordeaux', value: 'Bordeaux' },
    { label: 'Lille', value: 'Lille' },
    { label: 'Lyon', value: 'Lyon' },
    { label: 'Marseille', value: 'Marseille' },
    { label: 'Nantes', value: 'Nantes' },
    { label: 'Paris', value: 'Paris' },
    { label: 'Strasbourg', value: 'Strasbourg' },
    { label: 'Toulouse', value: 'Toulouse' },
  ],
  transaction: [
    { label: 'Achat', value: 'sale' },
    { label: 'Location', value: 'rent' },
  ],
  type: [
    { label: 'Maison', value: 'house' },
    { label: 'Chalet', value: 'chalet' },
    { label: 'Appartement', value: 'apartment' },
  ],
  meuble: [
    // texte et non booléen : l'adresse ne contient que du texte
    { label: 'Meublé', value: 'true' },
    { label: 'Non meublé', value: 'false' },
  ],
  dpe: [
    { label: 'A', value: 'A' },
    { label: 'B', value: 'B' },
    { label: 'C', value: 'C' },
    { label: 'D', value: 'D' },
    { label: 'E', value: 'E' },
    { label: 'F', value: 'F' },
    { label: 'G', value: 'G' },
  ],
  equipements: [
    { label: 'Parking', value: 'parking' },
    { label: 'Terrasse', value: 'terrace' },
    { label: 'Jardin', value: 'garden' },
    { label: 'Piscine', value: 'pool' },
    { label: 'Ascenseur', value: 'elevator' },
    { label: 'Cave', value: 'cellar' },
    { label: 'Grenier', value: 'attic' },
    { label: 'Climatisation', value: 'air_conditioning' },
    { label: 'Cheminée', value: 'fireplace' },
    { label: 'Chauffage au sol', value: 'underfloor_heating' },
    { label: 'Cuisine équipée', value: 'equipped_kitchen' },
  ],
}

/** Libellé français d'un type de bien, pour l'afficher sur les cartes (la valeur technique est en anglais) */
export const propertyTypeLabels: Record<PropertyType, string> = {
  apartment: 'Appartement',
  house: 'Maison',
  chalet: 'Chalet',
};
