import {useState} from 'react'
import {Autocomplete, Button, Stack, TextField, Typography} from '@mui/material'
import type {ProcessExecution} from '../../../../lib/model/runtime/ProcessExecution.ts'
import {getActiveActivities, getNotStartedActivityDefinitionIds} from '../../../../lib/utils/ProcessExecutionUtils.ts'
import {moveExecution} from '../../../../lib/rest/RuntimeClient.ts'
import AppSnackbar from '../../../AppSnackbar.tsx'

interface MoveExecutionProps {
    process: ProcessExecution
}

export default function MoveExecution({process}: MoveExecutionProps) {
    const activeActivities = getActiveActivities(process)
    const uncreatedActivityDefIds = getNotStartedActivityDefinitionIds(process)
    const activeActivityDefinitionIds = activeActivities.map(activity => activity.definitionId)

    const [selectedActivityDefId, setSelectedActivityDefId] = useState<string | null>(null)
    const [targetDefinitionId, setTargetDefinitionId] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
        open: false,
        message: '',
        severity: 'success'
    })

    const handleMove = async () => {
        if (!selectedActivityDefId || !targetDefinitionId) {
            setSnackbar({open: true, message: 'Please select source and target activities', severity: 'error'})
            return
        }

        const activity = activeActivities.find(a => a.definitionId === selectedActivityDefId)
        if (!activity) return

        setLoading(true)
        try {
            await moveExecution(process.id, activity.id, targetDefinitionId)
            setSnackbar({open: true, message: 'Move successful!', severity: 'success'})
            setSelectedActivityDefId(null)
            setTargetDefinitionId(null)
        } catch (err) {
            console.error(err)
            setSnackbar({open: true, message: 'Move failed.', severity: 'error'})
        } finally {
            setLoading(false)
        }
    }

    const handleCloseSnackbar = () => setSnackbar(prev => ({...prev, open: false}))

    return (
        <>
            <Stack direction="row" spacing={2} alignItems="justifyItems">
                <Typography variant="subtitle1" fontWeight={600} sx={{minWidth: 170}}>
                    Move execution:
                </Typography>

                <Autocomplete
                    size="small"
                    disablePortal
                    sx={{width: 220}}
                    options={activeActivityDefinitionIds}
                    value={selectedActivityDefId}
                    onChange={(_, newValue) => setSelectedActivityDefId(newValue)}
                    renderInput={(params) => <TextField {...params} label="From"/>}
                />

                <Autocomplete
                    size="small"
                    disablePortal
                    sx={{width: 220}}
                    options={uncreatedActivityDefIds}
                    value={targetDefinitionId}
                    onChange={(_, newValue) => setTargetDefinitionId(newValue)}
                    renderInput={(params) => <TextField {...params} label="To"/>}
                />

                <Button
                    variant="contained"
                    onClick={handleMove}
                    disabled={!selectedActivityDefId || !targetDefinitionId || loading}
                >
                    Move
                </Button>
            </Stack>


            <AppSnackbar
                open={snackbar.open}
                message={snackbar.message}
                severity={snackbar.severity}
                onClose={handleCloseSnackbar}
            />
        </>
    )
}
