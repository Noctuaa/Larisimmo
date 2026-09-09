// Ouvre/ferme le panneau de recherche (#search-panel) via #search-trigger / #search-close.
// Partagé entre SearchBar (homepage) et SearchForm (/biens), qui utilisent tous les deux les
// mêmes ids pour ce panneau.
//
// Délégation sur document plutôt que des références capturées une fois : avec <ClientRouter />
// ce script ne s'exécute qu'une seule fois pour tout le site, alors que trigger/closeBtn/panel
// sont remplacés par de nouveaux éléments à chaque navigation qui revient sur une page
// contenant l'un de ces composants.
const hiddenClasses = ['-translate-y-full', 'pointer-events-none'];

const toggleSearch = () => {
  const panel = document.getElementById('search-panel');
  const isHidden = panel?.classList.contains('-translate-y-full');
  panel?.classList[isHidden ? 'remove' : 'add'](...hiddenClasses);
  document.body.classList.toggle('overflow-hidden');
};

document.addEventListener('click', (e) => {
  const target = (e.target as HTMLElement).closest('#search-trigger, #search-close');
  if (target) toggleSearch();
});
