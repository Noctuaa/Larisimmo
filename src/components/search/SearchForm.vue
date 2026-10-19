<script setup lang="ts">
  import { computed, onMounted, ref, watch } from 'vue';
  import { useStore } from '@nanostores/vue';
  import type { Filters } from '@/types/filters';
  import { navigate } from 'astro:transitions/client';
  import { $filters, $searchUrl, resetFilters } from '@/stores/filters';
  import { countActiveFilters } from '@/utils/countActiveFilters';
  import { filterOptions } from '@/utils/filterOptions';
  import FilterSelect from './filters/FilterSelect.vue';
  import FilterTrigger from './filters/FilterTrigger.vue';
  import FilterButton from './filters/FilterButton.vue';
  import FilterChoice from './filters/FilterChoice.vue';
  import FilterRange from './filters/FilterRange.vue';
  import FilterNumberRange from './filters/FilterNumberRange.vue';

  const props = defineProps<{ filters: Filters; cities: string[]; total: number }>();
  let searchTimer: number;
  let ownSearch = false; // vrai pendant qu'une recherche lancée par ce formulaire est en route

  const panel = ref<HTMLElement | null>(null);
  const storeFilters = useStore($filters);

  const cityOptions = computed(() => props.cities.map((city) => ({ label: city, value: city })));

  // Le serveur envoie les filtres de l'adresse : au démarrage (navigateur seulement), on les copie dans le store
  if (!import.meta.env.SSR) $filters.set({ ...props.filters });

  // Quand un filtre change : on attend 300 ms, puis on va à la nouvelle adresse (si elle est différente)
  // prettier-ignore
  watch(storeFilters, () => {
    clearTimeout(searchTimer);
    searchTimer = window.setTimeout(() => {
      const url = $searchUrl.get();
      if (url === location.pathname + location.search) return;
      ownSearch = true;
      navigate(url, { history: 'replace' });
    }, 300);
  }, { deep: true });

  // Nouvelle page : si ce n'est pas notre propre recherche (lien, bouton retour), on recopie les filtres du serveur
  // prettier-ignore
  watch(() => props.filters, (serverFilters) => {
    if (ownSearch) ownSearch = false;
    else $filters.set({ ...serverFilters });
  });

  // Pendant un changement de page, on coupe l'animation du panneau (Astro le déplace dans la nouvelle page)
  onMounted(() => {
    document.addEventListener('astro:before-swap', () => panel.value?.setAttribute('data-no-anim', ''));
    document.addEventListener('astro:page-load', () => {
      requestAnimationFrame(() => requestAnimationFrame(() => panel.value?.removeAttribute('data-no-anim')));
    });
  });
</script>

<template>
  <div role="search" class="search-form container flex flex-col gap-4 py-4 lg:flex-row lg:flex-wrap lg:items-end lg:gap-y-0">
    <FilterSelect
      name="ville"
      label="Choisir la localisation"
      placeholder="Toutes les localisations"
      :options="cityOptions"
      :selected="filters.ville"
    />
    <FilterTrigger
      name="transaction"
      label="Achat ou location"
      placeholder="Peu importe"
      :options="filterOptions.transaction"
      :selected="filters.transaction"
    />
    <FilterTrigger name="type" label="Type de bien" placeholder="Tous les types" :options="filterOptions.type" :selected="filters.type" />
    <FilterButton :initial-count="countActiveFilters(filters)" />

    <!-- Panneau latéral des filtres -->
    <div ref="panel" popover id="more-filters" class="more-filters-popover">
      <div class="flex h-full flex-col">
        <header class="flex items-center justify-between border-b border-gray-300 px-6 py-4">
          <span class="text-lg font-bold text-primary">Tous les filtres</span>
          <button
            type="button"
            popovertarget="more-filters"
            popovertargetaction="hide"
            class="flex h-9 w-9 items-center justify-center rounded-full text-lg text-gray-700 hover:bg-gray-100"
            aria-label="Fermer"
          >
            ✕
          </button>
        </header>

        <div class="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-6">
          <section class="filter-section">
            <h3>Achat ou location</h3>
            <FilterChoice name="transaction" :options="filterOptions.transaction" :selected="filters.transaction" />
          </section>

          <section class="filter-section">
            <h3>Type de bien</h3>
            <FilterChoice name="type" :options="filterOptions.type" :selected="filters.type" />
          </section>

          <section class="filter-section">
            <h3>Prix</h3>
            <FilterNumberRange name="prix" unit="€" :min="filters.prixMin" :max="filters.prixMax" />
          </section>

          <section class="filter-section">
            <h3>Chambres</h3>
            <FilterRange name="chambres" :min="filters.chambresMin" :max="filters.chambresMax" />
          </section>

          <section class="filter-section">
            <h3>Pièces</h3>
            <FilterRange name="pieces" :min="filters.piecesMin" :max="filters.piecesMax" />
          </section>

          <section class="filter-section">
            <h3>Surface</h3>
            <FilterNumberRange name="surface" unit="m²" :min="filters.surfaceMin" :max="filters.surfaceMax" />
          </section>

          <section class="filter-section">
            <h3>Meublé / Non meublé</h3>
            <FilterChoice name="meuble" :options="filterOptions.meuble" :selected="filters.meuble" />
          </section>

          <section class="filter-section">
            <h3>Classe énergie</h3>
            <FilterChoice name="dpe" :options="filterOptions.dpe" :selected="filters.dpe" />
          </section>

          <section class="filter-section">
            <h3>Équipements</h3>
            <FilterChoice name="equipements" :options="filterOptions.equipements" :selected="filters.equipements" multiple />
          </section>
        </div>

        <footer class="flex items-center justify-between border-t border-gray-300 px-6 py-4">
          <button type="button" class="btn btn-secondary" @click="resetFilters">Effacer</button>
          <button type="button" popovertarget="more-filters" popovertargetaction="hide" class="btn btn-primary">Rechercher ({{ total }})</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<style>
  .more-filters-popover {
    inset: 0 0 0 auto;
    margin: 0;
    width: min(480px, 100vw);
    height: 100dvh;
    max-height: none;
    border: none;
    border-radius: 0;
    padding: 0;
    overflow: hidden;
    box-shadow: 0 10px 40px rgb(0 0 0 / 0.15);
    transform: translateX(100%);
    transition:
      transform 0.25s ease-out,
      display 0.25s allow-discrete,
      overlay 0.25s allow-discrete;
  }

  .more-filters-popover:popover-open {
    transform: translateX(0);

    @starting-style {
      transform: translateX(100%);
    }
  }

  /* Posé par le script pendant un changement de page : évite que l'animation se rejoue quand Astro déplace le panneau */
  .more-filters-popover[data-no-anim],
  .more-filters-popover[data-no-anim]::backdrop {
    transition: none;
  }

  .more-filters-popover::backdrop {
    background: rgb(0 0 0 / 0.4);
    opacity: 0;
    transition: opacity 0.25s ease-out;
  }

  .more-filters-popover:popover-open::backdrop {
    opacity: 1;

    @starting-style {
      opacity: 0;
    }
  }
</style>
