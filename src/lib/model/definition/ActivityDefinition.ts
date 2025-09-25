import {ActivityType} from "@/lib/model/definition/ActivityType";

export interface ActivityDefinition {
    id: string;
    parentId?: string;
    name: string;
    topic?: string;
    errorCode?: string;
    messageReference?: string;
    calledElement?: string;
    type: ActivityType;
    incoming: string[];
    outgoing: string[];
    condition?: Record<string, string[]> | Record<string, string> | String;
    inputs: Record<string, any>;
    outputs: Record<string, any>;
}
