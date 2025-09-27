import {ProcessState} from "@/lib/model/runtime/ProcessState";
import {ActivityState} from "@/lib/model/runtime/ActivityState";
import {Chip} from "@mui/material";

interface StateBadgeProps {
    state: ActivityState | ProcessState
}

function getColor(state: ActivityState | ProcessState): "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning" {
    switch (state) {
        case ActivityState.SCHEDULED:
            return "secondary";
        case ActivityState.ACTIVE:
        case ProcessState.ACTIVE:
            return "primary";
        case ActivityState.COMPLETED:
        case ProcessState.COMPLETED:
            return "success";
        case ActivityState.CANCELED:
        case ProcessState.CANCELED:
            return "default";
        case ActivityState.TERMINATED:
        case ProcessState.TERMINATED:
            return "warning";
        case ActivityState.FAILED:
        case ProcessState.INCIDENT:
            return "error";
        default:
            return "default";
    }
}

export default function StateBadge({state}: StateBadgeProps) {
    return (
        <Chip label={state.toLowerCase()} color={getColor(state)} size="small" variant="outlined"/>
    );
}
