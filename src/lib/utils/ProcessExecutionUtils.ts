import type {ProcessExecution} from '../model/runtime/ProcessExecution.ts'
import {isActive} from './StateUtils.ts'
import type {Activity} from '../model/runtime/Activity.ts'

export function getActiveActivities(process: ProcessExecution): Activity[] {
    return process.activities.filter(activity => isActive(activity.state))
}

export function getNotStartedActivityDefinitionIds(process: ProcessExecution): string[] {
    const startedDefinitionIds = new Set(process.activities.map(activity => activity.definitionId))
    return process.definition.activities
        .map(definition => definition.id)
        .filter(id => !startedDefinitionIds.has(id))
}
