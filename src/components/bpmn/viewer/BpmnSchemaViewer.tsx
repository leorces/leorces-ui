'use client';

import React, {useRef} from 'react';
import {Box} from '@mui/material';
import {useBpmnViewer} from '@/lib/bpmn/hooks/useBpmnViewer';
import {useBpmnZoom} from '@/lib/bpmn/hooks/useBpmnZoom';
import {useBpmnPanAndPinch} from '@/lib/bpmn/hooks/useBpmnPanAndPinch';
import {useBpmnElementClick} from "@/lib/bpmn/hooks/useBpmnElementClick";

interface SchemaViewerProps {
    schema: string;
}

export default function BpmnSchemaViewer({schema}: SchemaViewerProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const viewerRef = useBpmnViewer(containerRef as React.RefObject<HTMLDivElement>, schema);
    const {setTargetZoom} = useBpmnZoom(viewerRef);
    useBpmnPanAndPinch(containerRef as React.RefObject<HTMLDivElement>, viewerRef, setTargetZoom);
    useBpmnElementClick(viewerRef, (element) => {
        console.log('Clicked BPMN element:', element);
    });

    return (
        <Box sx={{position: 'relative', width: '100%', height: '100%'}}>
            <Box width="100%"
                 height="100%"
                 sx={{border: '1px solid #ccc', borderRadius: 1, overflow: 'hidden'}}
                 ref={containerRef}/>
        </Box>
    );
}
