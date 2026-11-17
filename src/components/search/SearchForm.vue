<script setup lang="ts">
  import { onMounted, watch } from 'vue';
  import { useStore } from '@nanostores/vue';
  import { Building2, Euro, Key } from '@lucide/vue';
  import { navigate, type TransitionBeforeSwapEvent } from 'astro:transitions/client';

  import type { Filters } from '@/types/filters';
  import { $filters, $searchUrl } from '@/stores/filters';
  import { countActiveFilters } from '@/utils/countActiveFilters';
  import { filterOptions } from '@/data/filterOptions';

  import FilterSelect from './filters/FilterSelect.vue';
  import FilterTrigger from './filters/FilterTrigger.vue';
  import FiltersCountButton from './filters/FiltersCountButton.vue';
  import SearchPanel from './SearchPanel.vue';

  const SEARCH_DELAY = 300; // ms d'attente après le dernier changement de filtre

  const { filters, total } = defineProps<{ filters: Filters; total: number }>();

  let searchTimer: number;

  /** Vrai pendant qu'une recherche lancée par ce formulaire est en route et évite d'écraser ce qu'on est en train de taper */
  let ownSearch = false;

  const storeFilters = useStore($filters);

  // Le serveur envoie les filtres de l'adresse : au démarrage (navigateur seulement), on les copie dans le store
  if (!import.meta.env.SSR) $filters.set({ ...filters });

  /** Lance la recherche 300 ms après le dernier changement de filtre (si l'adresse voulue est différente de l'actuelle) */
  const startSearch = () => {
    clearTimeout(searchTimer);
    searchTimer = window.setTimeout(() => {
      const url = $searchUrl.get();
      if (url === location.pathname + location.search) return;
      ownSearch = true;
      navigate(url, { history: 'replace' });
    }, SEARCH_DELAY);
  };

  /** Nouvelle page reçue :
   * On recopie les filtres du serveur dans le store, sauf si c'est notre propre recherche (le store est déjà à jour) */
  const copyServerFilters = (serverFilters: Filters) => {
    if (ownSearch) ownSearch = false;
    else $filters.set({ ...serverFilters });
  };

  /** Gère le changement de page : fondu et saut de transition pour nos recherches */
  const watchPageChanges = () => {
    // On retient ici si le changement de page vient de notre recherche : au moment d'`after-swap`, `ownSearch` est déjà remis à faux
    let searchSwap = false;

    document.addEventListener('astro:before-swap', (event) => {
      searchSwap = ownSearch;
      // Notre propre recherche : on saute le fondu, car pendant qu'il joue la page est une « photo » qui ignore les clics.
      // Les autres changements de page (menu, pagination) gardent leur fondu
      if (searchSwap) {
        const { viewTransition } = event as TransitionBeforeSwapEvent;
        viewTransition.skipTransition();
        // Le navigateur signale cette annulation voulue par une erreur `AbortError` : on l'ignore pour garder la console propre
        viewTransition.ready.catch(() => {});
      }
    });
    // Notre propre recherche : petit fondu fait maison sur les résultats (une animation normale ne bloque pas les clics)
    document.addEventListener('astro:after-swap', () => {
      if (searchSwap) document.getElementById('results')?.animate({ opacity: [0, 1] }, { duration: 600, easing: 'ease-in-out' });
      searchSwap = false;
    });
  };

  // À chaque changement d'un filtre on relance le minuteur (`deep` : surveille aussi un seul filtre modifié dans le store)
  watch(storeFilters, () => startSearch(), { deep: true });

  // Quand le serveur envoie de nouveaux filtres (nouvelle page : lien, bouton retour ou notre propre recherche)
  watch(() => filters, copyServerFilters);

  // Pendant un changement de page, on coupe l'animation du panneau (Astro le déplace dans la nouvelle page)
  onMounted(watchPageChanges);
</script>

<template>
  <div
    role="search"
    class="search-form container grid grid-cols-[1fr_auto] items-center gap-2 py-3 lg:flex lg:flex-wrap lg:items-end lg:gap-x-4 lg:gap-y-0 lg:py-3.25"
  >
    <FilterSelect
      name="ville"
      mode="selected"
      label="Choisir la localisation"
      placeholder="Toutes les villes"
      :options="filterOptions.ville"
      :selected="filters.ville"
    />
    <div class="col-span-2 flex gap-2 overflow-x-auto scrollbar-width:none lg:contents [&::-webkit-scrollbar]:hidden">
      <FilterTrigger
        :icon="Key"
        name="transaction"
        mode="selected"
        label="Achat ou location"
        :options="filterOptions.transaction"
        :selected="filters.transaction"
      />
      <FilterTrigger :icon="Building2" name="type" mode="selected" label="Type de bien" :options="filterOptions.type" :selected="filters.type" />
      <FilterTrigger :icon="Euro" mode="range" label="Prix" :range="{ min: filters.prixMin, max: filters.prixMax }" />
    </div>

    <FiltersCountButton :initial-count="countActiveFilters(filters)" class="col-start-2 row-start-1" />
    <SearchPanel :filters="filters" :total="total" />
  </div>
</template>
