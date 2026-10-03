<script setup lang="ts">
  import { computed, onMounted } from 'vue';
  import { useStore } from '@nanostores/vue';
  import { $filters} from '../../stores/filters';
  import { type Filters } from '../../types/filters';

  const props = defineProps<{
    name: keyof Filters;
    options: { label: string; value: string }[];
    selected?: string | string[];
    multiple?: boolean;
  }>();

  const filters = useStore($filters);

  const current = computed(() => [ import.meta.env.SSR ? props.selected : filters.value[props.name]].flat());

  const toggle = (option: string) => {
    const value = $filters.get()[props.name];
    if (props.multiple) {
      const list = value as string[];
      $filters.setKey(props.name, list.includes(option) ? list.filter((v) => v !== option) : [...list, option]);
    } else {
      $filters.setKey(props.name, value === option ? '' : option);
    }
  }

  onMounted(() => {
    console.log(import.meta.env.SSR)
  });

  const pillClass = 'flex h-10 cursor-pointer items-center justify-center rounded-full border border-gray-200 px-4 text-sm text-gray-700';
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <button
      v-for="option in options"
      :key="option.value"
      type="button"
      :aria-pressed="current.includes(option.value)"
      :class="[pillClass, current.includes(option.value) ? 'bg-primary text-white' : 'hover:bg-gray-50 hover:text-primary']"
      @click="toggle(option.value)"
    >
      {{ option.label }}
    </button>
  </div>
</template>
