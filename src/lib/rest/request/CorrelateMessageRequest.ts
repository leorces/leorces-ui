export interface CorrelateMessageRequest {
    message: string;
    businessKey?: string;
    correlationKeys?: Record<string, any>;
    processVariables?: Record<string, any>;
}