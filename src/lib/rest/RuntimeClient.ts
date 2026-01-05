import type {CorrelateMessageRequest} from './request/CorrelateMessageRequest.ts'
import {API_URL} from './constants/ApiConstants.ts'
import type {ErrorResponse} from './response/ErrorResponse.ts'
import {serverErrorFromResponse} from './error/ServerError.ts'

export async function terminateProcess(processId: string): Promise<void> {
    await fetch(
        `${API_URL}/api/v1/runtime/processes/${processId}/terminate`,
        {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'}
        }
    )
}

export async function suspendProcess(processId: string): Promise<void> {
    await fetch(
        `${API_URL}/api/v1/runtime/processes/${processId}/suspend`,
        {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'}
        }
    )
}

export async function resumeProcess(processId: string): Promise<void> {
    await fetch(
        `${API_URL}/api/v1/runtime/processes/${processId}/resume`,
        {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'}
        }
    )
}

export async function moveExecution(processId: string, activityId: string, targetDefinitionId: string): Promise<void> {
    const response = await fetch(
        `${API_URL}/api/v1/runtime/processes/${processId}/modification`,
        {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                activityId,
                targetDefinitionId
            })
        }
    )

    if (!response.ok) {
        const errorBody: ErrorResponse = await response.json()
        throw serverErrorFromResponse(errorBody)
    }
}

export async function setVariables(executionId: string, variables: Record<string, any>): Promise<void> {
    await fetch(`${API_URL}/api/v1/runtime/${executionId}/variables`,
        {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(variables)
        }
    )
}

export async function setLocalVariables(
    executionId: string,
    variables: Record<string, any>
): Promise<void> {
    const response = await fetch(
        `${API_URL}/api/v1/runtime/${executionId}/variables/local`,
        {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(variables)
        }
    )

    if (!response.ok) {
        const errorBody: ErrorResponse = await response.json()
        throw serverErrorFromResponse(errorBody)
    }
}


export async function correlateMessage(req: CorrelateMessageRequest): Promise<void> {
    const response = await fetch(`${API_URL}/api/v1/runtime/correlate`,
        {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(req)
        })

    if (!response.ok) {
        const errorBody: ErrorResponse = await response.json()
        throw serverErrorFromResponse(errorBody)
    }
}
