import React, {useEffect, useRef} from 'react';
import {BpmnCanvas} from "@/lib/bpmn/model/BpmnCanvas";

export function useBpmnPanAndPinch(
    containerRef: React.RefObject<HTMLDivElement>,
    viewerRef: React.RefObject<any>,
    setTargetZoom: (delta: number) => void,
    zoomSpeed: number = 0.05 // фиксированный шаг зума
) {
    const lastDistanceRef = useRef<number | null>(null);
    const isDraggingRef = useRef(false);
    const lastPanRef = useRef<{ x: number; y: number } | null>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const getDistance = (touches: TouchList) => {
            const dx = touches[0].clientX - touches[1].clientX;
            const dy = touches[0].clientY - touches[1].clientY;
            return Math.sqrt(dx * dx + dy * dy);
        };

        const handleWheel = (e: WheelEvent) => {
            const canvas = viewerRef.current?.get('canvas') as BpmnCanvas;
            if (!canvas) return;

            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
                const delta = e.deltaY < 0 ? zoomSpeed : -zoomSpeed;
                setTargetZoom(delta);
            } else {
                e.preventDefault();
                canvas.scroll({dx: -e.deltaX, dy: -e.deltaY});
            }
        };

        const handleTouchMove = (e: TouchEvent) => {
            const canvas = viewerRef.current?.get('canvas') as BpmnCanvas;
            if (!canvas) return;

            if (e.touches.length === 2) {
                e.preventDefault();
                const distance = getDistance(e.touches);
                if (lastDistanceRef.current != null) {
                    const delta = distance - lastDistanceRef.current;
                    const zoomDelta = delta > 0 ? zoomSpeed : -zoomSpeed;
                    setTargetZoom(zoomDelta);
                }
                lastDistanceRef.current = distance;
            } else if (e.touches.length === 1 && isDraggingRef.current && lastPanRef.current) {
                e.preventDefault();
                const touch = e.touches[0];
                canvas.scroll({
                    dx: -(touch.clientX - lastPanRef.current.x),
                    dy: -(touch.clientY - lastPanRef.current.y)
                });
                lastPanRef.current = {x: touch.clientX, y: touch.clientY};
            }
        };

        const handleTouchStart = (e: TouchEvent) => {
            if (e.touches.length === 1) {
                isDraggingRef.current = true;
                lastPanRef.current = {x: e.touches[0].clientX, y: e.touches[0].clientY};
            }
        };

        const handleTouchEnd = () => {
            lastDistanceRef.current = null;
            isDraggingRef.current = false;
            lastPanRef.current = null;
        };

        container.addEventListener('wheel', handleWheel, {passive: false});
        container.addEventListener('touchstart', handleTouchStart);
        container.addEventListener('touchmove', handleTouchMove, {passive: false});
        container.addEventListener('touchend', handleTouchEnd);

        return () => {
            container.removeEventListener('wheel', handleWheel);
            container.removeEventListener('touchstart', handleTouchStart);
            container.removeEventListener('touchmove', handleTouchMove);
            container.removeEventListener('touchend', handleTouchEnd);
        };
    }, [containerRef, viewerRef, setTargetZoom, zoomSpeed]);
}
