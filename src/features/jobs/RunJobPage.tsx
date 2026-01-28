import {useState} from 'react'
import type {SelectChangeEvent} from '@mui/material'
import {Box, Button, Container, FormControl, InputLabel, MenuItem, Select, Typography} from '@mui/material'
import ProcessMigrationJobForm from './components/form/ProcessMigrationJobForm.tsx'
import type {JobPayload} from '../../lib/model/job/JobPayload'
import {runJob} from '../../lib/rest/AdminClient'
import {ServerError} from '../../lib/rest/error/ServerError'
import AppSnackbar from '../../components/AppSnackbar'
import CompactionJobForm from './components/form/CompactionJobForm.tsx'

export interface JobFormProps<T = JobPayload> {
    onChange: (payload: T | null) => void
}

export default function RunJobPage() {
    const [jobType, setJobType] = useState('')
    const [payload, setPayload] = useState<any | null>(null)
    const [loading, setLoading] = useState(false)

    const [snackbar, setSnackbar] = useState<{
        open: boolean
        message: string
        detailedMessage?: string
        severity: 'success' | 'error'
    }>({
        open: false,
        message: '',
        severity: 'success'
    })

    const handleJobTypeChange = (event: SelectChangeEvent) => {
        setJobType(event.target.value)
        setPayload(null)
    }

    const handleRunJob = async () => {
        if (!payload || !jobType) return

        const job: JobPayload = {
            type: jobType,
            input: payload
        }

        try {
            setLoading(true)

            await runJob(job)

            setSnackbar({
                open: true,
                message: 'Job started successfully',
                severity: 'success'
            })

            setPayload(null)
            setJobType('')
        } catch (error) {
            console.error('Failed to run job', error)

            if (error instanceof ServerError) {
                setSnackbar({
                    open: true,
                    message: error.message,
                    detailedMessage: error.detailedMessage,
                    severity: 'error'
                })
            } else {
                setSnackbar({
                    open: true,
                    message: 'Failed to start job',
                    severity: 'error'
                })
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <Container sx={{p: 3, maxWidth: 600}}>
            <Typography variant="h4" gutterBottom>
                Run Job
            </Typography>

            <Box sx={{display: 'flex', flexDirection: 'column', gap: 3}}>
                <FormControl fullWidth>
                    <InputLabel id="job-type-label">Job type</InputLabel>
                    <Select
                        labelId="job-type-label"
                        value={jobType}
                        label="Job type"
                        onChange={handleJobTypeChange}
                    >
                        <MenuItem value="PROCESS_MIGRATION">
                            Process Migration
                        </MenuItem>
                        <MenuItem value="COMPACTION">
                            Compaction
                        </MenuItem>
                    </Select>
                </FormControl>

                {jobType === 'PROCESS_MIGRATION' && (
                    <ProcessMigrationJobForm onChange={setPayload}/>
                )}

                {jobType === 'COMPACTION' && (
                    <CompactionJobForm onChange={setPayload}/>
                )}

                <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button
                        variant="contained"
                        disabled={!payload || loading}
                        onClick={handleRunJob}
                    >
                        {loading ? 'Running…' : 'Run'}
                    </Button>
                </Box>
            </Box>

            <AppSnackbar
                open={snackbar.open}
                message={snackbar.message}
                detailedMessage={snackbar.detailedMessage}
                severity={snackbar.severity}
                onClose={() =>
                    setSnackbar(prev => ({...prev, open: false}))
                }
            />
        </Container>
    )
}
