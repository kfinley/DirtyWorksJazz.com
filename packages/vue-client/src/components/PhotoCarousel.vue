<template>
  <img
    id="image"
    class="image"
    :src="getImageUrl(image?.src as string)"
    :alt="image?.alt"
    v-on:click="nextImage"
  />
</template>

<script setup lang="ts">
/*
Combination of the following approaches...
https://github.com/prachishah26/Slider-Vue-3/blob/main/src/components/Slider.vue
https://stackoverflow.com/a/75604594
*/
import { ref, onUnmounted, onMounted } from 'vue'

let images = [
  {
    src: 'dirty-works-jazz.jpg',
    alt: 'Dirty Works Jazz Band',
  },
  {
    src: '2024.10.06_02-Persona.jpg',
    alt: 'Richard Batelaan with the Dirty Works Jazz Band at Persona',
  },
  {
    src: '2025.06.13_01-Persona.jpg',
    alt: 'Tim Shea on guitar at the Persona Jam',
  },
  {
    src: '2024.10.14_01-Waystone.jpg',
    alt: 'Waystone Jazz jam',
  },
  {
    src: '2024.10.16_03-Shoe_Jam.jpg',
    alt: 'Peter playing trumpet at the Lucky Horseshoe Jam',
  },
  {
    src: '2024.10.16_01-Shoe_Jam.jpg',
    alt: 'Gale singing the blues at the Lucky Horseshoe Jam',
  },
  {
    src: '2024.10.06_03-Persona.jpg',
    alt: 'Jammers playing at the Persona Jazz Jam',
  },
  {
    src: '2024.10.16_11-Shoe_Jam.jpg',
    alt: 'Ruben on the keys at the Lucky Horseshoe Jam',
  },
  {
    src: '2024.08.29_01-Persona.jpg',
    alt: 'Brendan playing sax at Persona',
  },
  {
    src: '2024.08.29_02-Persona.jpg',
    alt: 'Omar playing bass at the Persona Jazz Jam',
  },
  {
    src: '2024.10.14_02-Waystone.jpg',
    alt: 'Felix and Autumn jamming at Waystone',
  },
  {
    src: '2024.10.03_01-Persona.jpg',
    alt: 'Omar on the upright bass at the Persona Jazz Jam',
  },
  {
    src: '2024.10.14_03-Waystone.jpg',
    alt: 'David on the alto at the Waystone Jam',
  },
  {
    src: '2024.10.16_04-Shoe_Jam.jpg',
    alt: 'Andy on the trombone at the Lucky Horseshoe Jazz Jam in Bernal Heights',
  },
  {
    src: '2024.10.16_05-Shoe_Jam.jpg',
    alt: 'Dave Green on the guitar at the Lucky Horseshoe Open Jazz Jam',
  },
  {
    src: '2024.10.25_01-Persona.jpg',
    alt: 'Joe Kwan and Dwight at the Persona Cocktail Bar Jazz Jam',
  },
  {
    src: '2024.10.25_02-Persona.jpg',
    alt: 'Zack Sanders & Theo playing at the Persona Late Night Jazz Jam',
  },
  {
    src: '2024.10.25_03-Persona.jpg',
    alt: 'Zack Sanders performs with the Dirty Works Jazz Band at Persona Cocktail Bar in San Francisco',
  },
  {
    src: '2024.10.25_04-Persona.jpg',
    alt: 'Josh Alvarez playing trumpet at the Persona Jazz Jam',
  },
  {
    src: '2024.10.25_05-Persona.jpg',
    alt: 'Joe Kwon playing alto sax with the Dirty Works Jazz Band at the Persona Jazz Night',
  },
  {
    src: '2024.10.25_06-Persona.jpg',
    alt: 'Dwight Augustin layin it down at the Persona Dirty Works Jazz Jam',
  },
  {
    src: '2024.10.30_01-Shoe_Jam.jpg',
    alt: 'Paul on the bass at the Lucky Horseshoe Jazz Jam',
  },
  {
    src: '2024.10.30_02-Shoe_Jam.jpg',
    alt: 'Blowin on the sax at the Shoe Jam in Bernal Heights',
  },
  {
    src: '2024.10.30_03-Shoe_Jam.jpg',
    alt: 'Jeremy on guitar at the Shoe Jazz Jam',
  },
  {
    src: '2024.10.30_04-Shoe_Jam.jpg',
    alt: 'Paul in motion on the bass at the Shoe Jam',
  },
  {
    src: '2024.11.15_01-Persona.jpg',
    alt: 'Omar jammin at Persona on the upright bass',
  },
  {
    src: '2025.02.13_01-Waystone.jpg',
    alt: 'Back on the bass at the Waystone Jam',
  },
  {
    src: '2025.03.14_01-Hop_Oast.jpg',
    alt: 'Matt Callaway and Kyle Finley jammin at Hop Oast Brewery',
  },
  {
    src: '2025.03.19_01-Shoe_Jam.jpg',
    alt: 'Larry Epstein at the Lucky Horseshoe Jazz Jam',
  },
  {
    src: '2025.04.22_03-Liberties.jpg',
    alt: 'Josh Alvarez playing trumpet at The Liberties Dirty Works Jazz Jam',
  },
  {
    src: '2025.03.19_02-Shoe_Jam.jpg',
    alt: 'Matt Callaway plays bass at the Lucky Horseshoe Jazz Jam',
  },
  {
    src: '2025.04.11_01-Persona.jpg',
    alt: 'Dwight Augustin doing his best Scotty pose at the Persona Late Night Jazz Jam',
  },
  {
    src: '2025.04.11_02-Persona.jpg',
    alt: 'Tobias on the drums with the Dirty Works Jazz Band at Persona Cocktail Bar',
  },
  {
    src: '2025.03.19_03-Shoe_Jam.jpg',
    alt: 'Larry Epstein soloing at the Lucky Horseshoe Open Jazz Jam',
  },
  {
    src: '2025.04.11_03-Persona.jpg',
    alt: 'Dwight Augustin in the light on the bass at the Persona Jazz Jam',
  },
  {
    src: '2025.04.17_01-Shoe_Jam.jpg',
    alt: 'Paul jammin with the Dirty Works Jazz Band at the Lucky Horseshoe Open Jazz Jam',
  },
  {
    src: '2025.04.20_01-Progressive_Grounds.jpg',
    alt: 'Larry Epstein soloing at the Dirty Works Jazz Jam at Progressive Grounds Cafe in Bernal Heights',
  },
  {
    src: '2025.04.22_01-Liberties.jpg',
    alt: 'David and Paul at The Liberties with the Dirty Works Jazz Band',
  },
  {
    src: '2025.04.22_02-Liberties.jpg',
    alt: 'Tobias hittin skins at The Liberties Open Jazz Jam with the Dirty Works Jazz Band',
  },
  {
    src: '2025.04.23_01-Shoe_Jam.jpg',
    alt: 'Ryan on the bass at the Lucky Horseshoe Jazz Jam',
  },
  {
    src: '2025.04.23_02-Shoe_Jam.jpg',
    alt: 'Larry Epstein soloing at the Lucky Horseshoe Jazz Jam',
  },
  {
    src: '2025.04.23_03-Shoe_Jam.jpg',
    alt: 'Leo on the flugelhorn at the Lucky Horseshoe Dirty Works Jazz Jam',
  },
]

const currentIndex = ref(0)
let intervalId: number
let image = images[0]

const isTimerPaused = ref(false)

const getImageUrl = (image: string) => {
  return new URL('/media/images/' + image, import.meta.url).href
}

const nextImage = () => {
  clearInterval(intervalId)
  next()
  intervalId = setInterval(() => {
    next()
  }, 6000)
}

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % images.length

  let newImg = images[currentIndex.value] as { src: string; alt: string }

  var link = document.getElementById('imagePreload') as HTMLLinkElement
  if (link == null) link = document.createElement('link')

  link.id = 'imagePreload'
  link.rel = 'preload'
  link.href = getImageUrl(newImg.src)
  link.as = 'image'

  document.body.appendChild(link)
  var img = document.getElementById('image') as HTMLImageElement
  img?.classList.remove('show')
  img?.classList.add('fade')
  setTimeout(function () {
    img.src = getImageUrl(newImg.src)
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
  images = [image, ...shuffleArray(images.slice(1))]
  start()
})

onUnmounted(() => {
  clearInterval(intervalId)
})

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}
</script>

<style scoped>
.image {
  display: block;
  margin: 1rem auto 2rem;
  width: 90%;
  max-width: 400px;
  transition: opacity 1.5s ease-in-out;
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
