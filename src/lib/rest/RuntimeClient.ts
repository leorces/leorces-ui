import type {CorrelateMessageRequest} from './request/CorrelateMessageRequest.ts'
import {API_URL} from './constants/ApiConstants.ts'

export async function setVariables(executionId: string, variables: Record<string, any>): Promise<void> {
    await fetch(`${API_URL}/api/v1/runtime/${executionId}/variables`,
        {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(variables)
        }
    )
}

export async function setLocalVariables(executionId: string, variables: Record<string, any>): Promise<void> {
    await fetch(`${API_URL}/api/v1/runtime/${executionId}/variables/local`,
        {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(variables)
        }
    )
}

export async function correlateMessage(req: CorrelateMessageRequest): Promise<void> {
    await fetch(`${API_URL}/api/v1/runtime/correlate`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(req)
    })
}
