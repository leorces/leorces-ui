import {useEffect, useRef} from 'react';

export function useBpmnElementClick(
    viewerRef: React.RefObject<any>,
    onElementClick: (element: any) => void
) {
    const selectedElementIdRef = useRef<string | null>(null);

    useEffect(() => {
        const viewer = viewerRef.current;
        if (!viewer || !onElementClick) return;

        const eventBus = viewer.get('eventBus');
        const canvas = viewer.get('canvas');
        if (!eventBus || !canvas) return;

        const updateSelection = (element: any) => {
            if (selectedElementIdRef.current) {
                canvas.removeMarker(selectedElementIdRef.current, 'selected-element');
            }

            if (element?.id) {
                canvas.addMarker(element.id, 'selected-element');
                selectedElementIdRef.current = element.id;
            } else {
                selectedElementIdRef.current = null;
            }
        };

        const handler = (event: any) => {
            onElementClick(event.element);
            updateSelection(event.element);
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

