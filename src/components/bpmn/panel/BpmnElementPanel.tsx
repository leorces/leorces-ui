import { formatActivityType } from "../../../lib/utils/ActivityTypeFormatUtils";
import { isTerminal } from "../../../lib/utils/StateUtils";
import StateBadge from "../../StateBadge";
import type { BpmnElementSelection } from "../model/BpmnElementSelection";
import ActivityActions from "./actions/ActivityActions";
import BaseProperty from "./property/BaseProperty";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Card,
    Chip,
    Divider,
    Stack,
    Typography
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ErrorProperty from "./property/ErrorProperty.tsx";
import ConditionProperty from "./property/ConditionProperty.tsx";
import LinkProperty from "./property/LinkProperty.tsx";
import TimeProperty from "./property/TimeProperty.tsx";
import VariablesProperty from "./property/VariablesProperty.tsx";

interface BpmnProcessPanelProps {
    selection: BpmnElementSelection
}

export default function BpmnElementPanel({selection}: BpmnProcessPanelProps) {
    const activityDefinition = selection.selectedActivityDefinition;
    const activity = selection.selectedActivity;
    const process = selection.process;
    const inputs = new Map(Object.entries(activityDefinition?.inputs ?? {}))
    const outputs = new Map(Object.entries(activityDefinition?.outputs ?? {}))
    const error = selection.computeError(activityDefinition?.errorCode)

    const showVariables = () => {
        return activity && !(activity?.variables.length === 0 && (isTerminal(activity?.state) || isTerminal(process?.state)));
    };

    const renderKeyValue = (map: Map<string, any>) => {
        return Array.from(map.entries()).map(([key, value]) => (
            <BaseProperty key={key} property={key}
                          value={typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}/>
        ));
    };

    return (
        <Card variant="outlined">
            <Box sx={{p: 2}}>
                <Stack
                    direction="row"
                    sx={{justifyContent: 'space-between', alignItems: 'center'}}
                >
                    <Typography gutterBottom variant="h5" component="div">
                        {formatActivityType(activityDefinition?.type)}
                    </Typography>
                    {activity?.state && (
                        <StateBadge state={activity.state}/>
                    )}
                </Stack>
                <Typography variant="body1" sx={{color: 'text.secondary'}}>
                    {activityDefinition?.name || activityDefinition?.id}
                </Typography>
                <ActivityActions
                    activityDefinitionId={activityDefinition!.id}
                    activity={activity}
                    process={process}
                />
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
                        <BaseProperty property="ID" value={activityDefinition?.id}/>
                        {activityDefinition?.name && <BaseProperty property="Name" value={activityDefinition.name}/>}
                        {activityDefinition?.topic && <BaseProperty property="Topic" value={activityDefinition.topic}/>}
                        {activityDefinition?.messageReference && <BaseProperty property="Message" value={activityDefinition.messageReference}/>}
                        {activityDefinition?.calledElement &&
                            <>
                                <BaseProperty property="Called element" value={activityDefinition.calledElement}/>
                                <BaseProperty property="Called element version"
                                              value={activityDefinition.calledElementVersion || 'latest'}/>
                            </>
                        }
                    </AccordionDetails>
                </Accordion>
                {/*EXECUTION*/}
                {activity &&
                    <Accordion defaultExpanded>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="execution-content"
                            id="execution-header"
                        >
                            <Typography component="span">Execution</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {
                                activityDefinition?.calledElement
                                    ? <LinkProperty link={`/processes/${activity.id}`}
                                                    property="ID"
                                                    value={activity?.id}/>
                                    : <BaseProperty property="ID" value={activity?.id}/>
                            }
                            <TimeProperty property="Started" value={activity.startedAt}/>
                            <TimeProperty property="Completed" value={activity.completedAt}/>
                        </AccordionDetails>
                    </Accordion>
                }
                {/*CONDITION*/}
                {activityDefinition?.condition &&
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="conditions-content"
                            id="conditions-header"
                        >
                            <Box display="flex" alignItems="center" gap={1}>
                                <Typography component="span">Conditions</Typography>
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                            <ConditionProperty condition={activityDefinition?.condition}/>
                        </AccordionDetails>
                    </Accordion>
                }
                {/*ERROR*/}
                {activityDefinition?.errorCode &&
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="error-content"
                            id="error-header"
                        >
                            <Box display="flex" alignItems="center" gap={1}>
                                <Typography component="span">Error</Typography>
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                            <ErrorProperty error={error!}/>
                        </AccordionDetails>
                    </Accordion>
                }
                {/*INPUTS*/}
                {inputs.size > 0 &&
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="inputs-content"
                            id="inputs-header"
                        >
                            <Box display="flex" alignItems="center" gap={1}>
                                <Typography component="span">Inputs</Typography>
                                <Chip label={inputs.size} size="small"/>
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                            {renderKeyValue(inputs)}
                        </AccordionDetails>
                    </Accordion>
                }
                {/*OUTPUTS*/}
                {outputs.size > 0 &&
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="outputs-content"
                            id="inputs-header"
                        >
                            <Box display="flex" alignItems="center" gap={1}>
                                <Typography component="span">Outputs</Typography>
                                <Chip label={outputs.size} size="small"/>
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                            {renderKeyValue(outputs)}
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
                            <VariablesProperty process={process!} executionId={activity!.id} variables={activity!.variables}/>
                        </AccordionDetails>
                    </Accordion>
                }
            </Box>
        </Card>
    )
}