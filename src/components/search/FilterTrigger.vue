<script setup lang="ts">
  import { computed } from 'vue';
  import { useStore } from '@nanostores/vue';
  import { $filters, type Filters } from '../../stores/filters';

  const props = defineProps<{
    name: keyof Filters;
    label: string;
    placeholder: string;
    options: { label: string; value: string }[];
    selected: string | string[];
    fieldClass: string;
    labelClass: string;
  }>();

  const filters = useStore($filters);

  const current = computed(() => (import.meta.env.SSR ? props.selected : filters.value[props.name]));

  const text = computed(() => {
  const labels = [current.value]
    .flat()
    .map((value) => props.options.find((option) => option.value === value)?.label)
    .filter(Boolean);
    return labels.length ? labels.join(', ') : props.placeholder;
  });

</script>


<template>
  <div class="flex flex-col gap-1">
    <span :class="labelClass">{{ label }}</span>
    <button type="button" popovertarget="more-filters" :class="[fieldClass, 'w-full text-left lg:w-40']">
      {{ text }}
    </button>
  </div>
</template>