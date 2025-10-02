import type {Variable} from "./Variable.ts";
import type {Activity} from "./Activity.ts";
import type {ProcessState} from "./ProcessState.ts";
import type {ProcessDefinition} from "../definition/ProcessDefinition.ts";

export interface ProcessExecution {
    id: string;
    rootProcessId: string;
    businessKey: string;
    variables: Variable[];
    activities: Activity[];
    state: ProcessState;
    definition: ProcessDefinition;
    createdAt: string;
    updatedAt: string;
    startedAt?: string;
    completedAt?: string;
}
