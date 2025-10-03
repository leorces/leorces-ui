import {type RefObject, useEffect, useRef} from 'react'
import Viewer from 'bpmn-js/lib/Viewer'
import ZoomScrollModule from 'diagram-js/lib/navigation/zoomscroll'
import MoveCanvasModule from 'diagram-js/lib/navigation/movecanvas'
import type {Canvas} from 'bpmn-js/lib/features/context-pad/ContextPadProvider'

type ViewerOptions = ConstructorParameters<typeof Viewer>[0];

export function useBpmnViewer(containerRef: RefObject<HTMLDivElement>, schema: string) {
    const viewerRef = useRef<Viewer | null>(null)

    useEffect(() => {
        if (!containerRef.current || !schema) return

        const viewer = new Viewer({
            container: containerRef.current,
            mouse: {bindTo: document},
            additionalModules: [
                ZoomScrollModule,
                MoveCanvasModule
            ]
        } as ViewerOptions)

        viewerRef.current = viewer

        viewer.importXML(schema)
            .then(() => {
                const canvas = viewer.get<Canvas>('canvas')
                canvas.zoom('fit-viewport', 'auto')
            })
            .catch(() => {
                // ignore errors, we don't want to block rendering if the BPMN is invalid'
            })

        return () => {
            viewer.destroy()
            viewerRef.current = null
        }
    }, [containerRef, schema])

    return viewerRef
}
