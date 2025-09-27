import {Grid} from "@mui/material";
import {ProcessDefinition} from "@/lib/model/definition/ProcessDefinition";
import BpmnSchemaViewer from "@/components/bpmn/viewer/BpmnSchemaViewer";

interface BpmnViewerProps {
    definition: ProcessDefinition
}

export default function BpmnViewer({definition}: BpmnViewerProps) {
    return (
        <Grid
            container
            spacing={1}
            sx={{height: "89vh", overflow: "hidden"}}
        >
            <Grid size={9}>
                <BpmnSchemaViewer schema={definition.metadata.schema}/>
            </Grid>
            <Grid size={3}>
                <div>{definition.name}</div>
            </Grid>
        </Grid>
    );
}
