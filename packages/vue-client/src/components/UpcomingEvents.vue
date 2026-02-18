<script setup lang="ts">
import EventItem from './EventItem.vue'
import CalendarDateIcon from './icons/IconCalendarDate.vue'

</script>

<template>
  <EventItem>
    <template #icon>
      <CalendarDateIcon month="Feb" day="18" weekday="Wednesday" class="icon" />
    </template>
    <template #heading
      >Dirty Works Jazz Jam @ The Lucky Horseshoe <br /><i
        >Wednesday Feb. 18th, 8 - 11 PM</i
      ></template
    >
    Open Jazz Jam at
    <a href="https://www.theluckyhorseshoebar.com" target="theshoe">The Lucky Horseshoe</a> 453
    Cortland Ave in Bernal Heights, SF, CA.<br />
    <i>Kyle Finley Bass, Tim Caldwell Drums, Keys open</i>
  </EventItem>

   <EventItem>
    <template #icon>
      <CalendarDateIcon month="Feb" day="19" weekday="Thursday" class="icon" />
    </template>
    <template #heading
      >Dirty Works Jazz Jam @ Paris 75 <br /><i>Thursday Feb. 19th, 8 - 11 PM</i></template
    >
    Open Jazz Jam at <a href="https://lppsf.com" target="paris75">Paris 75</a> 515 Broadway, North Beach SF, CA<br />
    <i
      >Kyle Finley Bass, Richard Batelaan Sax & Keys, & Jammers</i
    >
  </EventItem>

  <EventItem>
    <template #icon>
      <CalendarDateIcon month="Feb" day="23" weekday="Monday" class="icon" />
    </template>
    <template #heading
      >Dirty Works Jazz Night @ Persona <br /><i>Monday Feb. 23rd, 8 - 1:30 AM</i></template
    >
    Open Jazz Jam at <a href="https://www.persona-sf.com" target="persona">Persona</a> 685 Sutter
    St., SF, CA<br />
    <i
      >Kyle Finley Bass, Jeff Orchard Keys, Richard Batelaan Sax & Keys, & Tim Shae Guitar &
      Drums</i
    >
  </EventItem>

  <EventItem>
    <template #icon>
      <CalendarDateIcon month="Feb" day="25" weekday="Wednesday" class="icon" />
    </template>
    <template #heading
      >Dirty Works Jazz Jam @ The Lucky Horseshoe <br /><i
        >Wednesday Feb. 25th, 8 - 11 PM</i
      ></template
    >
    Open Jazz Jam at
    <a href="https://www.theluckyhorseshoebar.com" target="theshoe">The Lucky Horseshoe</a> 453
    Cortland Ave in Bernal Heights, SF, CA.<br />
    <i>Kyle Finley Bass, Tim Caldwell Drums, Keys open</i>
  </EventItem>

  <EventItem>
    <template #icon>
      <CalendarDateIcon month="Feb" day="27" weekday="Friday" class="icon" />
    </template>
    <template #heading
      >Dirty Works Acoustic Jam @ Hop Oast <br /><i
        >Friday Feb. 27th, 5 - 7 PM</i
      ></template
    >
    Acoustic Jazz Jam at
    <a href="https://hopoast.com" target="hopoast">Hop Oast Brewery</a> 2887 Bryant St., SF, CA.<br />
    <i>Kyle Finley Bass with jammers</i>
  </EventItem>
</template>

<style scoped>
.icon {
  margin-top: 2rem;
}
@media (min-width: 1024px) {
  .icon {
    margin-top: 0;
  }
}
</style>
