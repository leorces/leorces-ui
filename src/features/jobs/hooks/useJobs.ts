import {useCallback, useEffect, useState} from 'react'
import type {Pageable} from '../../../lib/model/pagination/Pageable.ts'
import type {PageableData} from '../../../lib/model/pagination/PageableData.ts'
import type {Job} from '../../../lib/model/job/Job.ts'
import {fetchJobs} from '../../../lib/rest/AdminClient.ts'

export function useJobs(initialPage = 0, initialLimit = 10) {
    const [data, setData] = useState<PageableData<Job> | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [page, setPage] = useState(initialPage)
    const [rowsPerPage, setRowsPerPage] = useState(initialLimit)
    const [state, setState] = useState<string | undefined>(undefined)
    const [filter, setFilter] = useState<string | undefined>(undefined)

    const loadData = useCallback(() => {
        setLoading(true)
        setError(null)

        const params: Pageable = {page, limit: rowsPerPage}
        if (filter) params.filter = filter
        if (state) params.state = state.toUpperCase()

        fetchJobs(params)
            .then(setData)
            .catch(() => setError('Failed to load processes'))
            .finally(() => setLoading(false))
    }, [page, rowsPerPage, state, filter])

    useEffect(() => {
        loadData()
    }, [loadData])

    const setSearchParams = useCallback((pageable: Pageable) => {
        const {page: newPage = 0, limit = 10, state: newState, filter: newFilter} = pageable
        setPage(newPage)
        setRowsPerPage(limit)
        setFilter(newFilter)
        setState(newState)
    }, [])

    return {data, loading, error, page, rowsPerPage, filter, setSearchParams, reload: loadData}
}
