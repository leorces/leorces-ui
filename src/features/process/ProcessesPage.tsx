import Typography from '@mui/material/Typography'
import {Alert, Box, CircularProgress, Container} from '@mui/material'
import ProcessesTable from './components/ProcessesTable.tsx'
import {useProcesses} from './hooks/useProcesses.ts'

export default function ProcessesPage() {
    const {data, loading, error, setParams} = useProcesses()

    return (
        <Container sx={{p: 3}}>
            <Typography variant="h4" gutterBottom>
                Processes
            </Typography>

            {error && (
                <Alert severity="error" sx={{mb: 2}}>
                    {error}
                </Alert>
            )}

            {loading && !data ? (
                <Box sx={{display: 'flex', justifyContent: 'center', mt: 4}}>
                    <CircularProgress/>
                </Box>
            ) : (
                <ProcessesTable
                    data={data}
                    loading={loading}
                    onSearchParamsChange={setParams}
                />
            )}
        </Container>
    )
}
