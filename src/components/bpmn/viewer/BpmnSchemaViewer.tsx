import type {Activity} from '../../../lib/model/runtime/Activity.ts'
import {type RefObject, useRef} from 'react'
import Box from '@mui/material/Box'
import {useBpmnActivityStateMarkers} from '../hooks/useBpmnActivityStateMarkers.ts'
import {useBpmnElementClick} from '../hooks/useBpmnElementClick.ts'
import {useBpmnViewer} from '../hooks/useBpmnViewer.ts'
import type {ModdleElement} from 'bpmn-js/lib/model/Types'

interface SchemaViewerProps {
    schema: string;
    activities?: Activity[];
    onSelectedElementChange: (element: ModdleElement) => void;
}

export default function BpmnSchemaViewer({schema, activities, onSelectedElementChange}: SchemaViewerProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const viewerRef = useBpmnViewer(containerRef as RefObject<HTMLDivElement>, schema)

    useBpmnElementClick(viewerRef, onSelectedElementChange)
    useBpmnActivityStateMarkers(viewerRef, activities)

    return (
        <Box sx={{position: 'relative', width: '100%', height: '100%'}}>
            <Box
                width="100%"
                height="100%"
                sx={{border: '1px solid #ccc', borderRadius: 1, overflow: 'hidden'}}
                ref={containerRef}
            />
        </Box>
    )
}

