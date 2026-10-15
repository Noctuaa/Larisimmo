<script setup lang="ts">
  import { computed } from 'vue';
  import { useStore } from '@nanostores/vue';
  import { $filters } from '@/stores/filters';
  import { type Filters } from '@/types/filters';

  const props = defineProps<{
    name: Exclude<keyof Filters, 'equipements'>;
    label: string;
    placeholder: string;
    options: { label: string; value: string }[];
    selected?: string;
  }>();

  const filters = useStore($filters);

  const current = computed(() => (import.meta.env.SSR ? props.selected : filters.value[props.name]) ?? '');

  const update = (event: Event) => {
    $filters.setKey(props.name, (event.target as HTMLSelectElement).value);
  };
</script>

<template>
  <div class="flex flex-col gap-1">
    <label :for="`filter-${name}`" class="field-label">{{ label }}</label>
    <select :id="`filter-${name}`" :value="current" class="field w-full lg:w-56" @change="update">
      <option value="">{{ placeholder }}</option>
      <option v-for="option in options" :key="option.value" :value="option.value">{{ option.label }}</option>
    </select>
  </div>
</template>
