import {ActivityState} from "@/lib/model/runtime/ActivityState";
import {ProcessState} from "@/lib/model/runtime/ProcessState";

export function isTerminal(state: ActivityState | ProcessState | undefined) {
    if (!state) return false;
    return state === ActivityState.COMPLETED
        || state === ProcessState.COMPLETED
        || state === ActivityState.CANCELED
        || state === ProcessState.CANCELED
        || state === ActivityState.TERMINATED
        || state === ProcessState.TERMINATED;
}