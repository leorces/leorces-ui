import {Grid} from "@mui/material";
import {ProcessDefinition} from "@/lib/model/definition/ProcessDefinition";
import BpmnSchemaViewer from "@/components/bpmn/viewer/BpmnSchemaViewer";
import BpmnInfoPanel from "@/components/bpmn/panel/BpmnInfoPanel";
import {BpmnElementSelection} from "@/components/bpmn/model/BpmnElementSelection";
import {useState} from "react";
import Box from "@mui/material/Box";
import {ProcessExecution} from "@/lib/model/runtime/ProcessExecution";

interface BpmnViewerProps {
    definition: ProcessDefinition;
    process?: ProcessExecution;
}

export default function BpmnViewer({definition, process}: BpmnViewerProps) {
    const [selectedElement, setSelectedElement] = useState<any | null>(null);

    return (
        <Grid container spacing={1} sx={{height: "89vh", overflow: "hidden"}}>
            <Grid size={{ xs: 6, sm: 7, md: 8, lg: 9 }}>
                <BpmnSchemaViewer
                    schema={definition.metadata.schema}
                    activities={process?.activities}
                    onSelectedElementChange={setSelectedElement}
                />
            </Grid>
            <Grid size={{ xs: 6, sm: 5, md: 4, lg: 3 }} sx={{height: "100%", overflow: "hidden"}}>
                <Box sx={{height: "100%", overflow: "auto"}}>
                    <BpmnInfoPanel
                        selection={new BpmnElementSelection(definition, process, selectedElement)}
                    />
                </Box>
            </Grid>
        </Grid>
    );
}

