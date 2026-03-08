<template>
  <DropDown>
    <template #trigger="{ toggle }">
      <a href="#" class="menu" @click="toggle">Jams</a>
    </template>
    <div class="text-center">
      <div class="dropdown-item" @click="toggle"><RouterLink :to='{ name: RouteNames.BurlesqueJam }'>Burlesque Jam</RouterLink></div>
      <div class="dropdown-item" @click="toggle"><RouterLink :to='{ name: RouteNames.HopOastJam }'>Hop Oast</RouterLink></div>
      <div class="dropdown-item" @click="toggle"><RouterLink :to='{ name: RouteNames.ShoeJam }'>Lucky Horseshoe</RouterLink></div>
      <div class="dropdown-item" @click="toggle"><RouterLink :to='{ name: RouteNames.ParisJam }'>Paris 75</RouterLink></div>
      <div class="dropdown-item" @click="toggle"><RouterLink :to='{ name: RouteNames.PersonaJam }'>Persona</RouterLink></div>
    </div>
  </DropDown>
</template>

<script lang="ts" setup>
import DropDown from './DropDown.vue'
import { RouteNames } from '@/router/route-names'
</script>

<style scoped>
a {
  color: var(--color-text);
}
.menu {
  display: inline-block;
  padding: 0 .5rem;
  border-left: 1px solid var(--color-border);
}
</style>
