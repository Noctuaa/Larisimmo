<script setup lang="ts">
  import { computed } from 'vue';
  import { useStore } from '@nanostores/vue';
  import { $searchResults } from '../../stores/searchResults';
  import type { Property } from '../../types/property';

  const props = defineProps<{ initial: { items: Property[] } }>();

  if (!import.meta.env.SSR) $searchResults.setKey('items', props.initial.items);

  const results = useStore($searchResults);
  const items = computed(() => (import.meta.env.SSR ? props.initial.items : results.value.items));
</script>

<template>
  <ul>
    <li v-for="property in items" :key="property.id">{{ property.ville }}</li>
  </ul>
</template>