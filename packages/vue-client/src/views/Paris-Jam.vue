<template>
  <main class="justified-hyphenated">
    <div class="container text-center">
      <h2>Thursday Jazz Jam @ Paris 75</h2>
    </div>
    <p>
      Every Thursday at <a href="https://lppsf.com" target="paris">Paris 75</a> in San Francisco's
      historic North Beach neighborhood
      <a href="https://kylefinley.net" target="kyle">Kyle Finley</a> and the Dirty Works Jazz Band
      host an open jazz jam from 8 to 11 PM. Paris 75 is located at 515 Broadway at the corner of
      Kearny St. across from
      <a href="https://keysjazzbistro.com" target="keys">Keys Jazz Bistro</a>.
    </p>
    <p>
      North Beach has a strong history of classic jazz and we're honored to continue that tradition
      with some of the hardest swingin' jazz you'll find in town!! This is a straight ahead jazz jam
      so expect to hear a wide range of jazz standards.
    </p>
    <p>
      The first week of the month we have a burlesque dancer join us. We call this the
      <RouterLink :to="{ name: RouteNames.BurlesqueJam }">Burlesque Jazz Jam</RouterLink> and it's
      always a blast!
    </p>
    <p>
      There's no need to sign up for this jam, just introduce yourself to the band. If you have any
      questions reach out to <a href="mailto:kyle@kylefinley.net">Kyle Finley</a>
    </p>
  </main>
</template>

<script setup lang="ts">
import { RouteNames } from '@/router/route-names'
</script>
