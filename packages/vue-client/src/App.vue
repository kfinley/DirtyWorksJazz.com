<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink :to='{ name: RouteNames.About }'>Dirty Works Jazz</RouterLink>
        <RouterLink :to='{ name: RouteNames.Home }'>Upcoming Shows</RouterLink>
        <JamsMenu></JamsMenu>
      </nav>
      <img alt="Dirty Works Jazz" class="flyer" src="@/assets/dirty-works-jazz.jpg" />
    </div>
  </header>

  <RouterView />
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import JamsMenu from '@/components/JamsMenu.vue'
import { RouteNames } from '@/router/route-names'
</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.flyer {
  display: block;
  margin: 1rem auto 2rem;
  width: 90%;
  max-width: 400px;
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
  padding: 0 .5rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (max-width: 1023px) {
  @media (orientation: landscape) {
    header {
      line-height: 1.5;
      max-height: 5vh;
    }
    .flyer {
      visibility: hidden;
    }
  }
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .flyer {
    margin: 1rem 2rem 0 0;
    width: 525px;
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
