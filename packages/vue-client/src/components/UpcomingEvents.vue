<template>
  <EventItem v-for="(event, index) in events.upcomingEvents" :key="index">
    <template #icon>
      {{ ((date = new Date(event.date)), null) }}
      {{ ((month = date.toLocaleString('en-US', { month: 'short' })), null) }}
      {{ ((day = date.toLocaleString('en-US', { day: 'numeric' }).toString()), null) }}
      {{ ((weekday = date.toLocaleString('en-US', { weekday: 'long' })), null) }}
      <CalendarDateIcon :month :day :weekday class="icon" />
    </template>
    <template #heading>
      <span v-html="event.name"></span><br />
      <i>{{ weekday }}, {{ month }}. {{ numberOrdinal(day) }}, {{ event.time }}</i>
    </template>
    <span v-html="event.description"></span><br />
    <i>{{ event.players }}</i>
  </EventItem>
  <h2 style="text-align: center !important;">
  <router-link to="/calendar">View Full Schedule</router-link>
  </h2>
</template>

<script setup lang="ts">
import EventItem from './EventItem.vue'
import CalendarDateIcon from './icons/IconCalendarDate.vue'
import { numberOrdinal } from '@/utils'
import { useEventsStore } from '@/stores/events'

const events = useEventsStore()
</script>

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
