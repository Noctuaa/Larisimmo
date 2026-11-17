import type { Dpe } from '../types/property';

/** Couleur de chaque classe énergie (A = vert, G = rouge). Classes Tailwind écrites en entier pour qu'il les repère */
export const dpeColors: Record<Dpe, string> = {
  A: 'bg-green-700 text-white',
  B: 'bg-green-500 text-gray-900',
  C: 'bg-lime-400 text-gray-900',
  D: 'bg-yellow-300 text-gray-900',
  E: 'bg-amber-400 text-gray-900',
  F: 'bg-orange-500 text-gray-900',
  G: 'bg-red-600 text-white',
};
