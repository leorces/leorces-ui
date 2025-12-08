import {Stack} from '@mui/material'
import type {ProcessExecution} from '../../../lib/model/runtime/ProcessExecution.ts'
import MoveExecution from './actions/MoveExecution.tsx'
import CorrelateMessage from './actions/CorrelateMessage.tsx'
import {isTerminal} from '../../../lib/utils/StateUtils.ts'

interface ProcessActionsPanelProps {
    process: ProcessExecution;
}

export default function ProcessActionsPanel({process}: ProcessActionsPanelProps) {
    return (
        <Stack spacing={2}>
            {!isTerminal(process.state) && (<MoveExecution process={process}/>)}

            {
                process.definition.messages &&
                process.definition.messages.length > 0 &&
                !isTerminal(process.state) && (
                    <CorrelateMessage process={process}/>
                )
            }
        </Stack>
    )
}
