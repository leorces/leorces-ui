import {Alert, Box, CircularProgress, Typography} from '@mui/material'
import DefinitionsTable from './components/DefinitionsTable.tsx'
import {useDefinitions} from './hooks/useDefinitions.ts'

export default function DefinitionsPage() {
    const {data, loading, error, setSearchParams} = useDefinitions()

    return (
        <Box sx={{p: 3}}>
            <Typography variant="h4" gutterBottom>
                Definitions
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
                <DefinitionsTable
                    data={data}
                    loading={loading}
                    onSearchParamsChange={setSearchParams}
                />
            )}
        </Box>
    )
}
