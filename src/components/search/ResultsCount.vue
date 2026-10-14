<script setup lang="ts">
  import {useStore} from '@nanostores/vue';
  import { $searchResults } from '../../stores/searchResults';

  const results = useStore($searchResults);

</script>

<template>
  <p>{{ results.total }}</p>
</template>