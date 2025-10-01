import React, {useEffect} from "react";
import {Activity} from "@/lib/model/runtime/Activity";
import {ActivityState} from "@/lib/model/runtime/ActivityState";

const STATUS_CLASSES: Record<ActivityState, string> = {
    [ActivityState.SCHEDULED]: 'status-scheduled',
    [ActivityState.ACTIVE]: 'status-active',
    [ActivityState.COMPLETED]: 'status-completed',
    [ActivityState.CANCELED]: 'status-canceled',
    [ActivityState.TERMINATED]: 'status-terminated',
    [ActivityState.FAILED]: 'status-failed',
};

const ALL_STATUS_CLASSES = Object.values(STATUS_CLASSES).concat('status-incident');

export function useBpmnActivityStateMarkers(
    viewerRef: React.RefObject<any>,
    activities?: Activity[]
) {
    useEffect(() => {
        if (!activities?.length) return;

        const viewer = viewerRef.current;
        if (!viewer) return;

        const getCanvas = () => {
            const canvas = viewer.get?.('canvas');
            if (!canvas || typeof canvas.addMarker !== 'function' || typeof canvas.removeMarker !== 'function') {
                return null;
            }
            return canvas;
        };

        const applyMarkers = () => {
            const canvas = getCanvas();
            if (!canvas) return;

            activities.forEach(act => {
                ALL_STATUS_CLASSES.forEach(cls => {
                    try {
                        canvas.removeMarker(act.definitionId, cls);
                    } catch {
                    }
                });
            });

            activities.forEach(act => {
                const cls = STATUS_CLASSES[act.state];
                if (cls) {
                    try {
                        canvas.addMarker(act.definitionId, cls);
                    } catch {
                    }
                }
            });
        };

        applyMarkers();

        viewer.on('import.done', applyMarkers);

        return () => {
            const canvas = getCanvas();
            if (canvas) {
                activities.forEach(act => {
                    ALL_STATUS_CLASSES.forEach(cls => {
                        try {
                            canvas.removeMarker(act.definitionId, cls);
                        } catch {
                        }
                    });
                });
            }
            viewer.off('import.done', applyMarkers);
        };
    }, [viewerRef, activities]);
}
