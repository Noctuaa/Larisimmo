<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { BedDouble, Building2, DoorOpen, Euro, Key, ListChecks, Ruler, Sofa, Zap } from '@lucide/vue';

  import type { Filters } from '@/types/filters';
  import { resetFilters } from '@/stores/filters';
  import { filterOptions } from '@/data/filterOptions';

  import PanelSection from './PanelSection.vue';
  import FilterChoice from './filters/FilterChoice.vue';
  import FilterRangePills from './filters/FilterRangePills.vue';
  import FilterRangeInputs from './filters/FilterRangeInputs.vue';
  import FilterDpePills from './filters/FilterDpePills.vue';

  const { filters, total } = defineProps<{ filters: Filters; total: number }>();

  const panel = ref<HTMLElement | null>(null);
  const disableAnimation = () => panel.value?.setAttribute('data-no-anim', '');
  const enableAnimation = () => requestAnimationFrame(() => requestAnimationFrame(() => panel.value?.removeAttribute('data-no-anim')));

  /** Coupe l'animation du panneau pendant un changement de page, puis la réactive (Astro déplace le panneau dans la nouvelle page) */
  const watchPanelChanges = () => {
    document.addEventListener('astro:before-swap', disableAnimation);
    document.addEventListener('astro:page-load', enableAnimation);
  };

  onMounted(watchPanelChanges);
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
        <!-- Achat ou location -->
        <PanelSection title="Achat ou location" :icon="Key">
          <FilterChoice name="transaction" required :options="filterOptions.transaction" :selected="filters.transaction" />
        </PanelSection>

        <!-- Type de bien -->
        <PanelSection title="Type de bien" :icon="Building2">
          <FilterChoice name="type" :options="filterOptions.type" :selected="filters.type" multiple />
        </PanelSection>

        <!-- Prix -->
        <PanelSection title="Prix" :icon="Euro">
          <FilterRangeInputs name="prix" unit="€" :min="filters.prixMin" :max="filters.prixMax" />
        </PanelSection>

        <!-- Chambres -->
        <PanelSection title="Chambres" :icon="BedDouble">
          <FilterRangePills name="chambres" :min="filters.chambresMin" :max="filters.chambresMax" />
        </PanelSection>

        <!-- Pièces -->
        <PanelSection title="Pièces" :icon="DoorOpen">
          <FilterRangePills name="pieces" :min="filters.piecesMin" :max="filters.piecesMax" />
        </PanelSection>

        <!-- Surface -->
        <PanelSection title="Surface" :icon="Ruler">
          <FilterRangeInputs name="surface" unit="m²" :min="filters.surfaceMin" :max="filters.surfaceMax" />
        </PanelSection>

        <!-- Meublé / Non meublé -->
        <PanelSection title="Meublé / Non meublé" :icon="Sofa">
          <FilterChoice name="meuble" :options="filterOptions.meuble" :selected="filters.meuble" />
        </PanelSection>

        <!-- Classe énergétique -->
        <PanelSection title="Classe énergétique (DPE)" :icon="Zap">
          <FilterDpePills :options="filterOptions.dpe" :selected="filters.dpe" />
        </PanelSection>

        <!-- Equipements -->
        <PanelSection title="Équipements" :icon="ListChecks">
          <FilterChoice name="equipements" :options="filterOptions.equipements" :selected="filters.equipements" multiple />
        </PanelSection>
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
