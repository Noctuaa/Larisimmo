<script setup lang="ts">
  import { computed } from 'vue';
  import { useStore } from '@nanostores/vue';
  import { $filters } from '@/stores/filters';
  import { type Filters } from '@/types/filters';

  const props = defineProps<{
    name: string;
    min?: string;
    max?: string;
  }>();

  /** Les boutons affichés : de 1 à 8 (le 8 veut dire « 8 et plus ») */
  const values = [1, 2, 3, 4, 5, 6, 7, 8];

  const filters = useStore($filters);

  /** Clés du store pour cette plage : `chambres` donne `chambresMin` et `chambresMax` */
  const minKey = `${props.name}Min` as keyof Filters;
  const maxKey = `${props.name}Max` as keyof Filters;

  /** Texte → nombre ; un champ vide (`''`) donne `null` (« pas de valeur ») et pas 0 */
  const toNumber = (value: unknown) => (value ? Number(value) : null);

  /** Début et fin de la plage choisie, en nombres (serveur : lus dans l'adresse ; navigateur : lus dans le store) */
  const currentMin = computed(() => toNumber(import.meta.env.SSR ? props.min : filters.value[minKey]));
  const currentMax = computed(() => toNumber(import.meta.env.SSR ? props.max : filters.value[maxKey]));

  /** Le bouton `n` est-il dans la plage choisie ? (aucun bouton n'est allumé s'il manque le début ou la fin) */
  const isInRange = (n: number) => currentMin.value !== null && currentMax.value !== null && n >= currentMin.value && n <= currentMax.value;

  /** Clic sur un bouton :
   * - sur une borne actuelle : rien ne change
   * - avant le début ou après la fin : la plage s'agrandit jusqu'à ce bouton
   * - à l'intérieur, ou rien de choisi : la plage repart avec ce seul bouton */
  const selectRange = (clicked: number) => {
    const min = currentMin.value;
    const max = currentMax.value;

    if (clicked === min || clicked === max) return;

    const extend = min === null || max === null || clicked < min || clicked > max;
    const newMin = extend ? Math.min(min ?? clicked, clicked) : clicked;
    const newMax = extend ? Math.max(max ?? clicked, clicked) : clicked;

    $filters.set({ ...$filters.get(), [minKey]: String(newMin), [maxKey]: String(newMax) });
  };

  /** Forme commune des boutons ; la couleur (dans la plage ou non) est ajoutée dans le <template> */
  const pillClass = 'flex h-10 min-w-10 cursor-pointer items-center justify-center rounded-full border border-gray-200 px-3 text-sm text-gray-700';
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <button
      v-for="n in values"
      :key="n"
      type="button"
      :aria-pressed="isInRange(n)"
      :class="[pillClass, isInRange(n) ? 'bg-primary text-white' : 'hover:bg-gray-50 hover:text-primary']"
      @click="selectRange(n)"
    >
      {{ n === 8 ? '8+' : n }}
    </button>
  </div>
</template>
