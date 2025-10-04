import type {Activity} from '../../../../lib/model/runtime/Activity.ts'
import type {ProcessExecution} from '../../../../lib/model/runtime/ProcessExecution.ts'
import {isActive, isTerminal} from '../../../../lib/utils/StateUtils.ts'
import {retryActivity, runActivity, terminateActivity} from '../../../../lib/rest/ActivityClient.ts'
import {ActivityState} from '../../../../lib/model/runtime/ActivityState.ts'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import {useState} from 'react'
import AppSnackbar from '../../../AppSnackbar.tsx'

interface ActivityActionsProps {
    activityDefinitionId: string;
    activity?: Activity;
    process?: ProcessExecution;
}

export default function ActivityActions({activityDefinitionId, activity, process}: ActivityActionsProps) {
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
        !isTerminal(activity?.state) &&
        !isTerminal(process?.state)

    const run = async () => {
        try {
            await runActivity(activityDefinitionId, process!.id)
            showSnackbar('Activity started successfully!', 'success')
        } catch {
            showSnackbar('Failed to start activity.', 'error')
        }
    }

    const retry = async () => {
        if (!activity) return
        try {
            await retryActivity(activity.id)
            showSnackbar('Activity retried successfully!', 'success')
        } catch {
            showSnackbar('Failed to retry activity.', 'error')
        }
    }

    const terminate = async () => {
        if (!activity) return
        try {
            await terminateActivity(activity.id)
            showSnackbar('Activity terminated successfully!', 'success')
        } catch {
            showSnackbar('Failed to terminate activity.', 'error')
        }
    }

    if (!shouldShowActions()) {
        return <></>
    }

    return (
        <>
            <Box sx={{pt: 1, display: 'flex', gap: 1}}>
                {(isActive(activity?.state)) && (
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
                {!activity && (
                    <Button
                        color="primary"
                        variant="outlined"
                        size="small"
                        onClick={run}
                    >
                        Run
                    </Button>
                )}
                {activity && activity.state === ActivityState.FAILED && (
                    <Button
                        color="error"
                        variant="outlined"
                        size="small"
                        onClick={retry}
                    >
                        Retry
                    </Button>
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
