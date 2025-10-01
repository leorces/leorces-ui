import React from "react";
import BpmnProcessPanel from "@/components/bpmn/panel/BpmnProcessPanel";
import {BpmnElementSelection} from "@/components/bpmn/model/BpmnElementSelection";
import BpmnElementPanel from "@/components/bpmn/panel/BpmnElementPanel";

interface BpmnInfoPanelProps {
    selection: BpmnElementSelection
}

export default function BpmnInfoPanel({selection}: BpmnInfoPanelProps) {
    if (selection.isProcessSelected()) {
        return <BpmnProcessPanel selection={selection}/>
    }
    return <BpmnElementPanel selection={selection}/>
}