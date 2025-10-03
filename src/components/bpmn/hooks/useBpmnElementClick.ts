import {type RefObject, useEffect, useRef} from 'react'
import type Viewer from 'bpmn-js/lib/Viewer'
import type {Canvas} from 'bpmn-js/lib/features/context-pad/ContextPadProvider'
import type {ModdleElement} from 'bpmn-js/lib/model/Types'
import type EventBus from 'diagram-js/lib/core/EventBus'

interface BpmnElement {
    id: string;
    businessObject?: ModdleElement;
}

export function useBpmnElementClick(
    viewerRef: RefObject<Viewer | null>,
    onElementClick?: (element: ModdleElement) => void
) {
    const selectedElementIdRef = useRef<string | null>(null)

    useEffect(() => {
        const viewer = viewerRef.current
        if (!viewer) return

        const eventBus = viewer.get<EventBus>('eventBus')
        const canvas = viewer.get<Canvas>('canvas')
        if (!eventBus || !canvas) return

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const handler = (event: any) => {
            const element = event.element as BpmnElement | undefined
            if (!element) return

            if (selectedElementIdRef.current) {
                canvas.removeMarker(selectedElementIdRef.current, 'selected-element')
            }

            if (element.id) {
                canvas.addMarker(element.id, 'selected-element')
                selectedElementIdRef.current = element.id
            } else {
                selectedElementIdRef.current = null
            }

            if (element.businessObject) {
                onElementClick?.(element.businessObject)
            }
        }

        eventBus.on('element.click', handler)
        return () => {
            eventBus.off('element.click', handler)
            if (selectedElementIdRef.current) {
                canvas.removeMarker(selectedElementIdRef.current, 'selected-element')
            }
        }
    }, [viewerRef, onElementClick])
}
