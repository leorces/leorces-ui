import type {ProcessDefinition} from '../../lib/model/definition/ProcessDefinition.ts'
import type {ProcessExecution} from '../../lib/model/runtime/ProcessExecution.ts'
import {useState} from 'react'
import {Grid, Stack} from '@mui/material'
import Box from '@mui/material/Box'
import BpmnInfoPanel from './panel/BpmnInfoPanel.tsx'
import {BpmnElementSelection} from './model/BpmnElementSelection.ts'
import BpmnSchemaViewer from './viewer/BpmnSchemaViewer.tsx'
import ProcessActionsPanel from './panel/ProcessActionsPanel.tsx'
import {isTerminal} from '../../lib/utils/StateUtils.ts'

interface BpmnViewerProps {
    definition: ProcessDefinition;
    process?: ProcessExecution;
}

export default function BpmnViewer({definition, process}: BpmnViewerProps) {
    const [selectedElement, setSelectedElement] = useState<any | null>(null)

    const showActions = process && !isTerminal(process.state)
    const viewerHeight = showActions ? '75vh' : '89vh'

    return (
        <Grid container spacing={1} sx={{overflow: 'hidden'}}>
            <Grid size={{xs: 6, sm: 7, md: 8, lg: 9}}>
                <Stack spacing={2}>
                    <Box sx={{height: viewerHeight}}>
                        <BpmnSchemaViewer
                            schema={definition.metadata.schema}
                            activities={process?.activities}
                            onSelectedElementChange={setSelectedElement}
                        />
                    </Box>

                    {process && <ProcessActionsPanel process={process}/>}
                </Stack>
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
