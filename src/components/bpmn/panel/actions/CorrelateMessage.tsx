import type {ProcessExecution} from '../../../../lib/model/runtime/ProcessExecution.ts'
import {useState} from 'react'
import {correlateMessage} from '../../../../lib/rest/RuntimeClient.ts'
import Button from '@mui/material/Button'
import {Autocomplete, Stack, TextField} from '@mui/material'
import AppSnackbar from '../../../AppSnackbar.tsx'

interface CorrelateMessageProps {
    process: ProcessExecution;
}

export default function CorrelateMessage({process}: CorrelateMessageProps) {
    const messages = process.definition.messages
    const [selectedMessage, setSelectedMessage] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
        open: false,
        message: '',
        severity: 'success'
    })

    const handleCorrelate = async () => {
        if (!selectedMessage) return

        setLoading(true)
        try {
            await correlateMessage({
                message: selectedMessage,
                businessKey: process.businessKey
            })
            setSnackbar({open: true, message: 'Message correlated successfully!', severity: 'success'})
        } catch {
            setSnackbar({open: true, message: 'Failed to correlate message.', severity: 'error'})
        } finally {
            setLoading(false)
        }
    }

    const handleCloseSnackbar = () => {
        setSnackbar(prev => ({...prev, open: false}))
    }

    return (
        <>
            <Stack spacing={1}>
                <Autocomplete
                    size="small"
                    disablePortal
                    options={messages}
                    value={selectedMessage}
                    onChange={(_, newValue) => setSelectedMessage(newValue)}
                    renderInput={(params) => <TextField {...params} label="Messages"/>}
                />
                <Button
                    variant="contained"
                    color="primary"
                    disabled={!selectedMessage || loading}
                    onClick={handleCorrelate}
                >
                    Correlate
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
