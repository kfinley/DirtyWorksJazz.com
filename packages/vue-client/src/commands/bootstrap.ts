import type { Command } from "@/types/command";
import { LoadEventsCommand } from "./load-events";

export class BootstrapCommand implements Command<{}, {}> {
    async runAsync(params: {}): Promise<{}> {

        new LoadEventsCommand().runAsync({});
        return {}
    }
}
