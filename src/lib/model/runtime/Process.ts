import type {Variable} from './Variable.ts'
import type {ProcessState} from './ProcessState.ts'
import type {ProcessDefinition} from '../definition/ProcessDefinition.ts'

export interface Process {
    id: string;
    rootProcessId: string;
    businessKey: string;
    variables: Variable[];
    state: ProcessState;
    definition: ProcessDefinition;
    createdAt: string;
    updatedAt: string;
    startedAt?: string;
    completedAt?: string;
}