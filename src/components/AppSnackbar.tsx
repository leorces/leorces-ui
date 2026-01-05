import {Alert, Snackbar, Typography} from '@mui/material'

interface AppSnackbarProps {
    open: boolean
    message: string
    detailedMessage?: string
    severity: 'success' | 'error'
    onClose: () => void
    autoHideDuration?: number
}

export default function AppSnackbar({
                                        open,
                                        message,
                                        detailedMessage,
                                        severity,
                                        onClose,
                                        autoHideDuration
                                    }: AppSnackbarProps) {
    return (
        <Snackbar
            open={open}
            autoHideDuration={autoHideDuration}
            onClose={onClose}
            anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
        >
            <Alert onClose={onClose} severity={severity} sx={{width: '100%'}}>
                <div>
                    <div>{message}</div>
                    {detailedMessage && (
                        <Typography variant="caption" sx={{display: 'block', mt: 0.5, color: 'text.secondary'}}>
                            {detailedMessage}
                        </Typography>
                    )}
                </div>
            </Alert>
        </Snackbar>
    )
}
