// Bouclier "Nouvelle recherche / Continuer la recherche" de la homepage (façon SeLoger).
// Pas de compte utilisateur dans ce projet : la dernière recherche est mémorisée dans
// localStorage (par navigateur), écrite depuis le script de SearchForm.astro à chaque recherche.
export const LAST_SEARCH_KEY = 'larisimmo:lastSearch';

// Affiche/masque le bouton "Continuer la recherche" selon ce qui est en mémoire.
// astro:page-load (pas un simple appel au chargement du module) : avec <ClientRouter /> ce
// script ne s'exécute qu'une fois pour tout le site, alors que les boutons sont remplacés par
// de nouveaux éléments à chaque retour sur la homepage.
document.addEventListener('astro:page-load', () => {
  const continueLink = document.getElementById('continue-search') as HTMLAnchorElement | null;
  if (!continueLink) return; // pas sur la homepage

  const lastSearch = localStorage.getItem(LAST_SEARCH_KEY);
  if (lastSearch) {
    continueLink.href = lastSearch;
    continueLink.hidden = false;
  } else {
    continueLink.hidden = true;
  }
});
