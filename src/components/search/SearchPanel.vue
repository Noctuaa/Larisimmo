<script setup lang="ts">
  import { BedDouble, Building2, DoorOpen, Euro, Key, ListChecks, Ruler, Sofa, Zap } from '@lucide/vue';

  import type { Filters } from '@/types/filters';
  import { resetFilters } from '@/stores/filters';
  import { filterOptions } from '@/data/filterOptions';

  import FilterChoice from './filters/FilterChoice.vue';
  import FilterRangePills from './filters/FilterRangePills.vue';
  import FilterRangeInputs from './filters/FilterRangeInputs.vue';
  import FilterDpePills from './filters/FilterDpePills.vue';

  defineProps<{ filters: Filters; total: number }>();
</script>

<template>
  <!-- Panneau latéral des filtres -->
  <div ref="panel" popover id="more-filters" class="more-filters-popover">
    <div class="flex h-full flex-col">
      <header class="flex items-center justify-between border-b border-gray-300 px-6 py-4">
        <span class="text-lg font-bold text-primary">Tous les filtres</span>
        <button
          type="button"
          popovertarget="more-filters"
          popovertargetaction="hide"
          class="flex size-11 items-center justify-center rounded-full text-lg text-gray-700 hover:bg-gray-100"
          aria-label="Fermer"
        >
          ✕
        </button>
      </header>

      <div class="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-6">
        <section class="filter-section">
          <h3 class="flex items-center gap-2">
            <span class="section-icon"><Key class="size-4" aria-hidden="true" /></span>
            Achat ou location
          </h3>
          <FilterChoice name="transaction" required :options="filterOptions.transaction" :selected="filters.transaction" />
        </section>

        <section class="filter-section">
          <h3 class="flex items-center gap-2">
            <span class="section-icon"><Building2 class="size-4" aria-hidden="true" /></span>
            Type de bien
          </h3>
          <FilterChoice name="type" :options="filterOptions.type" :selected="filters.type" multiple />
        </section>

        <section class="filter-section">
          <h3 class="flex items-center gap-2">
            <span class="section-icon">
              <Euro class="size-4" aria-hidden="true" />
            </span>
            Prix
          </h3>
          <FilterRangeInputs name="prix" unit="€" :min="filters.prixMin" :max="filters.prixMax" />
        </section>

        <section class="filter-section">
          <h3 class="flex items-center gap-2">
            <span class="section-icon"><BedDouble class="size-4" aria-hidden="true" /></span>
            Chambres
          </h3>
          <FilterRangePills name="chambres" :min="filters.chambresMin" :max="filters.chambresMax" />
        </section>

        <section class="filter-section">
          <h3 class="flex items-center gap-2">
            <span class="section-icon"><DoorOpen class="size-4" aria-hidden="true" /></span>
            Pièces
          </h3>
          <FilterRangePills name="pieces" :min="filters.piecesMin" :max="filters.piecesMax" />
        </section>

        <section class="filter-section">
          <h3 class="flex items-center gap-2">
            <span class="section-icon"><Ruler class="size-4" aria-hidden="true" /></span>
            Surface
          </h3>
          <FilterRangeInputs name="surface" unit="m²" :min="filters.surfaceMin" :max="filters.surfaceMax" />
        </section>

        <section class="filter-section">
          <h3 class="flex items-center gap-2">
            <span class="section-icon"><Sofa class="size-4" aria-hidden="true" /></span>
            Meublé / Non meublé
          </h3>
          <FilterChoice name="meuble" :options="filterOptions.meuble" :selected="filters.meuble" />
        </section>

        <section class="filter-section">
          <h3 class="flex items-center gap-2">
            <span class="section-icon"><Zap class="size-4" aria-hidden="true" /></span>
            Classe énergétique (DPE)
          </h3>
          <FilterDpePills :options="filterOptions.dpe" :selected="filters.dpe" />
        </section>

        <section class="filter-section">
          <h3 class="flex items-center gap-2">
            <span class="section-icon"><ListChecks class="size-4" aria-hidden="true" /></span>
            Equipements
          </h3>
          <FilterChoice name="equipements" :options="filterOptions.equipements" :selected="filters.equipements" multiple />
        </section>
      </div>

      <footer class="flex items-center justify-between border-t border-gray-300 px-6 py-4">
        <button type="button" class="btn btn-secondary" @click="resetFilters">Effacer</button>
        <button type="button" popovertarget="more-filters" popovertargetaction="hide" class="btn btn-primary">Rechercher ({{ total }})</button>
      </footer>
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
