<script setup lang="ts">
import EventItem from './EventItem.vue'
import CalendarDateIcon from './icons/IconCalendarDate.vue'
</script>

<template>
  <!-- 
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
  -->

  <EventItem>
    <template #icon>
      <CalendarDateIcon month="Feb" day="25" weekday="Wednesday" class="icon" />
    </template>
    <template #heading
      >Dirty Works Jazz Jam <br class="smart-break"/>@ The Lucky Horseshoe <br /><i
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
      <CalendarDateIcon month="Feb" day="26" weekday="Thursday" class="icon" />
    </template>
    <template #heading
      >Dirty Works Jazz Jam @ Paris 75 <br /><i>Thursday Feb. 26th, 8 - 11 PM</i></template
    >
    Open Jazz Jam at <a href="https://lppsf.com" target="paris75">Paris 75</a> 515 Broadway, North
    Beach SF, CA<br />
    <i>Kyle Finley Bass, Richard Batelaan Sax & Keys, TIm Caldwell Drums</i>
  </EventItem>

  <EventItem>
    <template #icon>
      <CalendarDateIcon month="Feb" day="27" weekday="Friday" class="icon" />
    </template>
    <template #heading
      >Dirty Works Acoustic Jam <br  class="smart-break"/>@ Hop Oast <br /><i>Friday Feb. 27th, 5 - 7 PM</i></template
    >
    Acoustic Jazz Jam at
    <a href="https://hopoast.com" target="hopoast">Hop Oast Brewery</a> 2887 Bryant St., SF, CA.<br />
    <i>Kyle Finley Bass + jammers</i>
  </EventItem>

  <EventItem>
    <template #icon>
      <CalendarDateIcon month="Mar" day="2" weekday="Monday" class="icon" />
    </template>
    <template #heading
      >Dirty Works Jazz Night @ Persona <br /><i>Monday Mar. 2nd, 8 - 1:30 AM</i></template
    >
    Open Jazz Jam at <a href="https://www.persona-sf.com" target="persona">Persona Cocktail Lounge</a> 685 Sutter
    St., SF, CA<br />
    <i
      >Kyle Finley Bass, Jeff Orchard Keys, Richard Batelaan Sax & Keys, & Tim Shae Guitar &
      Drums</i
    >
  </EventItem>

  <EventItem>
    <template #icon>
      <CalendarDateIcon month="Mar" day="4" weekday="Wednesday" class="icon" />
    </template>
    <template #heading
      >Wednesday Jazz Trio @ Paris 75 <br /><i>Wednesday Mar. 4th, 7:30 - 10:30 PM</i></template
    >
    Jazz trio at <a href="https://lppsf.com" target="paris75">Paris 75</a> 515 Broadway, North Beach SF,
    CA<br />
    <i>Kyle Finley Bass, Chris Guitar, Eden Chaloemtiarana Drums</i>
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
@media (max-width: 1023px) {
  @media (orientation: landscape) {
    .smart-break {
      display: none;
    }
  }
}

</style>
