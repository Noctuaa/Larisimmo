<script setup lang="ts">
  import { computed } from 'vue';
  import { useStore } from '@nanostores/vue';
  import { $filters } from '@/stores/filters';
  import { dpeColors } from '@/data/dpeColors';
  import { type Dpe } from '@/types/property';

  const { options = [], selected = '' } = defineProps<{
    options?: { label: string; value: string }[];
    selected?: string;
  }>();

  const filters = useStore($filters);

  /** Classe choisie. Serveur : lue dans l'adresse (prop) ; navigateur : lue dans le store, en direct */
  const currentDpe = computed(() => (import.meta.env.SSR ? selected : filters.value.dpe));

  /** La classe `dpe` est-elle comprise dans le filtre ? Oui si elle est la classe choisie ou une meilleure
   * (choisir D garde A, B, C et D), et toutes le sont quand rien n'est choisi */
  const isIncluded = (dpe: string) => {
    const position = (value: string) => options.findIndex((option) => option.value === value);
    return !currentDpe.value || position(dpe) <= position(currentDpe.value);
  };

  /** Clic sur une étiquette : choisir cette classe, ou retirer le choix si c'est déjà elle */
  const toggle = (dpe: Dpe) => $filters.setKey('dpe', currentDpe.value === dpe ? '' : dpe);
</script>

<template>
  <div>
    <p class="-mt-2 mb-2 text-xs text-gray-500">Sélectionnez une classe : les meilleures sont incluses</p>
    <div class="flex flex-wrap gap-2">
      <button
        v-for="option in options"
        :key="option.value"
        type="button"
        :aria-pressed="currentDpe === option.value"
        :aria-label="`Classe énergie ${option.label} ou meilleure`"
        :class="['size-9 dpe-tag cursor-pointer', dpeColors[option.value as Dpe], { grayscale: !isIncluded(option.value as Dpe) }]"
        @click="toggle(option.value as Dpe)"
      >
        {{ option.label }}
      </button>
    </div>
  </div>
</template>
