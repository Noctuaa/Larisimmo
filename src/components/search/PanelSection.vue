<script setup lang="ts">
  import type { Component } from 'vue';

  const { title, icon } = defineProps<{ title: string; icon: Component }>();
</script>

<template>
  <section class="filter-section">
    <h3 class="flex items-center gap-2">
      <span class="section-icon"><component :is="icon" class="size-4" aria-hidden="true" /></span>
      {{ title }}
    </h3>
    <slot />
  </section>
</template>
