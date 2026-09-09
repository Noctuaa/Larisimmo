// Intercepte la soumission des formulaires de recherche (.search-form) pour construire une URL
// propre vers /biens, en excluant les champs vides — un submit natif les inclurait quand même
// (ex: /biens?ville=&type=&prix=&chambres=&surface=2 au lieu de /biens?surface=2).
// Partagé entre SearchBar (homepage) et SearchForm (/biens).
//
// Délégation sur document plutôt qu'une référence capturée une fois : voir searchPanelToggle.ts
// pour le pourquoi (<ClientRouter /> exécute ce script une seule fois pour tout le site).
document.addEventListener('submit', (e) => {
  const form = (e.target as HTMLElement).closest<HTMLFormElement>('.search-form');
  if (!form) return;

  e.preventDefault();
  const data = new FormData(form);
  const params = new URLSearchParams();
  for (const [key, value] of data.entries()) {
    if (value) params.set(key, String(value));
  }
  window.location.href = `/biens?${params.toString()}`;
});
