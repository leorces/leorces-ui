import type {ProcessDefinition} from '../../../../lib/model/definition/ProcessDefinition.ts'
import {useEffect, useState} from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import AppSnackbar from '../../../AppSnackbar.tsx'
import type {ProcessSuspendResumeData} from '../../../../lib/model/job/payload/ProcessSuspendResumeData.ts'
import {runJob} from '../../../../lib/rest/AdminClient.ts'

interface ProcessDefinitionActionsProps {
    definition?: ProcessDefinition;
}

export default function ProcessDefinitionActions({definition}: ProcessDefinitionActionsProps) {
    const [suspended, setSuspended] = useState(definition?.suspended)
    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
        open: false,
        message: '',
        severity: 'success'
    })

    useEffect(() => {
        setSuspended(definition?.suspended)
    }, [definition?.suspended])

    const showSnackbar = (message: string, severity: 'success' | 'error') => {
        setSnackbar({open: true, message, severity})
    }

    const handleCloseSnackbar = () => {
        setSnackbar(prev => ({...prev, open: false}))
    }

    const suspend = async () => {
        if (!definition) return
        try {
            await runJob({
                type: 'PROCESS_SUSPEND',
                input: {
                    processDefinitionKey: definition.key,
                    processDefinitionVersion: definition.version
                } as ProcessSuspendResumeData
            })
            setSuspended(true)
            showSnackbar('Suspended successfully!', 'success')
        } catch {
            showSnackbar('Failed to suspend.', 'error')
        }
    }

    const resume = async () => {
        if (!definition) return
        try {
            await runJob({
                type: 'PROCESS_RESUME',
                input: {
                    processDefinitionKey: definition.key,
                    processDefinitionVersion: definition.version
                } as ProcessSuspendResumeData
            })
            setSuspended(false)
            showSnackbar('Resumed successfully!', 'success')
        } catch {
            showSnackbar('Failed to resume.', 'error')
        }
    }

    return (
        <>
            <Box sx={{pt: 1, display: 'flex', gap: 1}}>
                <>
                    {suspended && (
                        <Button
                            color="inherit"
                            variant="outlined"
                            size="small"
                            onClick={resume}
                        >
                            Resume
                        </Button>
                    )}
                    {!suspended && (
                        <Button
                            color="inherit"
                            variant="outlined"
                            size="small"
                            onClick={suspend}
                        >
                            Suspend
                        </Button>
                    )}
                </>
            </Box>

            <AppSnackbar
                open={snackbar.open}
                message={snackbar.message}
                severity={snackbar.severity}
                onClose={handleCloseSnackbar}
            />
        </>
    )
}