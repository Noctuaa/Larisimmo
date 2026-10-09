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

  const fields = computed(() => [
    { label: 'Min.', id: `filter-${props.name}-min`, key: minKey, value: currentMin.value },
    { label: 'Max.', id: `filter-${props.name}-max`, key: maxKey, value: currentMax.value },
  ]);

</script>

<template>
  <div class="flex gap-2">
    <div v-for="f in fields" :key="f.id" class="flex flex-col">
      <label :for="f.id" class="field-label">{{ f.label }}</label>
      <div class="relative">
        <input
          type="text"
          inputmode="numeric"
          :id="f.id"
          :value="f.value"
          class="peer field"
          @input="update(f.key, $event)"
        />
        <span class="absolute right-0 inset-y-0 flex items-center px-3 text-sm text-primary border-l border-gray-200 rounded-r-lg peer-focus:border-primary">{{ unit }}</span>
      </div>
    </div>
  </div>
</template>