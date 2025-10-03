import type {Pageable} from '../model/pagination/Pageable.ts'
import type {PageableData} from '../model/pagination/PageableData.ts'
import type {Process} from '../model/runtime/Process.ts'
import type {ProcessExecution} from '../model/runtime/ProcessExecution.ts'
import {API_URL} from './constants/ApiConstants.ts'

export async function fetchProcesses(params: Pageable = {}): Promise<PageableData<Process>> {
    const query = new URLSearchParams()

    if (params.page !== undefined) query.append('page', params.page.toString())
    if (params.limit !== undefined) query.append('limit', params.limit.toString())
    if (params.sort) query.append('sort', params.sort)
    if (params.order) query.append('order', params.order)
    if (params.filter) query.append('filter', params.filter)
    if (params.state) query.append('state', params.state)

    const res = await fetch(`${API_URL}/api/v1/processes?${query.toString()}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    })

    return (await res.json()) as PageableData<Process>
}

export async function fetchProcess(processId: string): Promise<ProcessExecution> {
    const res = await fetch(`${API_URL}/api/v1/processes/${processId}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    })

    return (await res.json()) as ProcessExecution
}
