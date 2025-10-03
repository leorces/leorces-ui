import {useCallback, useEffect, useState} from 'react'
import type {Pageable} from '../../../lib/model/pagination/Pageable.ts'
import type {PageableData} from '../../../lib/model/pagination/PageableData.ts'
import {fetchProcesses} from '../../../lib/rest/ProcessClient.ts'
import type {Process} from '../../../lib/model/runtime/Process.ts'

export function useProcesses(initialParams: Pageable = {page: 0, limit: 10}) {
    const [data, setData] = useState<PageableData<Process> | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [params, setParams] = useState<Pageable>(initialParams)

    const loadData = useCallback(() => {
        setLoading(true)
        setError(null)

        const effectiveParams: Pageable = {
            ...params,
            state: params.state && params.state !== 'All' ? params.state.toUpperCase() : undefined
        }

        fetchProcesses(effectiveParams)
            .then(setData)
            .catch(() => {
                setError('Failed to load processes')
                setData(null)
            })
            .finally(() => setLoading(false))
    }, [params])

    useEffect(() => {
        loadData()
    }, [loadData])

    const updateParams = useCallback((newParams: Pageable) => {
        setParams((prev) => {
            const next = {...prev, ...newParams}

            if (newParams.limit && newParams.limit !== prev.limit) {
                next.page = 0
            }

            return next
        })
    }, [])

    return {data, loading, error, params, setParams: updateParams, reload: loadData}
}
