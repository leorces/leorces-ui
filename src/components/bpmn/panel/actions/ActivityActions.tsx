import {Box, Button} from "@mui/material";
import React from "react";
import {Activity} from "@/lib/model/runtime/Activity";
import {ProcessExecution} from "@/lib/model/runtime/ProcessExecution";
import {completeActivity, retryActivity, runActivity, terminateActivity} from "@/lib/rest/ActivityClient";
import {ActivityState} from "@/lib/model/runtime/ActivityState";
import {isTerminal} from "@/lib/utils/StateUtils";

interface ActivityActionsProps {
    activityDefinitionId: string;
    activity?: Activity;
    process?: ProcessExecution;
}

export default function ActivityActions({activityDefinitionId, activity, process}: ActivityActionsProps) {

    const shouldShowActions = () =>
        process !== undefined &&
        !isTerminal(activity?.state) &&
        !isTerminal(process?.state);

    const run = async () => {
        try {
            await runActivity(activityDefinitionId, process!.id);
        } catch (err) {
            console.error("Failed to run activity:", err);
        }
    };

    const complete = async () => {
        if (!activity) return;
        try {
            await completeActivity(activity.id);
        } catch (err) {
            console.error("Failed to complete activity:", err);
        }
    };

    const retry = async () => {
        if (!activity) return;
        try {
            await retryActivity(activity.id);
        } catch (err) {
            console.error("Failed to retry activity:", err);
        }
    };

    const terminate = async () => {
        if (!activity) return;
        try {
            await terminateActivity(activity.id);
        } catch (err) {
            console.error("Failed to terminate activity:", err);
        }
    };

    if (!shouldShowActions()) {
        return <></>
    }

    return (
        <Box sx={{pt: 1, display: 'flex', gap: 1}}>
            {(activity?.state === ActivityState.ACTIVE || activity?.state === ActivityState.SCHEDULED) && (
                <>
                    <Button
                        color="success"
                        variant="outlined"
                        size="small"
                        onClick={complete}
                    >
                        Complete
                    </Button>
                    <Button
                        color="warning"
                        variant="outlined"
                        size="small"
                        onClick={terminate}
                    >
                        Terminate
                    </Button>
                </>
            )}
            {!activity && (
                <Button
                    color="primary"
                    variant="outlined"
                    size="small"
                    onClick={run}
                >
                    Run
                </Button>
            )}
            {activity && activity.state === ActivityState.FAILED && (
                <Button
                    color="error"
                    variant="outlined"
                    size="small"
                    onClick={retry}
                >
                    Retry
                </Button>
            )}
        </Box>
    );
}
