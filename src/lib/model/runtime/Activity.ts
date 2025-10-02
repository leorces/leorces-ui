import type {Variable} from "./Variable.ts";
import type {ActivityState} from "./ActivityState.ts";

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
