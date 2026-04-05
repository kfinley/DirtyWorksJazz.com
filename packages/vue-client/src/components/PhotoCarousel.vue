<template>
  <img id="image" class="image" :src="image?.src" :alt="image?.alt" />
</template>

<script setup lang="ts">
/*
Combination of the following approaches...
https://github.com/prachishah26/Slider-Vue-3/blob/main/src/components/Slider.vue
https://stackoverflow.com/a/75604594
*/
import { ref, onUnmounted, onMounted } from 'vue'

const images = [
  {
    src: '/media/images/dirty-works-jazz.jpg',
    alt: 'Dirty Works Jazz Band',
  },
  {
    src: '/media/images/2024.10.06_02-Persona.jpg',
    alt: 'Richard Batelaan with the Dirty Works Jazz Band at Persona',
  },
  {
    src: '/media/images/2024.10.16_03-Shoe_Jam.jpg',
    alt: 'Peter playing trumpet at the Lucky Horseshoe Jam',
  },
  {
    src: '/media/images/2024.10.14_01-Waystone.jpg',
    alt: 'Waystone Jazz jam',
  },
  {
    src: '/media/images/2024.10.16_01-Shoe_Jam.jpg',
    alt: 'Gale singing the blues at the Lucky Horseshoe Jam',
  },
  {
    src: '/media/images/2024.10.06_03-Persona.jpg',
    alt: 'Jammers playing at the Persona Jazz Jam',
  },
  {
    src: '/media/images/2024.10.16_11-Shoe_Jam.jpg',
    alt: 'Ruben on the keys at the Lucky Horseshoe Jam',
  },
]

const currentIndex = ref(0)
let intervalId: number
let image = images[0]

const isTimerPaused = ref(false)

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % images.length

  var img = document.getElementById('image') as HTMLImageElement
  img?.classList.remove('show')
  img?.classList.add('fade')
  setTimeout(function () {
    let newImg = images[currentIndex.value] as { src: string; alt: string }
    img.src = newImg.src
    img.alt = newImg.alt
    img.classList.remove('fade')
    img.classList.add('show')
  }, 1500)

  isTimerPaused ? '' : start()
}

const start = () => {
  intervalId = setInterval(() => {
    next()
  }, 6000)
}

onMounted(() => {
  start()
})

onUnmounted(() => {
  clearInterval(intervalId)
})
</script>

<style scoped>
.image {
  display: block;
  margin: 1rem auto 2rem;
  width: 90%;
  max-width: 400px;
  transition: opacity 1.8s ease-in-out;
}

#image.fade {
  opacity: 0;
}

#image.show {
  opacity: 1;
}

@media (min-width: 1024px) {
  .image {
    margin: 1rem 2rem 0 0;
    width: 525px;
  }
}
</style>
