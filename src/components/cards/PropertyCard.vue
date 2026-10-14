<script setup lang="ts">
  import { computed } from 'vue';
  import type { Property } from '../../types/property';
  import { rulerIcon, bedDoubleIcon, bathIcon } from '../../utils/propertyIcons';

  const props = defineProps<{ property: Property }>();

  const price = computed(() => {
    const formatted = props.property.prix.toLocaleString('fr-FR');
    return props.property.transaction === 'location' ? `${formatted} € / mois` : `${formatted} €`;
  });

  const tagStyles: Record<string, string> = {
    Nouveau: 'bg-primary text-white',
    'Bon plan': 'bg-emerald-500 text-white',
    'Coup de cœur': 'bg-rose-500 text-white',
  };
</script>

<template>
  <a :href="`/biens/${property.id}`" class="group block overflow-hidden rounded-2xl bg-white shadow-md transition hover:shadow-xl">
    <div class="card-notch relative h-70 overflow-hidden before:content-[''] before:absolute before:z-10 before:bg-white">
      <img
        :src="property.photos[0].compacte"
        :alt="property.titre"
        loading="lazy"
        class="h-full w-full object-cover transition duration-300 group-hover:scale-105"
      />

      <div class="absolute left-3 top-3 flex gap-2">
        <span v-for="tag in property.etiquettes" :key="tag" :class="['rounded-full px-3 py-1 text-xs font-semibold', tagStyles[tag]]">
          {{ tag }}
        </span>
      </div>
    </div>

    <div class="relative -mt-10 flex flex-col gap-2 rounded-tr-4xl bg-white p-8">
      <div class="mb-2 flex items-center justify-between">
        <div class="flex flex-col gap-1">
          <p class="text-xs font-bold uppercase text-accent">{{ property.type }}</p>
          <p class="text-sm font-semibold text-primary">{{ property.ville }}</p>
        </div>
        <p class="text-right text-lg font-bold text-primary">{{ price }}</p>
      </div>

      <div class="flex flex-col gap-2">
        <h3 class="truncate font-semibold text-gray-900">{{ property.titre }}</h3>
        <p class="line-clamp-2 text-sm text-gray-600">{{ property.description }}</p>
      </div>

      <ul class="mt-3 flex flex-wrap gap-y-2 text-sm font-semibold text-gray-800">
        <li class="flex items-center gap-1.5 px-1 after:relative after:content-['|']" v-html="`${bedDoubleIcon}${property.chambres}`" />
        <li class="flex items-center gap-1.5 px-1 after:relative after:content-['|']" v-html="`${bathIcon}${property.sallesDeBain}`" />
        <li class="flex items-center gap-1.5 px-1" v-html="`${rulerIcon}${property.surface} m²`" />
      </ul>
    </div>
  </a>
</template>
