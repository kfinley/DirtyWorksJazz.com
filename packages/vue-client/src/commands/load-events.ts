import { useEventsStore } from "@/stores/events";
import type { Command } from "@/types/command";
import type MonthlyGigs from "@/types/monthly-gigs";

export class LoadEventsCommand implements Command<{}, {}> {

    private store = useEventsStore();

    today = new Date()
    month = this.today.toLocaleString('en-US', { month: '2-digit' })
    year = this.today.getUTCFullYear()

    nextMonthDate = new Date(this.today.getFullYear(), this.today.getMonth() + 1, 1)
    followingMonth = this.nextMonthDate.toLocaleString('en-US', { month: '2-digit' })
    followingYear = this.nextMonthDate.getUTCFullYear()

    async runAsync(params: {}): Promise<{}> {

        await this.#loadThisMonthAndNext()

        await this.#loadUpcomingEvents()

        return {}
    }

    async #loadThisMonthAndNext() {
        await import(`@/assets/gigs/${this.year}.${this.month}.json`).then(val => {

            this.store.$state.thisMonth = {
                name: (<MonthlyGigs>val.default).month,
                events: (<MonthlyGigs>val.default).gigs
            };
        });

        await import(`@/assets/gigs/${this.followingYear}.${this.followingMonth}.json`).then(val => {

            this.store.$state.nextMonth = {
                name: (<MonthlyGigs>val.default).month,
                events: (<MonthlyGigs>val.default).gigs
            }
        });
    }

    async #loadUpcomingEvents() {
        this.today.setHours(0, 0, 0, 0)
        
        this.store.$state.upcomingEvents = this.store.$state.thisMonth
            .events
            .filter((i) => new Date(i.date) >= this.today)
            .slice(0, 5)

        if (this.store.$state.upcomingEvents.length < 5) {
            let needed = 5 - this.store.$state.upcomingEvents.length
            this.store.$state.upcomingEvents.push(...this.store.$state.nextMonth
                .events
                .filter((i) => new Date(i.date) >= this.today)
                .slice(0, needed))
        }
    }
}
