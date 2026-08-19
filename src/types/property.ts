export type PropertyType = 'Appartement' | 'Maison' | 'Chalet';
export type Transaction = 'vente' | 'location';
export type Tag = 'Nouveau' | 'Bon plan' | 'Coup de cœur';
export type Status = 'disponible' | 'vendu' | 'en pause';

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
  description: string;
  photos: { compacte: string; grande: string }[];
  equipements: string[];
  dpe: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
  etiquettes: Tag[];
  statut: Status;
}
