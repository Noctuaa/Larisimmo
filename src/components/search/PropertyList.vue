<script setup lang="ts">
  import type { Property } from '../../types/property';
  import PropertyCard from '../cards/PropertyCard.vue';

  defineProps<{ items: Property[] }>();
</script>

<template>
  <p v-if="items.length === 0" class="text-center text-gray-500">Aucun bien ne correspond à votre recherche.</p>
  <ul v-else class="grid grid-fill gap-8">
    <li v-for="property in items" :key="property.id">
      <PropertyCard :property="property" />
    </li>
  </ul>
</template>
