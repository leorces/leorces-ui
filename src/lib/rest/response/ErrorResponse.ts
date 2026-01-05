export interface ErrorResponse {
    error: string
    message: string
    detailedMessage: string
    status: number
    timestamp: string
    validationErrors: Record<string, string>
    details: Record<string, any>
}
