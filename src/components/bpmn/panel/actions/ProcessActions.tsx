import type {ProcessExecution} from '../../../../lib/model/runtime/ProcessExecution.ts'
import {isActive, isTerminal} from '../../../../lib/utils/StateUtils.ts'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import {useState} from 'react'
import {terminateProcess} from '../../../../lib/rest/RuntimeClient.ts'
import AppSnackbar from '../../../AppSnackbar.tsx'

interface ProcessActionsProps {
    process?: ProcessExecution;
}

export default function ProcessActions({process}: ProcessActionsProps) {
    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
        open: false,
        message: '',
        severity: 'success'
    })

    const showSnackbar = (message: string, severity: 'success' | 'error') => {
        setSnackbar({open: true, message, severity})
    }

    const handleCloseSnackbar = () => {
        setSnackbar(prev => ({...prev, open: false}))
    }

    const shouldShowActions = () =>
        process !== undefined &&
        !isTerminal(process?.state)


    const terminate = async () => {
        if (!process) return
        try {
            await terminateProcess(process.id)
            showSnackbar('Process terminated successfully!', 'success')
        } catch {
            showSnackbar('Failed to terminate process.', 'error')
        }
    }

    if (!shouldShowActions()) {
        return <></>
    }

    return (
        <>
            <Box sx={{pt: 1, display: 'flex', gap: 1}}>
                {(isActive(process?.state)) && (
                    <>
                        <Button
                            color="warning"
                            variant="outlined"
                            size="small"
                            onClick={terminate}
                        >
                            Terminate
                        </Button>
                    </>
                )}
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
