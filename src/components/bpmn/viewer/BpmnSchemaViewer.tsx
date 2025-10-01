'use client';

import React, {useRef} from 'react';
import {Box} from '@mui/material';
import {useBpmnViewer} from '@/lib/bpmn/hooks/useBpmnViewer';
import {useBpmnElementClick} from "@/lib/bpmn/hooks/useBpmnElementClick";
import {useBpmnActivityStateMarkers} from "@/lib/bpmn/hooks/useBpmnActivityStateMarkers";
import {Activity} from "@/lib/model/runtime/Activity";

interface SchemaViewerProps {
    schema: string;
    activities?: Activity[];
    onSelectedElementChange: (element: any) => void;
}

export default function BpmnSchemaViewer({schema, activities, onSelectedElementChange}: SchemaViewerProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const viewerRef = useBpmnViewer(containerRef as React.RefObject<HTMLDivElement>, schema);

    useBpmnElementClick(viewerRef, onSelectedElementChange);
    useBpmnActivityStateMarkers(viewerRef, activities);

    return (
        <Box sx={{position: 'relative', width: '100%', height: '100%'}}>
            <Box
                width="100%"
                height="100%"
                sx={{border: '1px solid #ccc', borderRadius: 1, overflow: 'hidden'}}
                ref={containerRef}
            />
        </Box>
    );
}

