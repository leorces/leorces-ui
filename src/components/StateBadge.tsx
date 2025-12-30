import {Chip} from '@mui/material'
import type {Activity} from '../lib/model/runtime/Activity.ts'
import type {Process} from '../lib/model/runtime/Process.ts'
import type {ProcessExecution} from '../lib/model/runtime/ProcessExecution.ts'


function resolveBadgeLabel(
    state: BadgeState,
    suspended?: boolean
): string {
    return state === 'unrecognised' ? 'unknown' : suspended
        ? `${state} · suspended`
        : state
}

type Execution = Activity | Process | ProcessExecution

type BadgeState =
    | 'scheduled'
    | 'active'
    | 'completed'
    | 'terminated'
    | 'failed'
    | 'incident'
    | 'unrecognised'

function resolveBadgeState(execution: Execution): BadgeState {
    if ('failed' in execution && execution.failed) {
        return 'failed'
    }

    if ('incident' in execution && execution.incident) {
        return 'incident'
    }

    if (execution.active) {
        return 'active'
    }

    if (execution.completed) {
        return 'completed'
    }

    if (execution.terminated) {
        return 'terminated'
    }

    if ('scheduled' in execution && execution.scheduled) {
        return 'scheduled'
    }

    return 'unrecognised'
}

const badgeColors: Record<
    BadgeState,
    'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'default'
> = {
    scheduled: 'secondary',
    active: 'primary',
    completed: 'success',
    terminated: 'warning',
    failed: 'error',
    incident: 'error',
    unrecognised: 'default'
}


interface StateBadgeProps {
    execution: Execution
}

export default function StateBadge({execution}: StateBadgeProps) {
    const state = resolveBadgeState(execution)
    const color = badgeColors[state]

    const label = resolveBadgeLabel(state, execution.suspended)

    return (
        <Chip
            label={label}
            color={color}
            size="small"
            variant="outlined"
        />
    )
}