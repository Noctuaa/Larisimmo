import type { Dpe, PropertyType, Transaction } from '@/schemas/property';

export type Tag = 'Nouveau' | 'Bon plan' | 'Coup de cœur';
export type Status = 'disponible' | 'vendu' | 'en pause';

export type { Dpe };

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
