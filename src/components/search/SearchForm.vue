<script setup lang="ts">
  import { computed, onMounted } from 'vue';
  import type { Filters } from '@/types/filters';
  import { navigate } from 'astro:transitions/client';
  import { $filters, $searchUrl } from '@/stores/filters';
  import { countActiveFilters } from '@/utils/countActiveFilters';
  import FilterSelect from './filters/FilterSelect.vue';
  import FilterTrigger from './filters/FilterTrigger.vue';
  import FilterButton from './filters/FilterButton.vue';

  const props = defineProps<{ filters: Filters; cities: string[] }>();
  let searchTimer: number;

  const transactions = [
    { label: 'Achat', value: 'vente' },
    { label: 'Location', value: 'location' },
  ];
  const propertyTypes = ['Appartement', 'Maison', 'Chalet'].map((type) => ({ label: type, value: type }));
  const cityOptions = computed(() => props.cities.map((city) => ({ label: city, value: city })));

  onMounted(() => {
    $filters.listen(() => {
      clearTimeout(searchTimer);
      searchTimer = window.setTimeout(() => navigate($searchUrl.get(), { history: 'replace' }), 300);
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
    <FilterTrigger name="transaction" label="Achat ou location" placeholder="Peu importe" :options="transactions" :selected="filters.transaction" />
    <FilterTrigger name="type" label="Type de bien" placeholder="Tous les types" :options="propertyTypes" :selected="filters.type" />
    <FilterButton :initial-count="countActiveFilters(filters)" />

    <slot />
  </div>
</template>
