import type {ProcessDefinition} from '../../lib/model/definition/ProcessDefinition.ts'
import type {ProcessExecution} from '../../lib/model/runtime/ProcessExecution.ts'
import {useState} from 'react'
import {Grid, Stack} from '@mui/material'
import Box from '@mui/material/Box'
import BpmnInfoPanel from './panel/BpmnInfoPanel.tsx'
import {BpmnElementSelection} from './model/BpmnElementSelection.ts'
import BpmnSchemaViewer from './viewer/BpmnSchemaViewer.tsx'
import ProcessActionsPanel from './panel/ProcessActionsPanel.tsx'

interface BpmnViewerProps {
    definition: ProcessDefinition;
    process?: ProcessExecution;
}

export default function BpmnViewer({definition, process}: BpmnViewerProps) {
    const [selectedElement, setSelectedElement] = useState<any | null>(null)

    return (
        <Grid
            container
            spacing={1}
            sx={{
                height: '90vh',
                overflow: 'hidden'
            }}
        >
            <Grid
                size={{xs: 6, sm: 7, md: 8, lg: 9}}
                sx={{
                    height: '100%',
                    overflow: 'hidden'
                }}
            >
                <Stack spacing={2} sx={{height: '100%'}}>
                    <Box sx={{flex: 1, minHeight: 0}}>
                        <BpmnSchemaViewer
                            schema={definition.metadata.schema}
                            activities={process?.activities}
                            onSelectedElementChange={setSelectedElement}
                        />
                    </Box>

                    {process && !process.suspended && (
                        <Box>
                            <ProcessActionsPanel process={process}/>
                        </Box>
                    )}
                </Stack>
            </Grid>

            <Grid
                size={{xs: 6, sm: 5, md: 4, lg: 3}}
                sx={{
                    height: '100%',
                    overflow: 'auto'
                }}
            >
                <BpmnInfoPanel
                    selection={new BpmnElementSelection(
                        definition,
                        process,
                        selectedElement
                    )}
                />
            </Grid>
        </Grid>
    )
}

