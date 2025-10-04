import type {BpmnElementSelection} from '../model/BpmnElementSelection'
import {isTerminal} from '../../../lib/utils/StateUtils.ts'
import {Box, Card, Divider, Stack, Typography} from '@mui/material'
import StateBadge from '../../StateBadge.tsx'
import BaseProperty from './property/BaseProperty.tsx'
import TimeProperty from './property/TimeProperty.tsx'
import CorrelateMessage from './actions/CorrelateMessage.tsx'
import VariablesProperty from './property/VariablesProperty.tsx'
import PropertiesAccordion from './property/PropertiesAccordion'
import ProcessActions from './actions/ProcessActions.tsx'
import MoveExecution from './actions/MoveExecution.tsx'

interface BpmnProcessPanelProps {
    selection: BpmnElementSelection;
}

export default function BpmnProcessPanel({selection}: BpmnProcessPanelProps) {
    const processDefinition = selection.processDefinition
    const process = selection.process

    const showVariables = () =>
        process && !(process?.variables.length === 0 && isTerminal(process?.state))

    return (
        <Card variant="outlined">
            <Box sx={{p: 2}}>
                <Stack direction="row" sx={{justifyContent: 'space-between', alignItems: 'center'}}>
                    <Typography gutterBottom variant="h5" component="div">
                        Process
                    </Typography>
                    {selection.isExecution() && process?.state && <StateBadge state={process.state}/>}
                </Stack>
                <Typography variant="body1" sx={{color: 'text.secondary'}}>
                    {processDefinition.name || processDefinition.id}
                </Typography>
                <ProcessActions process={process}/>
            </Box>

            <Divider/>

            {/* GENERAL */}
            <PropertiesAccordion title="General" defaultExpanded>
                <BaseProperty property="ID" value={processDefinition.id}/>
                <BaseProperty property="Name" value={processDefinition.name}/>
                <BaseProperty property="Version" value={processDefinition.version}/>
                <TimeProperty property="Created" value={processDefinition.createdAt}/>
            </PropertiesAccordion>

            {/* EXECUTION */}
            {selection.isExecution() && (
                <PropertiesAccordion title="Execution" defaultExpanded>
                    <BaseProperty property="ID" value={process?.id}/>
                    <BaseProperty property="Business Key" value={process?.businessKey}/>
                    <TimeProperty property="Started" value={process?.startedAt}/>
                    <TimeProperty property="Completed" value={process?.completedAt}/>
                </PropertiesAccordion>
            )}

            {/* VARIABLES */}
            {showVariables() && (
                <PropertiesAccordion title="Variables" count={process?.variables.length}>
                    <VariablesProperty process={process!} executionId={process!.id} variables={process!.variables}/>
                </PropertiesAccordion>
            )}

            {/*MOVE EXECUTION*/}
            {selection.isExecution() && !isTerminal(process!.state) && (
                <PropertiesAccordion title="Move execution">
                    <MoveExecution process={process!}/>
                </PropertiesAccordion>
            )}

            {/* SEND MESSAGE */}
            {process?.definition.messages &&
                process.definition.messages.length > 0 &&
                !isTerminal(process.state) && (
                    <PropertiesAccordion title="Send message">
                        <CorrelateMessage process={process}/>
                    </PropertiesAccordion>
                )}
        </Card>
    )
}
