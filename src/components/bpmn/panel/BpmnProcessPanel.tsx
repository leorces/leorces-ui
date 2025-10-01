import {Accordion, AccordionDetails, AccordionSummary, Box, Card, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from "react";
import BaseProperty from "@/components/bpmn/panel/property/BaseProperty";
import TimeProperty from "@/components/bpmn/panel/property/TimeProperty";
import {BpmnElementSelection} from "@/components/bpmn/model/BpmnElementSelection";
import VariablesProperty from "@/components/bpmn/panel/property/VariablesProperty";
import StateBadge from "@/components/StateBadge";
import CorrelateMessage from "@/components/bpmn/panel/actions/CorrelateMessage";
import {isTerminal} from "@/lib/utils/StateUtils";

interface BpmnProcessPanelProps {
    selection: BpmnElementSelection
}

export default function BpmnProcessPanel({selection}: BpmnProcessPanelProps) {
    const processDefinition = selection.processDefinition;
    const process = selection.process;

    const showVariables = () => {
        return process && !(process?.variables.length === 0 && (isTerminal(process?.state)));
    };

    return (
        <Card variant="outlined">
            <Box sx={{p: 2}}>
                <Stack
                    direction="row"
                    sx={{justifyContent: 'space-between', alignItems: 'center'}}
                >
                    <Typography gutterBottom variant="h5" component="div">
                        Process
                    </Typography>
                    {selection.isExecution() && process?.state && (
                        <StateBadge state={process.state}/>
                    )}
                </Stack>
                <Typography variant="body1" sx={{color: 'text.secondary'}}>
                    {processDefinition.name || processDefinition.id}
                </Typography>
            </Box>
            <Divider/>
            <Box>
                {/*GENERAL*/}
                <Accordion defaultExpanded>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="general-content"
                        id="general-header"
                    >
                        <Typography component="span">General</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <BaseProperty property="ID" value={processDefinition.id}/>
                        <BaseProperty property="Name" value={processDefinition.name}/>
                        <BaseProperty property="Version" value={processDefinition.version}/>
                        <TimeProperty property="Created" value={processDefinition.createdAt}/>
                    </AccordionDetails>
                </Accordion>
                {/*EXECUTION*/}
                {selection.isExecution() &&
                    <Accordion defaultExpanded>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="execution-content"
                            id="execution-header"
                        >
                            <Typography component="span">Execution</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <BaseProperty property="ID" value={process?.id}/>
                            <BaseProperty property="Business Key" value={process?.businessKey}/>
                            <TimeProperty property="Started" value={process?.startedAt}/>
                            <TimeProperty property="Completed" value={process?.completedAt}/>
                        </AccordionDetails>
                    </Accordion>
                }
                {/*VARIABLES*/}
                {showVariables() &&
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="variables-content"
                            id="variables-header"
                        >
                            <Typography component="span">Variables</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <VariablesProperty process={process!} executionId={process!.id} variables={process!.variables}/>
                        </AccordionDetails>
                    </Accordion>
                }
                {/*MESSAGES*/}
                {process?.definition.messages && process.definition.messages.length > 0 && !isTerminal(process.state) &&
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="messages-content"
                            id="messages-header"
                        >
                            <Typography component="span">Messages</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <CorrelateMessage process={process}/>
                        </AccordionDetails>
                    </Accordion>
                }
            </Box>
        </Card>
    )
}