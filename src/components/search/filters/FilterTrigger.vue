<script setup lang="ts">
  import { computed } from 'vue';

  import { useStore } from '@nanostores/vue';
  import { type Filters } from '@/types/filters';
  import { $filters } from '@/stores/filters';

  const {
    mode,
    label,
    name,
    options = [],
    selected,
    range = { min: '', max: '' },
  } = defineProps<{
    mode: 'selected' | 'range';
    label: string;

    name?: keyof Filters;
    options?: { label: string; value: string }[];
    selected?: string | string[];

    range?: { min: string; max: string };
  }>();

  const filters = useStore($filters);

  const formatNumber = (value: string) => Number(value).toLocaleString('fr-FR');

  const currentRange = computed(() => (import.meta.env.SSR ? range : { min: filters.value.prixMin, max: filters.value.prixMax }));

  /** Serveur : choix lu dans l'adresse (prop) ; navigateur : choix du store, en direct */
  const currentChoice = computed(() => {
    if (!name) return undefined;
    return import.meta.env.SSR ? selected : filters.value[name];
  });

  const rangeText = computed(() => {
    const { min, max } = currentRange.value;
    if (!min && !max) return label;
    if (min && max) return `${formatNumber(min)} - ${formatNumber(max)} €`;
    return min ? `Min. ${formatNumber(min)} €` : `${formatNumber(max)} € max.`;
  });

  const choiceText = computed(() => {
    const labels = [currentChoice.value]
      .flat()
      .map((value) => options.find((option) => option.value === value)?.label)
      .filter(Boolean);
    if (!labels.length) return label;
    return labels.length > 1 ? `${labels[0]}, +${labels.length - 1}` : labels[0];
  });

  /** Texte du bouton, comme Leboncoin : le premier choix, suivi de « +1 », « +2 »… s'il y en a d'autres (tient sur une ligne),
   * ou le placeholder s'il n'y en a pas */
  const buttonText = computed(() => (mode === 'range' ? rangeText.value : choiceText.value));
</script>

<template>
  <div class="flex flex-col gap-1">
    <span class="sr-only field-label">{{ label }}</span>
    <button type="button" popovertarget="more-filters" :title="buttonText" class="field w-full truncate text-left lg:w-44">
      {{ buttonText }}
    </button>
  </div>
</template>
