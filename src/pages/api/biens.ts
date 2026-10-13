import type { APIRoute } from 'astro';
import properties from '../../data/biens.json';
import type { Property } from '../../types/property';
import { filterProperties } from '../../utils/filterProperties';

export const prerender = false;

export const GET: APIRoute = ({ url }) => {
  const params = url.searchParams;

  const filters = {
    ville: params.get('ville') ?? '',
    type: params.get('type') ?? '',
    transaction: params.get('transaction') ?? '',
    prixMin: params.get('prixMin') ?? '',
    prixMax: params.get('prixMax') ?? '',
    chambresMin: params.get('chambresMin') ?? '',
    chambresMax: params.get('chambresMax') ?? '',
    piecesMin: params.get('piecesMin') ?? '',
    piecesMax: params.get('piecesMax') ?? '',
    surfaceMin: params.get('surfaceMin') ?? '',
    surfaceMax: params.get('surfaceMax') ?? '',
    dpe: params.get('dpe') ?? '',
    meuble: params.get('meuble') ?? '',
    equipements: params.getAll('equipements'),
  };

  const result = filterProperties(properties as Property[], filters, Number(params.get('page')) || 1);

  return new Response(JSON.stringify(result), {
    headers: { 'Content-Type': 'application/json' },
  });
};