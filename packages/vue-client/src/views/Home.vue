<template>
  <main>
    <UpcomingEvents />
  </main>
</template>

<script setup lang="ts">
import UpcomingEvents from '../components/UpcomingEvents.vue'
</script>

<style scoped>
@media (min-width: 1024px) {
  main {
    padding-top: 2rem;
  }
}
</style>
