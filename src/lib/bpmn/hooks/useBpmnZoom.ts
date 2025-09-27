import React, {useCallback, useRef} from 'react';
import {BpmnCanvas} from "@/lib/bpmn/model/BpmnCanvas";

export function useBpmnZoom(viewerRef: React.RefObject<any>, zoomSpeed: number = 0.05) {
    const MIN_ZOOM = 0.2;
    const MAX_ZOOM = 3;
    const targetZoomRef = useRef<number | null>(null);

    const animateZoom = useCallback(() => {
        const viewer = viewerRef.current;
        if (!viewer || targetZoomRef.current == null) return;

        const canvas = viewer.get('canvas') as BpmnCanvas;
        const currentZoom = canvas.zoom();
        const targetZoom = targetZoomRef.current;

        const step = zoomSpeed * (targetZoom > currentZoom ? 1 : -1);
        let nextZoom = currentZoom + step;

        if ((step > 0 && nextZoom > targetZoom) || (step < 0 && nextZoom < targetZoom)) {
            nextZoom = targetZoom;
            targetZoomRef.current = null;
        }

        nextZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, nextZoom));
        canvas.zoom(nextZoom, 'auto');

        if (targetZoomRef.current != null) requestAnimationFrame(animateZoom);
    }, [viewerRef, zoomSpeed]);

    const setTargetZoom = useCallback((delta: number) => {
        const canvas = viewerRef.current?.get('canvas') as BpmnCanvas;
        if (!canvas) return;

        let newZoom = canvas.zoom() + delta;
        newZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, newZoom));

        targetZoomRef.current = newZoom;
        requestAnimationFrame(animateZoom);
    }, [animateZoom, viewerRef]);

    return {setTargetZoom};
}
