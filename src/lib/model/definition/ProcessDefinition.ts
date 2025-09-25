import {ActivityDefinition} from "@/lib/model/definition/ActivityDefinition";
import {ErrorItem} from "@/lib/model/definition/ErrorItem";
import {ProcessDefinitionMetadata} from "@/lib/model/definition/ProcessDefinitionMetadata";

export interface ProcessDefinition {
    id: string;
    key: string;
    name: string;
    version: number;
    activities: ActivityDefinition[];
    messages: string[];
    errors: ErrorItem[];
    metadata: ProcessDefinitionMetadata;
    createdAt: string;
    updatedAt: string;
}