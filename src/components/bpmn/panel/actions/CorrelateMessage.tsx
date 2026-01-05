import type {ProcessExecution} from '../../../../lib/model/runtime/ProcessExecution.ts'
import {useState} from 'react'
import {correlateMessage} from '../../../../lib/rest/RuntimeClient.ts'
import {Autocomplete, Button, Stack, TextField, Typography} from '@mui/material'
import AppSnackbar from '../../../AppSnackbar.tsx'
import {ServerError} from '../../../../lib/rest/error/ServerError.ts'

interface CorrelateMessageProps {
    process: ProcessExecution;
}

export default function CorrelateMessage({process}: CorrelateMessageProps) {
    const messages = process.definition.messages
    const [selectedMessage, setSelectedMessage] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [snackbar, setSnackbar] = useState<{
        open: boolean;
        message: string;
        detailedMessage?: string,
        severity: 'success' | 'error'
    }>({
        open: false,
        message: '',
        detailedMessage: undefined,
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
        } catch (error) {
            console.error('Failed to correlate message:', error)
            if (error instanceof ServerError) {
                setSnackbar({
                    open: true,
                    message: error.message,
                    detailedMessage: error.detailedMessage,
                    severity: 'error'
                })
            } else {
                setSnackbar({open: true, message: 'Failed to correlate message.', severity: 'error'})
            }
        } finally {
            setLoading(false)
        }
    }

    const handleCloseSnackbar = () => {
        setSnackbar(prev => ({...prev, open: false}))
    }

    return (
        <>
            <Stack direction="row" spacing={2} alignItems="justifyItems">
                <Typography variant="subtitle1" fontWeight={600} sx={{minWidth: 170}}>
                    Correlate message:
                </Typography>

                <Autocomplete
                    size="small"
                    disablePortal
                    sx={{width: 220}}
                    options={messages}
                    value={selectedMessage}
                    onChange={(_, newValue) => setSelectedMessage(newValue)}
                    renderInput={(params) => <TextField {...params} label="Messages"/>}
                />

                <Button
                    variant="contained"
                    disabled={!selectedMessage || loading}
                    onClick={handleCorrelate}
                >
                    Correlate
                </Button>
            </Stack>

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
