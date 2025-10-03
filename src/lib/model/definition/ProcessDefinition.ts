import type {ActivityDefinition} from './ActivityDefinition.ts'
import type {ErrorItem} from './ErrorItem.ts'
import type {ProcessDefinitionMetadata} from './ProcessDefinitionMetadata.ts'

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