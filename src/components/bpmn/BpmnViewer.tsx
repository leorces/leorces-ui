import type {ProcessDefinition} from '../../lib/model/definition/ProcessDefinition.ts'
import type {ProcessExecution} from '../../lib/model/runtime/ProcessExecution.ts'
import {useState} from 'react'
import {Grid} from '@mui/material'
import BpmnSchemaViewer from './viewer/BpmnSchemaViewer.tsx'
import Box from '@mui/material/Box'
import BpmnInfoPanel from './panel/BpmnInfoPanel.tsx'
import {BpmnElementSelection} from './model/BpmnElementSelection.ts'

interface BpmnViewerProps {
    definition: ProcessDefinition;
    process?: ProcessExecution;
}

export default function BpmnViewer({definition, process}: BpmnViewerProps) {
    const [selectedElement, setSelectedElement] = useState<any | null>(null)

    return (
        <Grid container spacing={1} sx={{height: '89vh', overflow: 'hidden'}}>
            <Grid size={{xs: 6, sm: 7, md: 8, lg: 9}}>
                <BpmnSchemaViewer
                    schema={definition.metadata.schema}
                    activities={process?.activities}
                    onSelectedElementChange={setSelectedElement}
                />
            </Grid>
            <Grid size={{xs: 6, sm: 5, md: 4, lg: 3}} sx={{height: '100%', overflow: 'hidden'}}>
                <Box sx={{height: '100%', overflow: 'auto'}}>
                    <BpmnInfoPanel
                        selection={new BpmnElementSelection(definition, process, selectedElement)}
                    />
                </Box>
            </Grid>
        </Grid>
    )
}

