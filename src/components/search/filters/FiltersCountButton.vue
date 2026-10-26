<script setup lang="ts">
  import { computed } from 'vue';
  import { useStore } from '@nanostores/vue';
  import { $activeFiltersCount } from '@/stores/filters';

  const props = defineProps<{
    initialCount: number;
  }>();

  const activeCount = useStore($activeFiltersCount);

  /** Serveur : le nombre vient de l'adresse (prop) ; navigateur : il vient du store, mis à jour en direct (évite un clignotement du badge) */
  const count = computed(() => (import.meta.env.SSR ? props.initialCount : activeCount.value));
</script>

<template>
  <button type="button" popovertarget="more-filters" class="field flex items-center gap-2 hover:bg-gray-50">
    Filtres
    <span v-if="count > 0" class="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-xs font-bold text-white">
      {{ count }}
    </span>
  </button>
</template>
