import React, {useEffect, useRef} from 'react';
import NavigatedViewer from 'bpmn-js/lib/NavigatedViewer';
import {BpmnCanvas} from "@/lib/bpmn/model/BpmnCanvas";

export function useBpmnViewer(containerRef: React.RefObject<HTMLDivElement>, schema: string) {
    const viewerRef = useRef<NavigatedViewer | null>(null);

    useEffect(() => {
        if (!containerRef.current || !schema) return;

        const viewer = new NavigatedViewer({container: containerRef.current, mouse: {bindTo: document}});
        viewerRef.current = viewer;

        viewer.importXML(schema).then(() => {
            const canvas = viewer.get('canvas') as BpmnCanvas;
            canvas.zoom('fit-viewport', 'auto');
        });

        return () => {
            viewer.destroy();
            viewerRef.current = null;
        };
    }, [containerRef, schema]);

    return viewerRef;
}
