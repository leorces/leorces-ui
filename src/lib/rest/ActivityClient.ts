import {API_URL} from './constants/ApiConstants.ts'

export async function runActivity(definitionId: string, processId: string): Promise<void> {
    await fetch(
        `${API_URL}/api/v1/activities/${processId}/${definitionId}/run`,
        {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'}
        }
    )
}

export async function completeActivity(activityId: string): Promise<void> {
    await fetch(
        `${API_URL}/api/v1/activities/${activityId}/complete`,
        {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'}
        }
    )
}

export async function retryActivity(activityId: string): Promise<void> {
    await fetch(
        `${API_URL}/api/v1/activities/${activityId}/retry`,
        {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'}
        }
    )
}

export async function terminateActivity(activityId: string): Promise<void> {
    await fetch(
        `${API_URL}/api/v1/activities/${activityId}/terminate`,
        {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'}
        }
    )
}