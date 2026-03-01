import type Event from "./event";

export default interface MonthlyGigs {
    month: string;
    gigs: [
        Event
    ]
}
