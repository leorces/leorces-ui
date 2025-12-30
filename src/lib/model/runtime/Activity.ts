import type {Variable} from './Variable.ts'
import type {ActivityState} from './ActivityState.ts'
import type {ActivityFailure} from './ActivityFailure.ts'

export interface Activity {
    id: string;
    definitionId: string;
    variables: Variable[];
    state: ActivityState;
    retries: number;
    failure?: ActivityFailure;
    scheduled: boolean;
    active: boolean;
    completed: boolean;
    terminated: boolean;
    failed: boolean;
    suspended: boolean;
    inTerminalState: boolean;
    createdAt: string;
    updatedAt: string;
    startedAt?: string;
    completedAt?: string;
}
