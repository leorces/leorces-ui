import {ActivityType} from "@/lib/model/definition/ActivityType";

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
    incoming: string[];
    outgoing: string[];
    condition?: Record<string, string[] | string> | string;
    inputs: Record<string, any>;
    outputs: Record<string, any>;
}
