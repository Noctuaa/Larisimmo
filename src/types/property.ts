export type PropertyType = 'Appartement' | 'Maison' | 'Chalet';
export type Transaction = 'vente' | 'location';
export type Tag = 'Nouveau' | 'Bon plan' | 'Coup de cœur';
export type Status = 'disponible' | 'vendu' | 'en pause';

// Ordre du meilleur au pire : sert à la fois d'options du <select> (SearchForm) et de règle de
// comparaison "X ou mieux" pour le filtre (biens/index.astro)
export const DPE_CLASSES = ['A', 'B', 'C', 'D', 'E', 'F', 'G'] as const;
export type Dpe = (typeof DPE_CLASSES)[number];

export interface Property {
  id: string;
  titre: string;
  type: PropertyType;
  transaction: Transaction;
  prix: number;
  ville: string;
  adresse: string;
  surface: number;
  pieces: number;
  chambres: number;
  sallesDeBain: number;
  meuble: boolean;
  description: string;
  photos: { compacte: string; grande: string }[];
  equipements: string[];
  dpe: Dpe;
  etiquettes: Tag[];
  statut: Status;
}
