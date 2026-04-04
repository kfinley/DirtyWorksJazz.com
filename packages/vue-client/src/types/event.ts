export default interface Event {
    date: Date;
    name: string;
    description: string;
    players: string;
    featuring: string | null;
    location: string;
    time: string;
}
