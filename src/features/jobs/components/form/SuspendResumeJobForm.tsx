import {useEffect, useState} from 'react'
import {TextField} from '@mui/material'
import Box from '@mui/material/Box'
import AppSnackbar from '../../../../components/AppSnackbar.tsx'
import type {JobFormProps} from '../../RunJobPage.tsx'
import type {ProcessSuspendResumeData} from '../../../../lib/model/job/payload/ProcessSuspendResumeData.ts'

export default function SuspendResumeJobForm({
                                                 onChange
                                             }: JobFormProps<ProcessSuspendResumeData>) {

    const [params, setParams] = useState<ProcessSuspendResumeData>({
        processDefinitionKey: '',
        processDefinitionVersion: undefined
    })

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

    useEffect(() => {
        const isDataValid = params.processDefinitionKey.trim().length > 0
        const nextPayload = isDataValid ? params : null

        onChange(nextPayload)
    }, [params, onChange])

    const handleCloseSnackbar = () => {
        setSnackbar(prev => ({...prev, open: false}))
    }

    return (
        <>
            <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
                <TextField
                    label="Process definition key"
                    value={params.processDefinitionKey}
                    onChange={e =>
                        setParams(p => ({...p, processDefinitionKey: e.target.value}))
                    }
                    fullWidth
                    required
                />

                <TextField
                    label="Process definition version"
                    type="number"
                    value={params.processDefinitionVersion || ''}
                    onChange={e =>
                        setParams(p => ({
                            ...p,
                            processDefinitionVersion: Number(e.target.value)
                        }))
                    }
                    fullWidth
                />
            </Box>

            <AppSnackbar
                open={snackbar.open}
                message={snackbar.message}
                detailedMessage={snackbar.detailedMessage}
                severity={snackbar.severity}
                onClose={handleCloseSnackbar}
            />
        </>
    )
}
