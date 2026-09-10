// Soumission des formulaires de recherche (.search-form) — partagé entre SearchBar (homepage)
// et SearchForm (/biens).
//
// - `submit` (bouton "Rechercher") : navigation client-side via ClientRouter vers une URL propre
//   (champs vides retirés, valeurs multiples conservées pour les équipements).
// - `change` sur un form marqué `[data-live]` (/biens uniquement) : relance la recherche dès
//   qu'un filtre change, sans quitter la position de scroll — comportement SeLoger/Leboncoin.
//
// Délégation sur document plutôt qu'une référence capturée une fois : voir searchPanelToggle.ts
// pour le pourquoi (<ClientRouter /> exécute ce script une seule fois pour tout le site).
import { navigate } from 'astro:transitions/client';

// Construit /biens?... à partir des champs remplis. `append` (pas `set`) pour garder les
// valeurs multiples d'un même name (equipements=Garage&equipements=Jardin).
function biensUrl(form: HTMLFormElement): string {
  const params = new URLSearchParams();
  for (const [key, value] of new FormData(form)) {
    if (value) params.append(key, String(value));
  }
  const qs = params.toString();
  return qs ? `/biens?${qs}` : '/biens';
}

// "Rechercher" : recherche explicite, on repart du haut de la liste
document.addEventListener('submit', (e) => {
  const form = (e.target as HTMLElement).closest<HTMLFormElement>('.search-form');
  if (!form) return;

  e.preventDefault();
  navigate(biensUrl(form));
});

// Mise à jour en direct (/biens) : un select change → immédiat ; un input → au blur.
// On restaure la position de scroll après le chargement pour ne pas être ramené en haut.
// (astro:page-load, pas astro:after-swap : ClientRouter remet le scroll à 0 après le swap,
// donc il faut repasser derrière lui.)
document.addEventListener('change', (e) => {
  const form = (e.target as HTMLElement).closest<HTMLFormElement>('.search-form[data-live]');
  if (!form) return;

  const y = window.scrollY;
  document.addEventListener('astro:page-load', () => window.scrollTo(0, y), { once: true });
  navigate(biensUrl(form), { history: 'replace' });
});
