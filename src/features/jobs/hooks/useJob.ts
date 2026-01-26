import {useCallback, useEffect, useState} from 'react'
import type {Job} from '../../../lib/model/job/Job.ts'
import {fetchJob} from '../../../lib/rest/AdminClient.ts'

export function useJob(jobId: string | undefined) {
    const [job, setJob] = useState<Job | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const load = useCallback(() => {
        if (!jobId) return
        setLoading(true)
        setError(null)

        fetchJob(jobId)
            .then(setJob)
            .catch(() => setError(`Failed to load job: ${jobId}`))
            .finally(() => setLoading(false))
    }, [jobId])

    useEffect(() => {
        load()
    }, [load])

    return {job, loading, error, reload: load}
}
