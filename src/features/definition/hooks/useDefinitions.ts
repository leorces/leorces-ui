import {useCallback, useEffect, useState} from 'react'
import type {PageableData} from '../../../lib/model/pagination/PageableData.ts'
import type {ProcessDefinition} from '../../../lib/model/definition/ProcessDefinition.ts'
import type {Pageable} from '../../../lib/model/pagination/Pageable.ts'
import {fetchDefinitions} from '../../../lib/rest/DefinitionClient.ts'

export function useDefinitions(initialPage = 0, initialLimit = 10) {
    const [data, setData] = useState<PageableData<ProcessDefinition> | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [page, setPage] = useState(initialPage)
    const [rowsPerPage, setRowsPerPage] = useState(initialLimit)
    const [filter, setFilter] = useState<string | undefined>(undefined)

    const loadData = useCallback(() => {
        setLoading(true)
        setError(null)

        const params: Pageable = {page, limit: rowsPerPage}
        if (filter) params.filter = filter

        fetchDefinitions(params)
            .then(setData)
            .catch(() => setError('Failed to load definitions'))
            .finally(() => setLoading(false))
    }, [page, rowsPerPage, filter])

    useEffect(() => {
        loadData()
    }, [loadData])

    const setSearchParams = useCallback((pageable: Pageable) => {
        const {page: newPage = 0, limit = 10, filter: newFilter} = pageable
        setPage(newPage)
        setRowsPerPage(limit)
        setFilter(newFilter)
    }, [])

    return {data, loading, error, page, rowsPerPage, filter, setSearchParams, reload: loadData}
}
