<script setup lang="ts">
  import { computed } from 'vue';
  import { useStore } from '@nanostores/vue';
  import { $searchResults } from '../../stores/searchResults';
  import type { Property } from '../../types/property';
  import PropertyCard from '../cards/PropertyCard.vue';

  const props = defineProps<{ initial: { items: Property[] } }>();

  if (!import.meta.env.SSR) $searchResults.setKey('items', props.initial.items);

  const results = useStore($searchResults);
  const items = computed(() => (import.meta.env.SSR ? props.initial.items : results.value.items) as Property[]);
</script>

<template>
  <p v-if="items.length === 0" class="text-center text-gray-500">Aucun bien ne correspond à votre recherche.</p>
  <ul v-else class="grid grid-fill gap-8">
    <li v-for="property in items" :key="property.id">
      <PropertyCard :property="property" />
    </li>
  </ul>
</template>