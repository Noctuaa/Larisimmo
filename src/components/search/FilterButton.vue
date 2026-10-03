<script setup lang="ts">
  import { computed } from 'vue';
  import { useStore } from '@nanostores/vue';
  import { $filters } from '../../stores/filters';

  const props = defineProps<{
    initialCount: number;
    fieldClass: string;
  }>();

  const filters = useStore($filters);

  const count = computed(() => {
    if (import.meta.env.SSR) return props.initialCount;

    const f = filters.value;
    return [
      f.transaction,
      f.type,
      f.chambresMin || f.chambresMax,
      f.piecesMin || f.piecesMax,
      f.surfaceMin || f.surfaceMax,
      f.meuble,
      f.dpe,
      f.equipements.length,
    ].filter(Boolean).length;
  });
</script>

<template>
  <button type="button" popovertarget="more-filters" :class="[fieldClass, 'flex items-center gap-2 hover:bg-gray-50']">
    Filtres
    <span v-if="count > 0" class="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-xs font-bold text-white">
      {{ count }}
    </span>
  </button>
</template>