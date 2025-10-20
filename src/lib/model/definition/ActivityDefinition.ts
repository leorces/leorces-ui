import type {ActivityType} from './ActivityType.ts'
import type {VariableMapping} from './VariableMapping.ts'

export interface ActivityDefinition {
    id: string;
    parentId?: string;
    name: string;
    topic?: string;
    errorCode?: string;
    messageReference?: string;
    calledElement?: string;
    calledElementVersion?: number;
    type: ActivityType;
    inputMappings?: VariableMapping[],
    outputMappings?: VariableMapping[],
    incoming: string[];
    outgoing: string[];
    condition?: Record<string, string[] | string> | string;
    inputs: Record<string, never>;
    outputs: Record<string, never>;
}
