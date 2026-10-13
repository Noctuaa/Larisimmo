import { atom, map } from 'nanostores';
import type { Property } from '../types/property';

export const $results = map<{
  items: Property[];
  total: number;
  page: number;
  totalPages: number;
}>({
  items: [],
  total: 0,
  page: 1,
  totalPages: 1,
});

export const $isLoading = atom(false);