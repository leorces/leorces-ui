import {formatActivityType} from '../../../lib/utils/ActivityTypeFormatUtils'
import {isTerminal} from '../../../lib/utils/StateUtils'
import StateBadge from '../../StateBadge'
import type {BpmnElementSelection} from '../model/BpmnElementSelection'
import ActivityActions from './actions/ActivityActions'
import BaseProperty from './property/BaseProperty'
import PropertiesAccordion from './property/PropertiesAccordion'
import ErrorProperty from './property/ErrorProperty.tsx'
import ConditionProperty from './property/ConditionProperty.tsx'
import LinkProperty from './property/LinkProperty.tsx'
import TimeProperty from './property/TimeProperty.tsx'
import VariablesProperty from './property/VariablesProperty.tsx'
import {Box, Card, Divider, Stack, Typography} from '@mui/material'
import FailureProperty from './property/FailureProperty.tsx'

interface BpmnProcessPanelProps {
    selection: BpmnElementSelection;
}

type PropertyValue = string | number | boolean | object | null;

export default function BpmnElementPanel({selection}: BpmnProcessPanelProps) {
    const activityDefinition = selection.selectedActivityDefinition
    const activity = selection.selectedActivity
    const process = selection.process

    const inputs = new Map<string, PropertyValue>(Object.entries(activityDefinition?.inputs ?? {}))
    const outputs = new Map<string, PropertyValue>(Object.entries(activityDefinition?.outputs ?? {}))
    const error = selection.computeError(activityDefinition?.errorCode)

    const showVariables = () =>
        activity &&
        !(activity.variables.length === 0 && (isTerminal(activity?.state) || isTerminal(process?.state)))

    const renderKeyValue = (map: Map<string, PropertyValue>) =>
        Array.from(map.entries()).map(([key, value]) => (
            <BaseProperty
                key={key}
                property={key}
                value={typeof value === 'object' && value !== null ? JSON.stringify(value, null, 2) : String(value)}
            />
        ))

    return (
        <Card variant="outlined">
            <Box sx={{p: 2}}>
                <Stack direction="row" sx={{justifyContent: 'space-between', alignItems: 'center'}}>
                    <Typography gutterBottom variant="h5" component="div">
                        {formatActivityType(activityDefinition?.type)}
                    </Typography>
                    {activity?.state && <StateBadge state={activity.state}/>}
                </Stack>
                <Typography variant="body1" sx={{color: 'text.secondary'}}>
                    {activityDefinition?.name || activityDefinition?.id}
                </Typography>
                <ActivityActions activityDefinitionId={activityDefinition!.id} activity={activity} process={process}/>
            </Box>

            <Divider/>

            {/* GENERAL */}
            <PropertiesAccordion title="General" defaultExpanded>
                <BaseProperty property="ID" value={activityDefinition?.id}/>
                {activityDefinition?.name && <BaseProperty property="Name" value={activityDefinition.name}/>}
                {activityDefinition?.topic && <BaseProperty property="Topic" value={activityDefinition.topic}/>}
                {activityDefinition?.messageReference &&
                    <BaseProperty property="Message" value={activityDefinition.messageReference}/>}
                {activityDefinition?.calledElement && (
                    <>
                        <BaseProperty property="Called element" value={activityDefinition.calledElement}/>
                        <BaseProperty property="Called element version"
                                      value={activityDefinition.calledElementVersion || 'latest'}/>
                    </>
                )}
            </PropertiesAccordion>

            {/* EXECUTION */}
            {activity && (
                <PropertiesAccordion title="Execution" defaultExpanded>
                    {activityDefinition?.calledElement ? (
                        <LinkProperty link={`/processes/${activity.id}`} property="ID" value={activity?.id}/>
                    ) : (
                        <BaseProperty property="ID" value={activity?.id}/>
                    )}
                    <TimeProperty property="Started" value={activity.startedAt}/>
                    <TimeProperty property="Completed" value={activity.completedAt}/>
                </PropertiesAccordion>
            )}

            {/*FAILURE*/}
            {activity && activity.failure && (activity.failure.reason || activity.failure.trace) && (
                <PropertiesAccordion title="Failure">
                    <FailureProperty failure={activity.failure}/>
                </PropertiesAccordion>
            )}

            {/* CONDITIONS */}
            {activityDefinition?.condition && (
                <PropertiesAccordion title="Conditions">
                    <ConditionProperty condition={activityDefinition.condition}/>
                </PropertiesAccordion>
            )}

            {/* ERROR */}
            {activityDefinition?.errorCode && (
                <PropertiesAccordion title="Error">
                    <ErrorProperty error={error!}/>
                </PropertiesAccordion>
            )}

            {/* INPUTS */}
            {inputs.size > 0 && (
                <PropertiesAccordion title="Inputs" count={inputs.size}>
                    {renderKeyValue(inputs)}
                </PropertiesAccordion>
            )}

            {/* OUTPUTS */}
            {outputs.size > 0 && (
                <PropertiesAccordion title="Outputs" count={outputs.size}>
                    {renderKeyValue(outputs)}
                </PropertiesAccordion>
            )}

            {/* VARIABLES */}
            {showVariables() && (
                <PropertiesAccordion title="Variables" count={activity?.variables.length}>
                    <VariablesProperty process={process!}
                                       executionId={activity!.id}
                                       variables={activity!.variables}
                    />
                </PropertiesAccordion>
            )}
        </Card>
    )
}
