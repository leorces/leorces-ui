import type {ActivityState} from "../model/runtime/ActivityState.ts";
import type {ProcessState} from "../model/runtime/ProcessState.ts";

export function isTerminal(state: ActivityState | ProcessState | undefined): boolean {
    if (!state) return false;
    return state === "COMPLETED"
        || state === "CANCELED"
        || state === "TERMINATED";
}
