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

  /** Met un nombre (en texte) au format français, avec l'espace des milliers : `3000` donne `3 000` */
  const formatNumber = (value: string) => Number(value).toLocaleString('fr-FR');

  /** Plage de prix à afficher. Serveur : lue dans l'adresse (prop `range`) ; navigateur : lue dans le store, en direct.
   * Les clés `prixMin` et `prixMax` sont écrites en dur : ce bouton ne sert qu'au prix pour l'instant */
  const currentRange = computed(() => (import.meta.env.SSR ? range : { min: filters.value.prixMin, max: filters.value.prixMax }));

  /** Serveur : choix lu dans l'adresse (prop) ; navigateur : choix du store, en direct */
  const currentChoice = computed(() => {
    if (!name) return undefined;
    return import.meta.env.SSR ? selected : filters.value[name];
  });

  /** Texte du bouton en mode `range` : `300 - 3 000 €` (les deux), `Min. 300 €` ou `3 000 € max.` (un seul),
   * ou le libellé s'il n'y a ni l'un ni l'autre */
  const rangeText = computed(() => {
    const { min, max } = currentRange.value;
    if (!min && !max) return label;
    if (min && max) return `${formatNumber(min)} - ${formatNumber(max)} €`;
    return min ? `Min. ${formatNumber(min)} €` : `${formatNumber(max)} € max.`;
  });

  /** Texte du bouton en mode `selected`: le premier choix, puis `, +1`, `, +2`… s'il y en a d'autres
   * (pour tenir sur une ligne), ou le libellé s'il n'y en a aucun */
  const choiceText = computed(() => {
    const labels = [currentChoice.value]
      .flat()
      .map((value) => options.find((option) => option.value === value)?.label)
      .filter(Boolean);
    if (!labels.length) return label;
    return labels.length > 1 ? `${labels[0]}, +${labels.length - 1}` : labels[0];
  });

  /** Texte du bouton selon le mode : le résumé d'une plage (`range`) ou celui d'une liste de choix (`selected`) */
  const buttonText = computed(() => (mode === 'range' ? rangeText.value : choiceText.value));
</script>

<template>
  <div class="flex flex-col gap-1">
    <button
      type="button"
      popovertarget="more-filters"
      :title="buttonText"
      :aria-label="buttonText !== label ? `${label} : ${buttonText}` : undefined"
      class="field w-full truncate text-left lg:w-44"
    >
      {{ buttonText }}
    </button>
  </div>
</template>
