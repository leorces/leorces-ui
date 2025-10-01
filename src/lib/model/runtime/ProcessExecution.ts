import {Variable} from "@/lib/model/runtime/Variable";
import {ProcessState} from "@/lib/model/runtime/ProcessState";
import {ProcessDefinition} from "@/lib/model/definition/ProcessDefinition";
import {Activity} from "@/lib/model/runtime/Activity";

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
