<script setup lang="ts">
  import { computed } from 'vue';
  import { useStore } from '@nanostores/vue';
  import { $searchResults } from '../../stores/searchResults';

  const props = defineProps<{ initialTotal: number }>();

  if (!import.meta.env.SSR) $searchResults.setKey('total', props.initialTotal);

  const results = useStore($searchResults);
  const total = computed(() => (import.meta.env.SSR ? props.initialTotal : results.value.total));
</script>

<template>
  <p class="mt-2 text-gray-600">{{ total }} bien{{ total > 1 ? 's' : '' }} trouvé{{ total > 1 ? 's' : '' }}</p>
</template>