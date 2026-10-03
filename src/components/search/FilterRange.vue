<script setup lang="ts">
  import { computed } from 'vue';
  import { useStore } from '@nanostores/vue';
  import { $filters } from '../../stores/filters';
  import { type Filters } from '../../types/filters';

  const props = defineProps<{
    name: string;
    min?: string;
    max?: string;
  }>();

  const values = [1, 2, 3, 4, 5, 6, 7, 8];

  const filters = useStore($filters);

  const minKey = `${props.name}Min` as keyof Filters;
  const maxKey = `${props.name}Max` as keyof Filters;

  const toNumber = (value: unknown) => (value ? Number(value) : null);

  const currentMin = computed(() => toNumber(import.meta.env.SSR ? props.min : filters.value[minKey]));
  const currentMax = computed(() => toNumber(import.meta.env.SSR ? props.max : filters.value[maxKey]));

  const isActive = (n: number) =>
    currentMin.value !== null && currentMax.value !== null && n >= currentMin.value && n <= currentMax.value;

  const select = (clicked: number) => {
    const min = currentMin.value;
    const max = currentMax.value;

    if (clicked === min || clicked === max) return;

    const extend = min === null || max === null || clicked < min || clicked > max;
    const newMin = extend ? Math.min(min ?? clicked, clicked) : clicked;
    const newMax = extend ? Math.max(max ?? clicked, clicked) : clicked;

    $filters.set({ ...$filters.get(), [minKey]: String(newMin), [maxKey]: String(newMax) });
  };

  const pillClass = 'flex h-10 min-w-10 cursor-pointer items-center justify-center rounded-full border border-gray-200 px-3 text-sm text-gray-700';
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <button
      v-for="n in values"
      :key="n"
      type="button"
      :aria-pressed="isActive(n)"
      :class="[pillClass, isActive(n) ? 'bg-primary text-white' : 'hover:bg-gray-50 hover:text-primary']"
      @click="select(n)"
    >
      {{ n === 8 ? '8+' : n }}
    </button>
  </div>
</template>