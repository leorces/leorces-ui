import {useEffect, useRef} from 'react';
import inherits from 'inherits-browser';
import Viewer from 'bpmn-js/lib/Viewer';
import ZoomScrollModule from 'diagram-js/lib/navigation/zoomscroll';
import MoveCanvasModule from 'diagram-js/lib/navigation/movecanvas';

type ViewerOptions = ConstructorParameters<typeof Viewer>[0];

function CustomViewer(this: any, options: ViewerOptions) {
    Viewer.call(this, options);
}

inherits(CustomViewer, Viewer);

(CustomViewer.prototype as any)._customModules = [
    ZoomScrollModule,
    MoveCanvasModule,
];
(CustomViewer.prototype as any)._modules = [
    ...(Viewer.prototype as any)._modules,
    ...(CustomViewer.prototype as any)._customModules,
];

export function useBpmnViewer(containerRef: React.RefObject<HTMLDivElement>, schema: string) {
    const viewerRef = useRef<any>(null);

    useEffect(() => {
        if (!containerRef.current || !schema) return;

        const viewer = new (CustomViewer as any)({
            container: containerRef.current,
            mouse: {bindTo: document},
        });

        viewerRef.current = viewer;

        viewer.importXML(schema).then(() => {
            const canvas = viewer.get('canvas');
            canvas.zoom('fit-viewport', 'auto');
        });

        return () => {
            viewer.destroy();
            viewerRef.current = null;
        };
    }, [containerRef, schema]);

    return viewerRef;
}
