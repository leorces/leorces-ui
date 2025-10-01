import {useEffect, useRef} from 'react';

export function useBpmnElementClick(
    viewerRef: React.RefObject<any>,
    onElementClick?: (element: any) => void
) {
    const selectedElementIdRef = useRef<string | null>(null);

    useEffect(() => {
        const viewer = viewerRef.current;
        if (!viewer) return;

        const eventBus = viewer.get('eventBus');
        const canvas = viewer.get('canvas');
        if (!eventBus || !canvas) return;

        const handler = (event: any) => {
            const element = event.element;

            if (selectedElementIdRef.current) {
                canvas.removeMarker(selectedElementIdRef.current, 'selected-element');
            }

            if (element?.id) {
                canvas.addMarker(element.id, 'selected-element');
                selectedElementIdRef.current = element.id;
            } else {
                selectedElementIdRef.current = null;
            }

            onElementClick?.(element.businessObject ?? element);
        };

        eventBus.on('element.click', handler);

        return () => {
            eventBus.off('element.click', handler);
            if (selectedElementIdRef.current) {
                canvas.removeMarker(selectedElementIdRef.current, 'selected-element');
            }
        };
    }, [viewerRef, onElementClick]);
}
