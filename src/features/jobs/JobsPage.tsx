import Typography from '@mui/material/Typography'
import {Alert, Box, CircularProgress, Container} from '@mui/material'
import {useJobs} from './hooks/useJobs.ts'
import JobsTable from './components/JobsTable.tsx'

export default function JobsPage() {
    const {data, loading, error, setParams} = useJobs()

    return (
        <Container sx={{p: 3}}>
            <Typography variant="h4" gutterBottom>
                Jobs
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
                <JobsTable
                    data={data}
                    loading={loading}
                    onSearchParamsChange={setParams}
                />
            )}
        </Container>
    )
}
