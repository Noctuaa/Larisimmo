<script setup lang="ts">
  import { computed } from 'vue';

  import { useStore } from '@nanostores/vue';
  import { type Filters } from '@/types/filters';
  import { $filters } from '@/stores/filters';

  const props = defineProps<{
    name: keyof Filters;
    label: string;
    placeholder: string;
    options: { label: string; value: string }[];
    selected: string | string[];
  }>();

  const filters = useStore($filters);

  /** Serveur : choix lu dans l'adresse (prop) ; navigateur : choix du store, en direct */
  const current = computed(() => (import.meta.env.SSR ? props.selected : filters.value[props.name]));

  /** Texte du bouton : les noms lisibles des choix, séparés par une virgule, ou le placeholder s'il n'y en a pas */
  const buttonText = computed(() => {
    const labels = [current.value]
      .flat()
      .map((value) => props.options.find((option) => option.value === value)?.label)
      .filter(Boolean);
    return labels.length ? labels.join(', ') : props.placeholder;
  });
</script>

<template>
  <div class="flex flex-col gap-1">
    <span class="field-label">{{ label }}</span>
    <button type="button" popovertarget="more-filters" class="field w-full text-left lg:w-40">
      {{ buttonText }}
    </button>
  </div>
</template>
