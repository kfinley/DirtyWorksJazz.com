<template>
  <main class="justified=hyphenated">
    <h1>Burlesque Songs</h1>
    <ul style="list-style-type: none; padding: 0; margin: 0">
      <li>Ain't No Sunshine</li>
      <li>All of Me</li>
      <li>Alone Together</li>
      <li>Angel Eyes</li>
      <li>Autumn Leaves</li>
      <li>Besame Mucho</li>
      <li>Black Orpheus</li>
      <li>Blue Bossa</li>
      <li>Body & Soul</li>
      <li>Bye Bye Blackbird</li>
      <li>C'est Si Bon</li>
      <li>Caravan</li>
      <li>Comin Home Baby</li>
      <li>Days of Wine & Roses</li>
      <li>Don't Get Around Much Anymore</li>
      <li>Don't Mean A Thing</li>
      <li>Dream a Little Dream of Me</li>
      <li>Fever</li>
      <li>Fly Me To The Moon</li>
      <li>Girl From Impanema</li>
      <li>Have You Met Miss Jones</li>
      <li>Honeysuckle Rose</li>
      <li>How Deep is the Ocean</li>
      <li>How High The Moon</li>
      <li>How High The Moon</li>
      <li>How Insensitive</li>
      <li>I Love You</li>
      <li>In a Mellow Tone</li>
      <li>In Walked Bud</li>
      <li>It's All Right With Me</li>
      <li>Jeannine</li>
      <li>Just Friends</li>
      <li>L-O-V-E</li>
      <li>Little Suede Shoes</li>
      <li>Lullaby of Birdland</li>
      <li>Misty</li>
      <li>Moanin'</li>
      <li>Moonglow</li>
      <li>Nature Boy</li>
      <li>Old Devil Moon</li>
      <li>On the Sunny Side of the Street</li>
      <li>Perdido</li>
      <li>Perhaps, Perhaps, Perhaps</li>
      <li>Pink Panther Theme</li>
      <li>S' Wonderful</li>
      <li>Sister Sadie</li>
      <li>Softly as in a Morning Sunrise</li>
      <li>Song For My Father</li>
      <li>Star Eyes</li>
      <li>Summertime</li>
      <li>Take the A Train</li>
      <li>Tea For Two</li>
      <li>Wave</li>
      <li>Well You Needn't</li>
      <li>Willow Weep For Me</li>
      <li>Work Song</li>
    </ul>
  </main>
</template>

<script setup lang="ts">
import { useApplicationStore } from '@/stores/application'
import { onMounted, onUnmounted } from 'vue'

const application = useApplicationStore()

onMounted(() => {
  application.actions.hideHero()
  console.log(`the component is now mounted.`)
})

onUnmounted(() => {
  application.actions.showHero()
  console.log(`the component is now mounted.`)
})
</script>
