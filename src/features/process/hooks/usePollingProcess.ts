import {useEffect, useRef, useState} from 'react'
import type {ProcessExecution} from '../../../lib/model/runtime/ProcessExecution.ts'
import {fetchProcess} from '../../../lib/rest/ProcessClient.ts'

export function usePollingProcess(processId?: string) {
    const [process, setProcess] = useState<ProcessExecution | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

    const loadProcess = async () => {
        if (!processId) return
        try {
            const fetchedProcess = await fetchProcess(processId)
            setProcess(fetchedProcess)
            setError(null)
        } catch {
            setProcess(null)
            setError(`Failed to load process: ${processId}`)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!processId) return
        setLoading(true)
        loadProcess()
    }, [processId])

    useEffect(() => {
        if (!processId) return

        if (intervalRef.current) return

        intervalRef.current = setInterval(loadProcess, 2000)

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
                intervalRef.current = null
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [processId])

    return {process, loading, error}
}
