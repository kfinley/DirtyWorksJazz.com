<template>
  <div class="schedule">
    <h3>Full Schedule</h3>
    <h2>{{ events.thisMonth.name }}</h2>
    <table  v-for="(event, index) in events.thisMonth.events" :key="index">
      {{ ((date = new Date(event.date)), null) }}
      {{ ((month = date.toLocaleString('en-US', { month: 'numeric' })), null) }}
      {{ ((day = date.toLocaleString('en-US', { day: 'numeric' }).toString()), null) }}
      {{ ((weekday = date.toLocaleString('en-US', { weekday: 'short' })), null) }}
      <thead>
        <tr>
          <th>{{ weekday }} {{month}}/{{day}}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td v-html="event.name"></td>
        </tr>
        <tr>
          <td v-html=event.location></td>
        </tr>
        <tr>
          <td>{{ event.time }}</td>
        </tr>
      </tbody>
    </table>
    <h2>{{ events.nextMonth.name }}</h2>
    <table  v-for="(event, index) in events.nextMonth.events" :key="index">
      {{ ((date = new Date(event.date)), null) }}
      {{ ((month = date.toLocaleString('en-US', { month: 'numeric' })), null) }}
      {{ ((day = date.toLocaleString('en-US', { day: 'numeric' }).toString()), null) }}
      {{ ((weekday = date.toLocaleString('en-US', { weekday: 'short' })), null) }}
      <thead>
        <tr>
          <th>{{ weekday }} {{month}}/{{day}}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td v-html=event.name></td>
        </tr>
        <tr>
          <td v-html=event.location></td>
        </tr>
        <tr>
          <td>{{ event.time }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { useEventsStore } from '@/stores/events'

const events = useEventsStore()
</script>

<style>

.schedule {
  text-align: center !important;
}


table {
  min-width: 250px;
  display: inline-table;
  margin-top: 12px;
}

th:nth-child(1) {
  background: var(--c-red);
  border-radius: 5px;
  color: white;
}

tr:nth-child(1) {
  font-style: italic;
  font-weight: bold;
}

tr:nth-last-child(1) {
  font-style: italic;
}

td {
  max-width: 50px;
}

@media (min-width: 1024px) {
  @media (orientation: landscape) {
    .schedule {
      padding-top: 50px;
    }
  }
}

</style>
