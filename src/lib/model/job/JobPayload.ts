export interface JobPayload<T = any> {
    type: string
    input: T
}