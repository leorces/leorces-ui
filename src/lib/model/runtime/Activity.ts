import {Variable} from "@/lib/model/runtime/Variable";
import {ActivityState} from "@/lib/model/runtime/ActivityState";

export interface Activity {
    id: string;
    definitionId: string;
    variables: Variable[];
    state: ActivityState;
    retries: number;
    createdAt: string;
    updatedAt: string;
    startedAt?: string;
    completedAt?: string;
}
