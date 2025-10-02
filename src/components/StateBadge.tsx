import {Chip} from "@mui/material";
import type {ActivityState} from "../lib/model/runtime/ActivityState.ts";
import type {ProcessState} from "../lib/model/runtime/ProcessState.ts";

interface StateBadgeProps {
    state: ActivityState | ProcessState
}

function getColor(state: ActivityState | ProcessState) {
    switch (state) {
        case "SCHEDULED":
            return "secondary";
        case "ACTIVE":
            return "primary";
        case "COMPLETED":
            return "success";
        case "CANCELED":
            return "default";
        case "TERMINATED":
            return "warning";
        case "FAILED":
        case "INCIDENT":
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
