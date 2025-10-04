import {Alert, Snackbar} from '@mui/material'

interface AppSnackbarProps {
    open: boolean
    message: string
    severity: 'success' | 'error'
    onClose: () => void
    autoHideDuration?: number
}

export default function AppSnackbar({open, message, severity, onClose, autoHideDuration}: AppSnackbarProps) {
    return (
        <Snackbar
            open={open}
            autoHideDuration={autoHideDuration}
            onClose={onClose}
            anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
        >
            <Alert onClose={onClose} severity={severity} sx={{width: '100%'}}>
                {message}
            </Alert>
        </Snackbar>
    )
}