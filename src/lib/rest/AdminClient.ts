import type {Pageable} from '../model/pagination/Pageable.ts'
import type {PageableData} from '../model/pagination/PageableData.ts'
import {API_URL} from './constants/ApiConstants.ts'
import type {Job} from '../model/job/Job.ts'

export async function fetchJobs(params: Pageable = {}): Promise<PageableData<Job>> {
    const query = new URLSearchParams()

    if (params.page !== undefined) query.append('page', params.page.toString())
    if (params.limit !== undefined) query.append('limit', params.limit.toString())
    if (params.sort) query.append('sort', params.sort)
    if (params.order) query.append('order', params.order)
    if (params.filter) query.append('filter', params.filter)
    if (params.state) query.append('state', params.state)

    const res = await fetch(`${API_URL}/api/v1/admin/jobs?${query.toString()}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    })

    return (await res.json()) as PageableData<Job>
}

export async function fetchJob(jobId: string): Promise<Job> {
    const res = await fetch(`${API_URL}/api/v1/admin/jobs/${jobId}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    })

    return (await res.json()) as Job
}