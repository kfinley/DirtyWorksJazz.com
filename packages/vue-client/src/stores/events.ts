import { reactive, ref, computed, toRefs } from 'vue'
import { defineStore } from 'pinia'
import type Event from '@/types/event'

type EventsState = {
    thisMonth: {
        name: string | null,
        events: Event[]
    }
    nextMonth: {
        name: string | null,
        events: Event[]
    },
    upcomingEvents: Event[]
}

export const useEventsStore = defineStore('events', () => {
    const state: EventsState = reactive<EventsState>({
        thisMonth: {
            name: null,
            events: []
        },
        nextMonth: {
            name: null,
            events: []
        },
        upcomingEvents: []
    })

    return {
        // State
        ...toRefs(state),
        // Getters
        // Actions
    }
})
