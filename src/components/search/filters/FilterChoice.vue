<script setup lang="ts">
  import { computed } from 'vue';
  import { useStore } from '@nanostores/vue';
  import { $filters } from '@/stores/filters';
  import { type Filters } from '@/types/filters';

  const {
    name,
    required = false,
    options,
    selected = '',
    multiple = false,
  } = defineProps<{
    name: keyof Filters;
    required?: boolean;
    options: { label: string; value: string }[];
    selected?: string | string[];
    multiple?: boolean;
  }>();

  const filters = useStore($filters);

  /** Toujours une liste (`.flat()`), pour tester avec `includes` qu'il y ait un ou plusieurs choix */
  const currentChoices = computed(() => [import.meta.env.SSR ? selected : filters.value[name]].flat());

  /** Choix unique : un 2e clic décoche, sauf si `required` (un choix est obligatoire : on ne fait alors rien).
   * `multiple` : on ajoute ou retire le choix, en recréant la liste pour que le store voie le changement */
  const toggle = (option: string) => {
    const value = $filters.get()[name];
    if (multiple) {
      const list = value as string[];
      $filters.setKey(name, list.includes(option) ? list.filter((v) => v !== option) : [...list, option]);
    } else if (!(required && value === option)) {
      $filters.setKey(name, value === option ? '' : option);
    }
  };

  const pillClass = 'flex h-10 cursor-pointer items-center justify-center rounded-full border border-gray-200 px-4 text-sm text-gray-700';
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <button
      v-for="option in options"
      :key="option.value"
      type="button"
      :aria-pressed="currentChoices.includes(option.value)"
      :class="[pillClass, currentChoices.includes(option.value) ? 'bg-primary text-white' : 'hover:bg-gray-50 hover:text-primary']"
      @click="toggle(option.value)"
    >
      {{ option.label }}
    </button>
  </div>
</template>
