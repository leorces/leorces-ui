import {useCallback, useEffect, useState} from 'react'
import type {ProcessDefinition} from '../../../lib/model/definition/ProcessDefinition.ts'
import {fetchDefinition} from '../../../lib/rest/DefinitionClient.ts'

export function useDefinition(definitionId: string | undefined) {
    const [definition, setDefinition] = useState<ProcessDefinition | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const load = useCallback(() => {
        if (!definitionId) return
        setLoading(true)
        setError(null)

        fetchDefinition(definitionId)
            .then(setDefinition)
            .catch(() => setError(`Failed to load definition: ${definitionId}`))
            .finally(() => setLoading(false))
    }, [definitionId])

    useEffect(() => {
        load()
    }, [load])

    return {definition, loading, error, reload: load}
}
