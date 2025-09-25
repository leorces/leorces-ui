import {Variable} from "@/lib/model/runtime/Variable";
import {ProcessState} from "@/lib/model/runtime/ProcessState";
import {ProcessDefinition} from "@/lib/model/definition/ProcessDefinition";

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