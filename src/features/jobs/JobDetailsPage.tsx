import {useParams} from 'react-router'
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Alert,
    Box,
    CircularProgress,
    Container,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material'
import {ExpandMore} from '@mui/icons-material'

import {useJob} from './hooks/useJob'
import StateBadge from '../../components/StateBadge'
import format from '../../lib/utils/DateFormatUtils'

function renderValue(value: unknown) {
    if (value === null || value === undefined) return '—'
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') return String(value)
    return (
        <Box component="pre" sx={{m: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word'}}>
            {JSON.stringify(value, null, 2)}
        </Box>
    )
}

function KeyValueTable({title, data}: { title: string; data: Record<string, unknown> }) {
    const entries = Object.entries(data)
    return (
        <Paper variant="outlined" sx={{mb: 2}}>
            <Box sx={{p: 2}}>
                <Typography variant="subtitle2">{title}</Typography>
            </Box>
            <TableContainer>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell width="30%">Key</TableCell>
                            <TableCell>Value</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {entries.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={2} align="center">—</TableCell>
                            </TableRow>
                        )}
                        {entries.map(([key, value]) => (
                            <TableRow key={key}>
                                <TableCell>{key}</TableCell>
                                <TableCell>{renderValue(value)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}

export default function JobDetailsPage() {
    const {jobId} = useParams<{ jobId: string }>()
    const {job, loading, error} = useJob(jobId)

    if (loading) return (
        <Box sx={{p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200}}>
            <CircularProgress/>
        </Box>
    )

    if (error) return (
        <Box sx={{p: 2}}>
            <Alert severity="error">{error}</Alert>
        </Box>
    )

    if (!job) return (
        <Box sx={{p: 2}}>
            <Alert severity="warning">No job found</Alert>
        </Box>
    )

    return (
        <Container sx={{p: 3}}>
            <Stack spacing={2}>
                {/* Header */}
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h4">{job.type} JOB — {job.id}</Typography>
                    <StateBadge execution={job}/>
                </Box>

                {/* Meta info */}
                <Stack spacing={1}>
                    {[
                        ['Retries', job.retries],
                        ['Created at', job.createdAt ? format(job.createdAt) : null],
                        ['Updated at', job.updatedAt ? format(job.updatedAt) : null],
                        ['Started at', job.startedAt ? format(job.startedAt) : null],
                        ['Completed at', job.completedAt ? format(job.completedAt) : null]
                    ].map(([label, value]) => (
                        <Typography key={label}>
                            {label}: {value ?? '—'}
                        </Typography>
                    ))}
                </Stack>

                {/* Failure */}
                {job.failureReason && (
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMore/>}>
                            <Typography color="error">Failure reason</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography color="error">{job.failureReason}</Typography>
                            {job.failureTrace && (
                                <Box
                                    component="pre"
                                    sx={{
                                        mt: 1,
                                        whiteSpace: 'pre-wrap',
                                        wordBreak: 'break-word',
                                        overflowX: 'auto',
                                        maxWidth: '100%',
                                        p: 1,
                                        bgcolor: 'background.paper',
                                        borderRadius: 1,
                                        border: '1px solid',
                                        borderColor: 'divider'
                                    }}
                                >
                                    {job.failureTrace}
                                </Box>
                            )}
                        </AccordionDetails>
                    </Accordion>
                )}

                {/* Input/Output */}
                <KeyValueTable title="Input" data={job.input}/>
                <KeyValueTable title="Output" data={job.output}/>
            </Stack>
        </Container>
    )
}
