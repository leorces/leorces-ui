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
    createdAt: string;
    updatedAt: string;
    startedAt?: string;
    completedAt?: string;
}
