import type {ErrorResponse} from '../response/ErrorResponse.ts'

export class ServerError extends Error {
    readonly detailedMessage?: string

    constructor(message: string, detailedMessage?: string) {
        super(message)
        this.name = 'ServerError'
        this.detailedMessage = detailedMessage
    }
}

export function serverErrorFromResponse(response: ErrorResponse): ServerError {
    return new ServerError(
        response.message,
        response.detailedMessage
    )
}