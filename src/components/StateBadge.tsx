import {Chip} from '@mui/material'
import type {Activity} from '../lib/model/runtime/Activity.ts'
import type {Process} from '../lib/model/runtime/Process.ts'
import type {ProcessExecution} from '../lib/model/runtime/ProcessExecution.ts'
import type {Job} from '../lib/model/job/Job.ts'

function resolveBadgeLabel(
    state: BadgeState,
    suspended?: boolean
): string {
    return state === 'unrecognised' ? 'unknown' : suspended
        ? `${state} · suspended`
        : state
}

type Execution = Activity | Process | ProcessExecution | Job

type BadgeState =
    | 'scheduled'
    | 'active'
    | 'completed'
    | 'terminated'
    | 'failed'
    | 'incident'
    | 'running'
    | 'created'
    | 'unrecognised'

function resolveBadgeState(execution: Execution): BadgeState {
    if ('failed' in execution && execution.failed) {
        return 'failed'
    }

    if ('incident' in execution && execution.incident) {
        return 'incident'
    }

    if ('active' in execution && execution.active) {
        return 'active'
    }

    if ('completed' in execution && execution.completed) {
        return 'completed'
    }

    if ('terminated' in execution && execution.terminated) {
        return 'terminated'
    }

    if ('scheduled' in execution && execution.scheduled) {
        return 'scheduled'
    }

    if ('created' in execution && execution.created) {
        return 'created'
    }

    if ('running' in execution && execution.running) {
        return 'running'
    }

    return 'unrecognised'
}

const badgeColors: Record<
    BadgeState,
    'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'default'
> = {
    scheduled: 'secondary',
    created: 'secondary',
    active: 'primary',
    running: 'primary',
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

    const suspended = 'suspended' in execution ? execution.suspended : false
    const label = resolveBadgeLabel(state, suspended)

    return (
        <Chip
            label={label}
            color={color}
            size="small"
            variant="outlined"
        />
    )
}