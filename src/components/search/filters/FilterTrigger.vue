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
  const currentChoice = computed(() => (import.meta.env.SSR ? props.selected : filters.value[props.name]));

  /** Texte du bouton, comme Leboncoin : le premier choix, suivi de « +1 », « +2 »… s'il y en a d'autres (tient sur une ligne),
   * ou le placeholder s'il n'y en a pas */
  const buttonText = computed(() => {
    const labels = [currentChoice.value]
      .flat()
      .map((value) => props.options.find((option) => option.value === value)?.label)
      .filter(Boolean);
    if (!labels.length) return props.placeholder;
    return labels.length > 1 ? `${labels[0]}, +${labels.length - 1}` : labels[0];
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
