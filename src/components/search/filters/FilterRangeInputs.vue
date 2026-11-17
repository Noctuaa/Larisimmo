<script setup lang="ts">
  import { computed } from 'vue';
  import { useStore } from '@nanostores/vue';
  import { $filters } from '@/stores/filters';
  import { type Filters } from '@/types/filters';
  import { orderRange } from '@/utils/orderRange';

  /** `name` : le filtre (prix ou surface) ; `unit` : l'unité affichée à droite du champ (€ ou m²) ;
   * `min` et `max` : les valeurs lues dans l'adresse par le serveur */
  const props = defineProps<{
    name: 'surface' | 'prix';
    unit: string;
    min?: string;
    max?: string;
  }>();

  /** Lien vivant avec le store : `filters.value` se met à jour tout seul quand le store change */
  const filters = useStore($filters);

  /** Clés du store pour ce filtre : `prix` donne `prixMin` et `prixMax` */
  const minKey = `${props.name}Min` as keyof Filters;
  const maxKey = `${props.name}Max` as keyof Filters;

  /** Valeurs affichées dans les champs (serveur : celles de l'adresse ; navigateur : celles du store).
   * Elles restent en texte : ici on ne fait que les afficher, sans comparer ni calculer */
  const currentMin = computed(() => (import.meta.env.SSR ? props.min : filters.value[minKey]));
  const currentMax = computed(() => (import.meta.env.SSR ? props.max : filters.value[maxKey]));

  /** À chaque touche : ne garde que les chiffres, dans le champ et dans le store (l'écran montre ce qui est utilisé) */
  const update = (key: keyof Filters, event: Event) => {
    const input = event.target as HTMLInputElement;
    const digits = input.value.replace(/\D/g, '');
    input.value = digits;
    $filters.setKey(key, digits);
  };

  /** Quand on quitte un champ : si le minimum dépasse le maximum, on les échange pour que l'affichage rattrape
   * la recherche (qui, elle, a déjà été remise dans l'ordre pendant la frappe) */
  const orderValues = () => {
    const [min, max] = orderRange($filters.get()[minKey] as string, $filters.get()[maxKey] as string);
    $filters.setKey(minKey, min);
    $filters.setKey(maxKey, max);
  };

  /** Les deux champs (Min. et Max.) décrits dans une liste, pour que le <template> les répète avec un `v-for`
   * au lieu de copier deux fois le même bloc */
  const fields = computed(() => [
    { label: 'Min.', id: `filter-${props.name}-min`, key: minKey, value: currentMin.value },
    { label: 'Max.', id: `filter-${props.name}-max`, key: maxKey, value: currentMax.value },
  ]);
</script>

<template>
  <div class="flex gap-2">
    <div v-for="f in fields" :key="f.id" class="flex flex-col min-w-0 flex-1">
      <label :for="f.id" class="field-label">{{ f.label }}</label>
      <div class="relative">
        <input
          type="text"
          inputmode="numeric"
          :id="f.id"
          :value="f.value"
          class="peer field w-full pr-12"
          @input="update(f.key, $event)"
          @change="orderValues"
        />
        <span
          class="absolute right-0 inset-y-0 flex items-center px-3 text-sm text-primary border-l border-gray-200 rounded-r-lg peer-focus:border-primary"
        >
          {{ unit }}
        </span>
      </div>
    </div>
  </div>
</template>
