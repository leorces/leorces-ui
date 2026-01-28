import type {Pageable} from '../model/pagination/Pageable.ts'
import type {PageableData} from '../model/pagination/PageableData.ts'
import {API_URL} from './constants/ApiConstants.ts'
import type {Job} from '../model/job/Job.ts'
import type {ProcessMigrationPlan} from '../model/job/migration/ProcessMigrationPlan.ts'
import type {ErrorResponse} from './response/ErrorResponse.ts'
import {serverErrorFromResponse} from './error/ServerError.ts'
import type {JobPayload} from '../model/job/JobPayload.ts'

export async function fetchJobs(params: Pageable = {}): Promise<PageableData<Job>> {
    const query = new URLSearchParams()

    if (params.page !== undefined) query.append('page', params.page.toString())
    if (params.limit !== undefined) query.append('limit', params.limit.toString())
    if (params.sort) query.append('sort', params.sort)
    if (params.order) query.append('order', params.order)
    if (params.filter) query.append('filter', params.filter)
    if (params.state) query.append('state', params.state)

    const response = await fetch(`${API_URL}/api/v1/admin/jobs?${query.toString()}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    })

    return (await response.json()) as PageableData<Job>
}

export async function fetchJob(jobId: string): Promise<Job> {
    const response = await fetch(`${API_URL}/api/v1/admin/jobs/${jobId}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    })

    return (await response.json()) as Job
}

export async function runJob<T>(
    job: JobPayload<T>
): Promise<void> {
    const response = await fetch(`${API_URL}/api/v1/admin/jobs/run`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(job)
    })

    if (!response.ok) {
        const errorBody: ErrorResponse = await response.json()
        throw serverErrorFromResponse(errorBody)
    }
}

export async function generateProcessMigrationPlan(migration: ProcessMigrationPlan): Promise<ProcessMigrationPlan> {
    const response = await fetch(`${API_URL}/api/v1/admin/migration`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(migration)
    })

    if (!response.ok) {
        const errorBody: ErrorResponse = await response.json()
        throw serverErrorFromResponse(errorBody)
    }

    return (await response.json()) as ProcessMigrationPlan
}