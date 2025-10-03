import {useParams} from 'react-router'
import Box from '@mui/material/Box'
import {Alert, CircularProgress} from '@mui/material'
import BpmnViewer from '../../components/bpmn/BpmnViewer.tsx'
import {useDefinition} from './hooks/useDefinition.ts'

export default function DefinitionDetailsPage() {
    const {definitionId} = useParams<{ definitionId: string }>()
    const {definition, loading, error} = useDefinition(definitionId)

    if (loading) {
        return (
            <Box sx={{p: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200}}>
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

    if (!definition) {
        return (
            <Box sx={{p: 1}}>
                <Alert severity="warning">No definition found</Alert>
            </Box>
        )
    }

    return (
        <Box sx={{p: 1}}>
            <BpmnViewer definition={definition}/>
        </Box>
    )
}
