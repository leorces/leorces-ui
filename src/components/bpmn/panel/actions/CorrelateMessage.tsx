import {ProcessExecution} from "@/lib/model/runtime/ProcessExecution";
import {Alert, Autocomplete, Button, Snackbar, Stack, TextField} from "@mui/material";
import {useState} from "react";
import {correlateMessage} from "@/lib/rest/RuntimeClient";

interface CorrelateMessageProps {
    process: ProcessExecution;
}

export default function CorrelateMessage({process}: CorrelateMessageProps) {
    const messages = process.definition.messages;
    const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
        open: false,
        message: '',
        severity: 'success',
    });

    const handleCorrelate = async () => {
        if (!selectedMessage) return;

        setLoading(true);
        try {
            await correlateMessage({
                message: selectedMessage,
                businessKey: process.businessKey,
            });
            setSnackbar({open: true, message: "Message correlated successfully!", severity: "success"});
        } catch (err) {
            console.error("Failed to correlate message:", err);
            setSnackbar({open: true, message: "Failed to correlate message.", severity: "error"});
        } finally {
            setLoading(false);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar(prev => ({...prev, open: false}));
    };

    return (
        <>
            <Stack direction="row" spacing={1} alignItems="center">
                <Autocomplete
                    size="small"
                    disablePortal
                    options={messages}
                    sx={{width: 300}}
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
                    {loading ? "Correlating..." : "Correlate"}
                </Button>
            </Stack>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{vertical: "bottom", horizontal: "center"}}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{width: '100%'}}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    );
}
