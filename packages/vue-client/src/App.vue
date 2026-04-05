<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink :to="{ name: RouteNames.About }">Dirty Works Jazz</RouterLink>
        <RouterLink :to="{ name: RouteNames.Home }">Upcoming Shows</RouterLink>
        <JamsMenu></JamsMenu>
      </nav>

      <PhotoCarousel v-if="application.showHero" />
    </div>
  </header>

  <RouterView />
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import JamsMenu from '@/components/JamsMenu.vue'
import { RouteNames } from '@/router/route-names'
import PhotoCarousel from '@/components/PhotoCarousel.vue'
import { useApplicationStore } from '@/stores/application'

const application = useApplicationStore()

</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

nav {
  width: 100%;
  font-size: 14px;
  text-align: center;
  margin-top: 1rem;
}

nav a {
  color: var(--color-text);
}

nav a.router-link-exact-active {
  color: var(--c-red);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 0.5rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (max-width: 1023px) {
  @media (orientation: landscape) {
    header {
      line-height: 1.5;
    }
  }
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;
    padding: 1rem 0;
    margin-top: 4rem;
  }
}
</style>
