import { map } from 'nanostores';

export type Filters = {
  transaction: string;
  ville: string;
  type: string;
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

export const $filters = map<Filters>({
  transaction: '',
  ville: '',
  type: '',
  chambresMin: '',
  chambresMax: '',
  piecesMin: '',
  piecesMax: '',
  surfaceMin: '',
  surfaceMax: '',
  dpe: '',
  meuble: '',
  equipements: [],
});

if (typeof window !== 'undefined') {
  const params = new URLSearchParams(window.location.search);
  for (const key of Object.keys($filters.get()) as (keyof Filters)[]) {
    $filters.setKey(key, key === 'equipements' ? params.getAll(key) : (params.get(key) ?? ''));
  }
}