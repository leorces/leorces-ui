import type {JobState} from './JobState.ts'

export interface Job {
    id: string;
    type: string;
    state: JobState;
    input: Record<string, unknown>;
    output: Record<string, unknown>;
    failureReason?: string | null;
    failureTrace?: string | null;
    retries: number;
    createdAt: string;     // ISO-8601
    updatedAt?: string | null;
    startedAt?: string | null;
    completedAt?: string | null;
}
