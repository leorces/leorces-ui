import {useParams} from 'react-router'
import BpmnViewer from '../../components/bpmn/BpmnViewer.tsx'
import Box from '@mui/material/Box'
import {Alert, CircularProgress} from '@mui/material'
import {usePollingProcess} from './hooks/usePollingProcess.ts'

export default function ProcessDetailsPage() {
    const {processId} = useParams()
    const {process, loading, error} = usePollingProcess(processId)

    if (loading) {
        return (
            <Box sx={{p: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px'}}>
                <CircularProgress/>
            </Box>
        )
    }

    if (error) {
        return (
            <Box sx={{p: 1}}>
                <Alert severity="error">{error}</Alert>
            </Box>
        )
    }

    if (!process) {
        return (
            <Box sx={{p: 1}}>
                <Alert severity="warning">No process found</Alert>
            </Box>
        )
    }

    return (
        <Box sx={{p: 1}}>
            <BpmnViewer definition={process.definition} process={process}/>
        </Box>
    )
}
