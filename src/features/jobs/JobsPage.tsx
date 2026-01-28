import Typography from '@mui/material/Typography'
import {Alert, Box, Button, CircularProgress, Container} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import {useJobs} from './hooks/useJobs.ts'
import JobsTable from './components/JobsTable.tsx'

export default function JobsPage() {
    const {data, loading, error, setParams} = useJobs()
    const navigate = useNavigate()

    return (
        <Container sx={{p: 3}}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 2
                }}
            >
                <Typography variant="h4">
                    Jobs
                </Typography>

                <Button
                    variant="contained"
                    onClick={() => navigate('/jobs/run')}
                >
                    Run job
                </Button>
            </Box>

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
