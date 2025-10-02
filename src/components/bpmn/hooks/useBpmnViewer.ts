import {type RefObject, useEffect, useRef} from 'react';
import Viewer from 'bpmn-js/lib/Viewer';
import ZoomScrollModule from 'diagram-js/lib/navigation/zoomscroll';
import MoveCanvasModule from 'diagram-js/lib/navigation/movecanvas';
import type {Canvas} from "bpmn-js/lib/features/context-pad/ContextPadProvider";

type ViewerOptions = ConstructorParameters<typeof Viewer>[0];

export function useBpmnViewer(containerRef: RefObject<HTMLDivElement>, schema: string) {
    const viewerRef = useRef<Viewer | null>(null);

    useEffect(() => {
        if (!containerRef.current || !schema) return;

        const viewer = new Viewer({
            container: containerRef.current,
            mouse: {bindTo: document},
            modules: [
                ...(Viewer.prototype as any)._modules,
                ZoomScrollModule,
                MoveCanvasModule,
            ],
        } as ViewerOptions);

        viewerRef.current = viewer;

        viewer.importXML(schema).then(() => {
            const canvas = viewer.get<Canvas>('canvas');
            canvas.zoom('fit-viewport', 'auto');
        });

        return () => {
            viewer.destroy();
            viewerRef.current = null;
        };
    }, [containerRef, schema]);

    return viewerRef;
}
