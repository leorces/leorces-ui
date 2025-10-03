import type {BpmnElementSelection} from '../model/BpmnElementSelection.ts'
import BpmnProcessPanel from './BpmnProcessPanel.tsx'
import BpmnElementPanel from './BpmnElementPanel.tsx'

interface BpmnInfoPanelProps {
    selection: BpmnElementSelection
}

export default function BpmnInfoPanel({selection}: BpmnInfoPanelProps) {
    if (selection.isProcessSelected()) {
        return <BpmnProcessPanel selection={selection}/>
    }
    return <BpmnElementPanel selection={selection}/>
}