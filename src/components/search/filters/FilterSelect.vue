<script setup lang="ts">
  import { computed } from 'vue';
  import { useStore } from '@nanostores/vue';
  import { $filters } from '@/stores/filters';
  import { type Filters } from '@/types/filters';

  const props = defineProps<{
    name: Exclude<keyof Filters, 'equipements'>;
    label: string;
    placeholder: string;
    options: { label: string; value: string }[];
    selected?: string;
  }>();

  /** Lien vivant avec le store : `filters.value` se met à jour tout seul quand le store change */
  const filters = useStore($filters);

  /** Valeur affichée dans le menu : côté serveur, celle de l'adresse (`selected`) ; côté navigateur, celle du store */
  const current = computed(() => (import.meta.env.SSR ? props.selected : filters.value[props.name]) ?? '');

  /** Écrit le choix de l'utilisateur dans le store (c'est `SearchForm` qui lance ensuite la recherche) */
  const update = (event: Event) => {
    $filters.setKey(props.name, (event.target as HTMLSelectElement).value);
  };
</script>

<template>
  <div class="flex flex-col gap-1">
    <label :for="`filter-${name}`" class="field-label">{{ label }}</label>
    <select :id="`filter-${name}`" :value="current" class="field filter-select w-full whitespace-nowrap lg:w-56" @change="update">
      <option value="">{{ placeholder }}</option>
      <option v-for="option in options" :key="option.value" :value="option.value">{{ option.label }}</option>
    </select>
  </div>
</template>

<style>
  /* Menu stylisable (Chrome récent) : sans ce support, le menu natif du navigateur reste affiché tel quel */
  @supports (appearance: base-select) {
    .filter-select,
    .filter-select::picker(select) {
      appearance: base-select;
    }

    /* Liste qui s'ouvre : même cadre que les champs */
    .filter-select::picker(select) {
      margin-top: 0.25rem;
      border: 1px solid var(--color-gray-200);
      border-radius: 0.5rem;
      background: white;
      padding: 0.25rem;
      box-shadow: 0 10px 30px rgb(0 0 0 / 0.12);
    }

    .filter-select option {
      border-radius: 0.375rem;
      padding: 0.5rem 0.75rem;
      font-size: 0.875rem;
      cursor: pointer;
    }

    .filter-select option:hover {
      background: var(--color-gray-100);
    }

    /* Choix actuel : couleur d'accent, sans la coche par défaut */
    .filter-select option:checked {
      color: var(--color-accent);
      font-weight: 600;
    }

    .filter-select option::checkmark {
      display: none;
    }

    /* Flèche qui se retourne quand la liste est ouverte */
    .filter-select::picker-icon {
      color: var(--color-gray-500);
      transition: rotate 0.2s;
    }

    .filter-select:open::picker-icon {
      rotate: 180deg;
    }
  }
</style>
