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
    { label: 'Achat', value: 'vente' },
    { label: 'Location', value: 'location' },
  ],
  type: [
    { label: 'Maison', value: 'maison' },
    { label: 'Chalet', value: 'chalet' },
    { label: 'Appartement', value: 'appartement' },
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
    { label: 'Terrasse', value: 'terrasse' },
    { label: 'Jardin', value: 'jardin' },
    { label: 'Piscine', value: 'piscine' },
    { label: 'Ascenseur', value: 'ascenseur' },
    { label: 'Cave', value: 'cave' },
    { label: 'Grenier', value: 'grenier' },
    { label: 'Climatisation', value: 'climatisation' },
    { label: 'Cheminée', value: 'cheminee' },
    { label: 'Chauffage au sol', value: 'chauffage_au_sol' },
    { label: 'Cuisine équipée', value: 'cuisine_equipee' },
  ],
}