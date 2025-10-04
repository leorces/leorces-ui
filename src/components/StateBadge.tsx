import {Chip} from '@mui/material'
import type {ActivityState} from '../lib/model/runtime/ActivityState.ts'
import type {ProcessState} from '../lib/model/runtime/ProcessState.ts'

interface StateBadgeProps {
    state: ActivityState | ProcessState;
}

const stateColors: Record<ActivityState | ProcessState, 'primary' | 'secondary' | 'success' | 'warning' | 'error'> = {
    SCHEDULED: 'secondary',
    ACTIVE: 'primary',
    COMPLETED: 'success',
    TERMINATED: 'warning',
    FAILED: 'error',
    INCIDENT: 'error'
}

export default function StateBadge({state}: StateBadgeProps) {
    const color = stateColors[state] ?? 'default'

    return (
        <Chip
            label={state.toLocaleLowerCase()}
            color={color}
            size="small"
            variant="outlined"
        />
    )
}
