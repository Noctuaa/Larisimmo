<script setup lang="ts">
  import { computed } from 'vue';
  import { useStore } from '@nanostores/vue';
  import { $filters } from '../../stores/filters';
  import { type Filters } from '../../types/filters';

  const props = defineProps<{
    name: 'surface' | 'prix';
    unit: string;
    min?: string;
    max?: string;
    fieldClass: string;
    labelClass: string;
  }>();

  const filters = useStore($filters);

  const minKey = `${props.name}Min` as keyof Filters;
  const maxKey = `${props.name}Max` as keyof Filters;

  const currentMin = computed(() => import.meta.env.SSR ? props.min : filters.value[minKey]);
  const currentMax = computed(() => import.meta.env.SSR ? props.max : filters.value[maxKey]);

  const update = (key: keyof Filters, event: Event) => {
    const input = event.target as HTMLInputElement;
    const digits = input.value.replace(/\D/g, '');
    input.value = digits;
    $filters.setKey(key, digits);
  };

</script>

<template>
  <div class="flex gap-4">
    <div class="flex flex-col">
      <label :for="`filter-${name}-min`" :class="labelClass">Min.</label>
      <div class="relative flex items-center gap-2">
        <input
          type="text"
          inputmode="numeric"
          :id="`filter-${name}-min`"
          :value="currentMin"
          :class="[fieldClass, 'pr-10']"
          @input="update(minKey, $event)"
        />
          <span class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">{{ unit }}</span>
      </div>
    </div>
    <div class="flex flex-col">
      <label :for="`filter-${name}-max`" :class="labelClass">Max.</label>
      <div class="relative flex items-center gap-2">
        <input type="text" inputmode="numeric" :id="`filter-${name}-max`" :value="currentMax" :class="[fieldClass, 'pr-10']" @input="update(maxKey, $event)" />
        <span class="text-sm text-gray-500">{{ unit }}</span>
      </div>
    </div>
  </div>
</template>