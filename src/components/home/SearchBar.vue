<script setup lang="ts">
import { ref } from 'vue';

const city = ref('');
const propertyType = ref('');
const priceRange = ref('');

const propertyTypes = ['Appartement', 'Maison', 'Chalet'];
const priceRanges = [
  { label: "Jusqu'à 200 000 €", value: '0-200000' },
  { label: '200 000 € - 400 000 €', value: '200000-400000' },
  { label: '400 000 € - 600 000 €', value: '400000-600000' },
  { label: 'Plus de 600 000 €', value: '600000-' },
];

const search = () => {
  const params = new URLSearchParams();
  if (city.value) params.set('ville', city.value);
  if (propertyType.value) params.set('type', propertyType.value);
  if (priceRange.value) params.set('prix', priceRange.value);
  window.location.href = `/biens?${params.toString()}`;
};
</script>

<template>
  <form
    class="mx-auto flex w-fit flex-col gap-3 rounded-2xl bg-white p-5 shadow-xl md:flex-row md:items-end md:gap-4 md:px-8 md:py-6"
    @submit.prevent="search"
  >
    <div class="flex flex-col gap-1">
      <label for="search-city" class="text-xs font-semibold text-gray-500">Ville</label>
      <input
        id="search-city"
        v-model="city"
        type="text"
        placeholder="Paris, Lyon..."
        class="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-primary md:w-40"
      />
    </div>

    <div class="flex flex-col gap-1">
      <label for="search-type" class="text-xs font-semibold text-gray-500">Type de bien</label>
      <select
        id="search-type"
        v-model="propertyType"
        class="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-primary md:w-40"
      >
        <option value="">Tout type</option>
        <option v-for="t in propertyTypes" :key="t" :value="t">{{ t }}</option>
      </select>
    </div>

    <div class="flex flex-col gap-1">
      <label for="search-price" class="text-xs font-semibold text-gray-500">Budget</label>
      <select
        id="search-price"
        v-model="priceRange"
        class="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-primary md:w-52"
      >
        <option value="">Tous les prix</option>
        <option v-for="r in priceRanges" :key="r.value" :value="r.value">{{ r.label }}</option>
      </select>
    </div>

    <button
      type="submit"
      class="flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
    >
      Rechercher
    </button>
  </form>
</template>
